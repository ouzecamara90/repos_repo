//import des modules necessaires
const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').congig();
const User = require('./user');

//Configuration d'express
const app = express();
app.use(express.json());

//Connexion a la base de donnée mongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Erreur de connexion a la base de donnée:'));
db.once('open',() => {
console.log('Connecté a la base de données ')
});
//Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
//Creation du modèle utilisateur
const User = mongoose.model('User', userSchema);

//Route GET pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'Erreur lors de la récupérationde utilisateurs'});
        
        } else {
            res.json(users);
        }
    });
});

//Route POST pour ajouter un nouvel utilisateur
app.post('/users', (req, res) => {
    const {name, age} = req.body;
    const newUser = new User({name, age});

    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'Erreur lors de l/ajpout de l/utilisateur'});
        } else {
            res.json(user);
        }
    });
});

//Route PUT pour modifier un utilisateur par ID
app.put('/users/:id', (req, res) =>{
    const { id } = req.params;
    const {name, age} = req.body;

    User.findByIdAndUpdate(
        id,
        {name, age},
        {new: true},
        (err, user) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Erreur lors de la modification de l/utilisateur'});
            } else {
                res.json(user);
            }
        }

    );
});

//Route DELETE pour supprimer un utilisateur par ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({error :'Erreur lors de la suppression de l/utilisateur'});
        } else {
            res.json({message: 'utilisateur supprimé avec succès'});
        }
    });
});

//Démarrage du server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Le server ecoute sur le port ${port}');
});