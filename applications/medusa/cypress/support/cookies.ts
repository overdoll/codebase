// these cookies need to be preserved or else we get issues
Cypress.Cookies.defaults({
  preserve: ['_csrf', 'od.device', 'od.language']
})