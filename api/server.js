const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const sessionStore = require('connect-session-knex')(session);
require('colors');

const authRouter = require('../auth/authRouter');
const userRouter = require('../users/userRouter');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(session({
    name: 'wolf',
    secret: 'Keep it secret, keep it safe',
    cookie: {
        maxAge: 1000*60*60*10,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new sessionStore({
        knex: require('../data/db-config'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createTable: true,
        clearInterval: 1000*60*60*10
    })
}))

server.use('/auth', authRouter);
server.use('/api/users', userRouter);

module.exports = server;