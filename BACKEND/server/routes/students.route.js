'use strict';

const Joi = require('joi');
module.exports ={
    plugin:{
        async register(server, option){
            const API = require('@api/students.api')
            server.route([
                {
                    method: 'GET',
                    path: '/students',
                    config: {
                        // auth: 'auth',
                        plugins:{
                            // policies:['log.policy'],
                        },
                        tags: ['api', 'STUDENT'],
                        description: 'GET STUDENTS',
                        notes: 'STUDENT',
                        validate: API.getSchool.validate,
                        pre: API.getSchool.pre,
                        handler: API.getSchool.handler
                    }
                },
                {
                    method: 'POST',
                    path: '/students',
                    config: {
                        // auth: 'auth',
                        plugins:{
                            // policies:['log.policy'],
                        },
                        tags: ['api', 'STUDENT'],
                        description: 'SAVE STUDENT',
                        notes: 'STUDENT',
                        validate: API.saveSchool.validate,
                        pre: API.saveSchool.pre,
                        handler: API.saveSchool.handler
                    }
                },
                {
                    method: 'DELETE',
                    path: '/students/{_id}',
                    config: {
                        // auth: 'auth',
                        plugins:{
                            // policies:['log.policy'],
                        },
                        tags: ['api', 'STUDENT'],
                        description: 'DELETE STUDENTS',
                        notes: 'STUDENT',
                        validate: API.deleteSchool.validate,
                        pre: API.deleteSchool.pre,
                        handler: API.deleteSchool.handler
                    }
                },
                {
                    method: 'DELETE',
                    path: '/student/{studentId}',
                    config: {
                        // auth: 'auth',
                        plugins:{
                            // policies:['log.policy'],
                        },
                        tags: ['api', 'STUDENT'],
                        description: 'DELETE STUDENT',
                        notes: 'STUDENT',
                        validate: API.deleteStudent.validate,
                        pre: API.deleteStudent.pre,
                        handler: API.deleteStudent.handler
                    }
                },
                {
                    method: 'PUT',
                    path: '/students/{_id}',
                    config: {
                        // auth: 'auth',
                        plugins:{
                            // policies:['log.policy'],
                        },
                        tags: ['api', 'STUDENT'],
                        description: 'EDIT STUDENT',
                        notes: 'STUDENT',
                        validate: API.editSchool.validate,
                        pre: API.editSchool.pre,
                        handler: API.editSchool.handler
                    }
                }
            ])
        },
        version: require('../../package.json').version,
        name : 'student-routes'
    }
}