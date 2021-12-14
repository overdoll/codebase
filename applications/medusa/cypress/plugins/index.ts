// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

require('dotenv').config()

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  on('task', {
    generateOTP: require('cypress-otp')
  })
  // add other tasks to be registered here

  // copy any needed variables from process.env to config.env
  config.env.TESTMAIL_API_KEY = process.env.TESTMAIL_API_KEY
  config.env.TESTMAIL_NAMESPACE = process.env.TESTMAIL_NAMESPACE

  config.env.CYPRESS_TESTMAIL_API_KEY = process.env.TESTMAIL_API_KEY
  config.env.CYPRESS_TESTMAIL_NAMESPACE = process.env.TESTMAIL_NAMESPACE

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
