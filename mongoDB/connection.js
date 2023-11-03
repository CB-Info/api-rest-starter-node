const mongoose = require("mongoose")
require("dotenv").config();

async function connectionMongoDB() {
    try {
        await mongoose.connect(
            process.env.MONGO_URL) //change the mongodb link
        console.log("CONNECTED TO MONGO DB")
    } catch (e) {
        console.log("CONNEXION ERROR")
    }
}

module.exports = connectionMongoDB
