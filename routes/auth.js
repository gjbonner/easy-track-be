const { Router } = require('express');
const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
    // validate user 
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // check if user exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Account with that email already exists');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create user 
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const savedUser = await user.save();
        res.status(res.statusCode).send(savedUser);
    } catch (error) {
        res.status(res.statusCode).send(error);
    }
});

router.post('/login', (req, res) => {
    res.send('Login');
})



module.exports = router;