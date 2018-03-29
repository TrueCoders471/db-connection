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
            password: req.body.password,
            role: req.body.role
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

app.post('/uploadDocument', (req, res) => {
    console.log(req.body);
    const file = req.files.file;
    const title = req.body.title;
    const fileDate = req.body.fileDate;
    const isFillable = req.body.isFillable;
    console.log("file text: " + file.data.toString());
    console.log(title);
    console.log(fileDate);
    console.log(isFillable);

        store
            .uploadDocument({
                title: title,
                version: fileDate,
                file: file.data,
                is_fillable: isFillable
            })
            .then(() => res.sendStatus(200))
});


app.post('/uploadNote', (req, res) => {
    console.log(req.body);
    const file = req.files.file;
    const title = req.body.title;
    const fileDate = req.body.date_submitted;
console.log("file text: " + file.data.toString());
console.log(title);
console.log(fileDate);
        store
            .uploadNote({
                title: title,
                course_number: title,
                date_submitted: fileDate,
                file: file.data,
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

app.post('/loadDocuments', (req, res) => {
    store.
        loadDocuments({
            is_fillable: req.body.is_fillable
        })
    .then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(documents);
    })
});


app.post('/loadNotes', (req, res) => {
    store.
        loadNotes({
            course_number: req.body.course_number
        })
    .then((notes) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(notes);
    })
});

//FOR testing on localhost
// app.listen(7555, () => {
app.listen(443, () => {
    //console.log('Server running on http://localhost:7555')
    console.log('Server running on http://137.45.220.128:443')
})
