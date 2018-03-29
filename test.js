const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const store = require('./store');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());



app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());

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
});

app.post('/uploadFile', (req, res) => {
    console.log(req.body);
    store
         .uploadFile({
            title: req.body.fileName,
            version: req.body.fileDate,
            file: req.body.file
        })
        .then(() => res.sendStatus(200))
});

app.post('/loadUsers', (req, res) => {
    store
        .loadUsers({
            role: req.body.role
        })
    .then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(users);
    })
});


//FOR testing on localhost
 app.listen(7555, () => {
//app.listen(443, () => {
    console.log('Server running on http://localhost:7555')
    //console.log('Server running on http://137.45.220.128:443')
})
