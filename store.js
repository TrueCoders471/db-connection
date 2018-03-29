const knex = require('knex')(require('./knexfile'));

module.exports = {
    createUser({student_id, first_name, last_name, username, email, password, role}) {
        console.log(`Add user ${username}`);
        return knex('users').insert({
            username,
            first_name,
            last_name,
            email,
            password,
            role
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

    uploadDocument({title, version, file, is_fillable}) {
        console.log(`Uploading document ${title}`);
        console.log(file);
        console.log(is_fillable);
        return knex('cas.documents').insert({
            title,
            version,
            file,
            is_fillable
        });
    },
    uploadNote({course_number, title, date_submitted, file}) {
        console.log(`Uploading notes ${title}`);
        console.log(file);
        return knex('notes').insert({
            course_number,
            title,
            date_submitted,
            file,
        });
    },

    loadUsers({role}){
        console.log(`Loading all users:  ${role}`);
        return knex('users').where({role});
    },

    loadDocuments({is_fillable}){
        console.log("Loading Documents");
        console.log(is_fillable);
        return knex('cas.documents').where({is_fillable});
    },

    loadNotes({course_number}){
        console.log("Loading Notes");
        console.log(course_number);
        return knex('notes').where({course_number});
    }
};
