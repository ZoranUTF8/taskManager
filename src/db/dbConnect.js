const mongoose = require("mongoose");


// function to connect to ATLAS
const connectToAtlasDB = (url) => {
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
}


module.exports = connectToAtlasDB;