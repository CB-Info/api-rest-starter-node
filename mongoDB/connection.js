const mongoose = require("mongoose")
require("dotenv").config();

async function connectionMongoDB() {
    try {
        await mongoose.connect(
            process.env.MONGO_URL) // /!\ CHANGER URL MONGO DB POUR FAIRE LES TEST /!\
        console.log("CONNECTED TO MONGO DB")
    } catch (e) {
        console.log("CONNEXION ERROR")
    }
}

module.exports = connectionMongoDB
