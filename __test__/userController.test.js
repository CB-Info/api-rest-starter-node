const request = require('supertest');
const app = require('../app'); // Importez votre application Express
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// /!\ CHANGER URL MONGO DB AVANT DE FAIRE LES TEST /!\

describe('Test de la création d\'utilisateur', () => {
  it('devrait créer un nouvel utilisateur avec des données valides', async () => {
    const userData = {
      name: 'Clement',
      email: 'clement@example.com',
      password: 'Password1!', // Assurez-vous que le mot de passe respecte les critères
    };

    const response = await request(app)
      .post('/api/users') // Remplacez par la route correcte
      .send(userData);

    // Assurez-vous que la réponse a un statut 201 (Créé) et que les données de l'utilisateur sont correctes
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', userData.name);
    expect(response.body).toHaveProperty('email', userData.email);
  }, 20000);

  it('ne devrait pas créer d\'utilisateur avec des données manquantes', async () => {
    const userData = {
      // Données manquantes, ne devrait pas être valide
    };

    const response = await request(app)
      .post('/api/users') // Remplacez par la route correcte
      .send(userData);

    // Assurez-vous que la réponse a un statut 400 (Mauvaise requête) et renvoie une erreur appropriée
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('ne devrait pas créer d\'utilisateur avec un mot de passe invalide', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password', // Mot de passe invalide
    };

    const response = await request(app)
      .post('/api/users') // Remplacez par la route correcte
      .send(userData);

    // Assurez-vous que la réponse a un statut 400 (Mauvaise requête) et renvoie une erreur appropriée
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('ne devrait pas créer d\'utilisateur si l\'utilisateur existe déjà', async () => {
    const userData = {
      name: 'Clement',
      email: 'clement@example.com',
      password: 'Password1!',
    };

    // Créez un utilisateur avec les mêmes informations dans la base de données ici

    const response = await request(app)
      .post('/api/users') // Remplacez par la route correcte
      .send(userData);

    // Assurez-vous que la réponse a un statut 400 (Mauvaise requête) et renvoie une erreur appropriée
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  }, 15000);
});

describe('Test de la récupération des utilisateurs', () => {
  it('devrait renvoyer la liste des utilisateurs existants', async () => {
    // Créez un utilisateur dans la base de données de test
    // Générez un token d'authentification pour cet utilisateur
    const token = jwt.sign({ userId: "1" }, process.env.JWT_SECRET); // Utilisez votre clé secrète

    const response = await request(app)
      .get('/api/users') // Remplacez par la route correcte
      .set('Authorization', `Bearer ${token}`) // Incluez le token d'authentification
      .expect(200); // Vérifiez que la réponse a un statut 200 (OK)
      
    // Ajoutez des assertions pour vérifier que la réponse contient la liste des utilisateurs
    expect(response.body).toEqual(expect.arrayContaining([])); // Ajoutez les utilisateurs créés à cette assertion
  }, 10000);

  it('devrait renvoyer un code 404 si aucun utilisateur n\'est trouvé', async () => {
    // Assurez-vous que la base de données de test est vide
    /*const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password1!',
    });*/
    const token = jwt.sign({ userId: "1" }, process.env.JWT_SECRET); // Utilisez votre clé secrète

    const response = await request(app)
      .get('/api/users') // Remplacez par la route correcte
      .set('Authorization', `Bearer ${token}`) // Incluez le token d'authentification
      .expect(404); // Vérifiez que la réponse a un statut 404 (Non trouvé)
  });

  it('devrait renvoyer un code 304 si l\'ETag correspond', async () => {
    // Créez un ou plusieurs utilisateurs dans la base de données de test ici
    const token = jwt.sign({ userId: "1" }, process.env.JWT_SECRET); // Utilisez votre clé secrète

    const response = await request(app)
      .get('/api/users') // Remplacez par la route correcte
      .set('Authorization', `Bearer ${token}`) // Incluez le token d'authentification
      .set('If-None-Match', 'ETag de test existant') // Remplacez par un ETag existant
      .expect(304); // Vérifiez que la réponse a un statut 304 (Non modifié)
  });

  it('devrait renvoyer un nouvel ETag si la liste des utilisateurs a été modifiée', async () => {
    // Créez un ou plusieurs utilisateurs dans la base de données de test ici
    const userData = await User.create({
      name: 'ETag',
      email: 'etag@example.com',
      password: 'Password1!',
    });

    const token = jwt.sign({ userId: "1" }, process.env.JWT_SECRET); // Utilisez votre clé secrète

    const response = await request(app)
      .get('/api/users') // Remplacez par la route correcte
      .set('Authorization', `Bearer ${token}`) // Incluez le token d'authentification
      .set('If-None-Match', "ETag existant") // Remplacez par un ETag existant
      .expect(200); // Vérifiez que la réponse a un statut 200 (OK)
      console.log(response.body.etag)

    // Ajoutez une assertion pour vérifier que le nouvel ETag est renvoyé dans la réponse
    expect(response.headers).toHaveProperty('etag');
  });
});