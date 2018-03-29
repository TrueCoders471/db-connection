const knex = require('knex')(require('./knexfile'));

module.exports = {
    createUser({student_id, first_name, last_name, username, email, password}) {
        console.log(`Add user ${username}`);
        return knex('users').insert({
            username,
            first_name,
            last_name,
            email,
            password
        });
    },

    authenticate({username, password}) {
        console.log(`Authenticating user ${username}`);
        return knex('users').where({username})
            .then(([user]) => {
                if (!user) {
                    return {success: false, user: null}
                }
                if (password === user.password) {
                    return {success: true, user: user}
                }
                else{
                    return {success: false, user: null}
                }
            });
    },

    uploadFile({title, version, file}) {
        console.log(`Uploading file ${title}`);
        //console.log(file.valueOf());
        return knex('documents').insert({
            title,
            version,
            file
        });
    },

    loadUsers({role}){
        console.log(`Loading all users:  ${role}`);
        return knex('users').where({role});
    }
};
