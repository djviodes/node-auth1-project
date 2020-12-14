const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/userModels');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hash = bcrypt.hashSync(password, 14);
        const user = { username, password: hash };
        const newUser = await Users.create(user)
        res.status(202).json(newUser)
    } catch(err) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    };
});

router.post('/login', async (req, res) => {
    try {
        const user = await Users.findBy({ username: req.body.username });
        if (user && bcrypt.compare(req.body.password, user.password)) {
            req.session.user = user
            res.status(200).json({
                message: `Welcome ${req.body.username}`
            })
        } else {
            res.status(401).json({
                message: 'Access Denied'
            })
        }
    } catch(err) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    };
});

router.get('/logout', (req, res) => {
    if (req.session && req.session.user) {
        req.session.destroy(err => {
            if (err) {
                res.json({
                    message: 'You may not leave'
                })
            } else {
                res.status(200).json({
                    message: 'Logout Successful'
                });
            };
        });
    };
});

module.exports = router;