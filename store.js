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
        })
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
            })
    }
};
