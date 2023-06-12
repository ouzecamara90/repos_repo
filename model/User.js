const mongoose = require ('require');

//Définir le schéma de user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
//Exporter  le model user basé sur le schema
module.exports = mongoose.model('User',userSchema);

