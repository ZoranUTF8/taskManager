const express = require("express");
const app = express();
require("dotenv").config();
const tasks = require("./routes/tasks");
// MIDDLEWARE IMPORTS
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
// DB CONNECTION
const connectToAtlasDB = require("./db/dbConnect")

// SERVING STATIC FILES
app.use(express.static('./public'));
app.use(express.json());

// ROUTES
app.use("/api/v1/tasks", tasks);

// CUSTOM MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

// RUNNING SERVER AND DB CONNECTION
const port = process.env.PORT || 3000;
//  if connection to atlas is ON than bring the server up
const start = async () => {
    try {
        await connectToAtlasDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server ON ${port}...`));
    } catch (err) {
        console.log(`ERROR CONNECTIONG TO ATLAS DB => ${err}`)
    }
};

start();