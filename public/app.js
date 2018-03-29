 const CreateUser = document.querySelector('.CreateUser');
 CreateUser.addEventListener('submit', (e) => {
     e.preventDefault();
     const username = CreateUser.querySelector('.username').value;
     const password = CreateUser.querySelector('.password').value;
     const fName = CreateUser.querySelector('.fName').value;
     const lName = CreateUser.querySelector('.lName').value;
     const email = CreateUser.querySelector('.email').value;
     const role = CreateUser.querySelector('.role').value;
     post('/createUser', { fName, lName, email, username, password, role })
 });

const Login = document.querySelector('.Login');
Login.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = Login.querySelector('.username').value;
    const password = Login.querySelector('.password').value;
    post('/login', {username, password})
        .then((res) => {
            if (res.status === 200) res.text().then(function (text) {
                alert(text); //redirect by role
            })
            else alert('login failed')
        })
});

const UploadFile = document.querySelector('.UploadFile');
UploadFile.addEventListener('submit', (e) => {
    e.preventDefault();
    var fileField = document.querySelector("input[type='file']").files;
    var file = fileField[0];
    var fileName = fileField[0].name;
    var fileDate = fileField[0].lastModifiedDate.toString();

 console.log(file);
 console.log(fileName);
 console.log(fileDate);
    post('/uploadFile', {fileName,  fileDate, file})
        .then(response => response.json())
         .catch(error => console.error('Error:', error))
         .then(response => console.log('Success:', response));
    // console.log(formData);
});

const LoadUsers = document.querySelector('.LoadUsers');
LoadUsers.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = LoadUsers.querySelector('.role').value;
    post('/loadUsers', {role} )
        .then((res) => {
            if (res.status === 200)
                res.text().then(function (text) {
        console.log(text);
            })
            else alert('no matching users')
        })
});

function post(path, data) {
    return window.fetch(path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}