/* eslint-disable  */

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var cors = require('cors');

var app = express();
var port = process.env.PORT || 3000;

// body parser
app.use(bodyParser.json());

// cors support
app.use(cors());

// static file
app.use(express.static(path.join(__dirname, '../app')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../app', 'index.html'));
// });

app.post('/api/auth/verifyUser', (req, res, next) => {
    console.log(req.body.domain, req.body.user, req.body.password)
    if (req.body.password !== '12345') {
        return res.status(401).json({
            code: 401,
            error: 'unauthorized',
            status: 'nok',
            details: 'invalid password'
        })
    }
    res.status(200).json({
        user_id: 123,
        name: 'Peter Cosemans',
        email: req.body.user,
        domain: req.body.domain
    });
})

app.post('/api/auth/isUserRegistered', (req, res, next) => {
    console.log(req.body.email)
    console.log(req.body.domain)
    if (req.body.domain !== 'myDomain') {
        return res.status(409).json({
            code: 409,
            error: 'conflict',
            status: 'nok',
            details: 'email is not registered on this domain'
        })
    }
    res.status(200).json({
        user_id: 123,
        name: 'Peter Cosemans',
        email: req.body.email,
        domain: 'myDomain'
    });
})

const server = app.listen(port, () => {
    console.log(`API Server listening on port ${server.address().port}`);
});

/* eslint-enable  */
