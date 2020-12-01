const express = require('express');

const Users = require('./userModels');

const router = express.Router();

const secure = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({
            message: 'Unathorized User'
        });
    };
};

router.get('/', secure, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.put('/:id', (req, res) => {
    Users.update(req.params.id, req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            res.status(204).end()
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            });
        });
});

module.exports = router;