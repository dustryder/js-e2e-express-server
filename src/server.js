const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const util = require('util');

global.TextEncoder = util.TextEncoder;
const { MongoClient } = require('mongodb');
const utils = require('./utils');

// fn to create express server
const create = async () => {

    // server
    const app = express();
    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
    
    // Log request
    app.use(utils.appLogger);

    // root route - serve static file
    app.get('/api/hello', (req, res) => {

        res.json({
            hello: `${req.hostname}`,
            world: `${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`,
        });
        res.end();
    });

    // root route - serve static file
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/client.html')));

    // Catch errors
    app.use(utils.logErrors);
    app.use(utils.clientError404Handler);
    app.use(utils.clientError500Handler);
    app.use(utils.errorHandler);

    return app;
};

module.exports = {
    create
};
