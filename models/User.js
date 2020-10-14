const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,

    },
    Password: {
        type: String,
        require: true,
        min: 6,
    }
});

module.exports = mongoose.model('User', userSchema);