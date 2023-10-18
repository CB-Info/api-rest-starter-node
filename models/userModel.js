const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String, // Champ de mot de passe
});

// Fonction pour hacher le mot de passe avant de le sauvegarder
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    }

    next();
});

module.exports = mongoose.model("User", userSchema);
