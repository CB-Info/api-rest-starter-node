const mongoose = require("mongoose")
require("dotenv").config();

async function connectionMongoDB() {
    try {
        await mongoose.connect(
            process.env.MONGO_URL) //change the mongodb link
        console.log("Connecté à mongodb")
    } catch (e) {
        console.log("Problème de connexion")
    }
}

module.exports = connectionMongoDB
