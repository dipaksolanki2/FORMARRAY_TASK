'use strict';

const Joi = require('joi');
module.exports ={
    plugin:{
        async register(server, option){
            const API = require('@api/auth.api')
            server.route([
                {
                    method: 'POST',
                    path: '/signup',
                    config: {
                        validate: API.signUp.validate,
                        pre: API.signUp.pre,
                        handler: API.signUp.handler
                    }
                },
                {
                    method: 'POST',
                    path: '/login',
                    config: {
                        validate: API.login.validate,
                        pre: API.login.pre,
                        handler: API.login.handler
                    }
                },
                {
                    method: 'GET',
                    path: '/logout',
                    config: {
                        pre: API.logout.pre,
                        handler: API.logout.handler
                    }
                }
            ])
        },
        version: require('../../package.json').version,
        name : 'auth-routes'
    }
}