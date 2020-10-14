const { Router } = require('express');
const User = require('../models/User');
const router = require('express').Router();

router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
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


// router.get('/events' (req, res) => {
//     res.send()
// })

module.exports = router;