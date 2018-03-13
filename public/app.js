 const CreateUser = document.querySelector('.CreateUser')
 CreateUser.addEventListener('submit', (e) => {
     e.preventDefault()
     const username = CreateUser.querySelector('.username').value;
     const password = CreateUser.querySelector('.password').value;
     const fName = CreateUser.querySelector('.fName').value;
     const lName = CreateUser.querySelector('.lName').value;
     const email = CreateUser.querySelector('.email').value;
     post('/createUser', { fName, lName, email, username, password })
 });

const Login = document.querySelector('.Login')
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
