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

    registerStudent({first_name, last_name, email, phone, ru_id, username, password, birth_date, gender, role, street, res_hall, room, city, state, zip, standing, time, major, graduation, is_disabled}) {
        console.log(`Registering student: ${username}`);
        return knex('users').insert({
            username,
            password,
            first_name,
            last_name,
            email,
            phone,
            ru_id,
            birth_date,
            gender,
            role,
            street,
            res_hall,
            room,
            city,
            state,
            zip,
            standing,
            time,
            major,
            graduation,
            is_disabled
        })
    },

    registerVolunteer({username, password, first_name, last_name, email, phone, ru_id, role, is_disabled}){
        console.log(`Registering volunteer: ${username}`);
        return knex('users').insert({
            username,
            password,
            first_name,
            last_name,
            email,
            phone,
            ru_id,
            role,
            is_disabled
        })
    },

    registerFaculty({username, password, first_name, last_name, email, phone, ru_id, role, is_disabled}){
        console.log(`Registering faculty: ${username}`);
        return knex('users').insert({
            username,
            password,
            first_name,
            last_name,
            email,
            phone,
            ru_id,
            role,
            is_disabled
        })
    },

    registerAdmin({username, password, first_name, last_name, email, phone, ru_id, role, is_disabled}){
        console.log(`Registering admin: ${username}`);
        return knex('users').insert({
            username,
            password,
            first_name,
            last_name,
            email,
            phone,
            ru_id,
            role,
            is_disabled
        })
    },

    addCourse({ru_id, course}){
        console.log(`Adding course ${course} to ${ru_id}`);
        return knex('faculty_courses').insert({
            ru_id,
            course
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
                else {
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

    loadUsers({role}) {
        console.log(`Loading all users:  ${role}`);
        return knex('users').where({role});
    },

    loadDocuments({is_fillable}) {
        console.log("Loading Documents");
        console.log(is_fillable);
        return knex('cas.documents').where({is_fillable});
    },

    loadNotes({course_number}) {
        console.log(`Loading Notes for ${course_number}`);
        return knex('notes').where({course_number});
    },

    loadCourses({subject_name}) {
        console.log(`Loading courses for: ${subject_name}`);
        return knex('courses').where({subject_name});
    },

    loadSubjects() {
        console.log(`Loading all subjects `);
        return knex('subjects');
    },

    disableUser({username}){
        console.log(`disabling user ${username}`);
        return knex('users').where({username}).update({is_disabled: 1});
    }
};
