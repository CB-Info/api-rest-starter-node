const userController = require('../controllers/userController');
var User = require('../models/userModel');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const bcrypt = require("bcrypt")

describe('createUser function', () => {
  it('should return the doc with findById', async () => {
    const hashedPassword = await bcrypt.hash("1Password!", 10)

    const req = {
      body: {
        name: 'testuser',
        email: 'testuser@example.com',
        password: "1Password!"
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Utilise mockingoose pour simuler le modèle User
    mockingoose(User).toReturn(req.body, 'save');

    await userController.createUser(req, res);

    // Vérifie que la réponse a été correctement gérée
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});