const { Router } = require('express');
const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send('Register');
})

router.post('/login', (req, res) => {
    res.send('Login');
})

// router.get('/events' (req, res) => {
//     res.send()
// })

module.exports = router;