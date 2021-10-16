const express = require("express");
const app = express();
require("dotenv").config();
const tasks = require("./routes/tasks");

// DB CONNECTION
const connectToAtlasDB = require("./db/dbConnect")


// MIDDLEWARE
app.use(express.json());



// ROUTES
app.get("/hello", (req, res) => {
    res.send("OLA AMIGO")
})

app.use("/api/v1/tasks", tasks);

// RUNNING SERVER AND DB CONNECTION
const port = 3000;
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