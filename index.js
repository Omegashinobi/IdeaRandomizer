const express = require('express');
const app = express();

const config = require('./config.json');

const {Randomizer} = require("./randomizer/randomizer");

const instancer = new Randomizer(config);

const hostname = '127.0.0.1';
const port = 3000;

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    instancer.run(res);
});

app.get('/get',(req,res)=>{
    instancer.read(res);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});