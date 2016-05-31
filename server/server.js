var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 3000;

// body parser
app.use(bodyParser.json());

// cors support
app.use(cors());

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
        name: 'peter cosemans',
        email: req.body.user,
        domain: req.body.domain
    });
})

app.post('/api/auth/isUserRegistered', (req, res, next) => {
    console.log(req.body.email)
    if (req.body.email.indexOf('gmail.com') == -1) {
        return res.status(409).json({
            code: 409,
            error: 'conflict',
            status: 'nok',
            details: 'only gmail is supported'
        })
    }
    res.status(200).json({
        user_id: 123,
        name: 'peter cosemans',
        email: req.body.email,
        domain: 'myDomain'
    });
})

const server = app.listen(port, () => {
    console.log(`API Server listening on port ${server.address().port}`);
});

