'use strict'
const Joi = require('joi')

module.exports = {
  plugin: {
    async register(server, options) {
      server.route([
        {
          method: 'GET',
          path: '/',
          config: {
            // auth: null,
            plugins: {
              policies: []
            },
            tags: [],
            handler: async (request, h) => {
              return h.response({
                up: new Date().getTime() - request.server.info.started,
                // res
              })
            }
          }
        },
      ])
    },
    version: require('../../package.json').version,
    name: 'root-routes'
  }
}
