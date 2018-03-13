const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/createUser', (req, res) => {
    store
        .createUser({
            username: req.body.username,
            first_name: req.body.fName,
            last_name: req.body.lName,
            email: req.body.email,
            password: req.body.password
        })
        .then(() => res.sendStatus(200))
});

app.post('/login', (req, res) => {
    console.log(req.body);
    store
        .authenticate({
            username: req.body.username,
            password: req.body.password,
        })
        .then(({ success, user }) => {
            if (success) res.status(200).send(user.role); //redirect
            else res.sendStatus(401)
        })
})
app.listen(443, () => {
    console.log('Server running on http://localhost:7555')
})
