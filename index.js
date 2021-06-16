'use strict';

const http = require('http');
const hostname = "127.0.0.1";
const port = 3000;

const express = require('express');
const app = express();

const server = http.createServer(app);
const db = require('./db');

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});

const rootController = (request, response) => {
    const snippet = `<h1>Hello from the root route!</h1>`;
    response
        .status(200)
        .send(snippet)
        .end();
};

const friendsController = (request, response) => {
    let snippet = `<h1>Friends Routes</h1>`;

    console.log(request.params.handle);

    if (request.params.handle === undefined) {
        db.map((friend) => {
            snippet += `<p><a href="./friends/${friend.handle}">${friend.name}</a></p>`;
        });
    }

    if (request.params.handle !== undefined) {
        db.map((friend) => {
            if (request.params.handle === friend.handle) {
                snippet += `<p>${friend.name} likes ${friend.skill}</p>`;
            } else {
                return null;
            }
        });
    }

    response
        .status(200)
        .send(snippet)
        .end();
}

app.get('/', rootController);
app.get('/friends/:handle?', friendsController);