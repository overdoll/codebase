Cypress.Commands.add('login', (email, complete = true) => {
  cy.visit('/join')

  cy.get('form')
    .findByRole('textbox', { name: /email/iu })
    .type(email)

  cy.get('form')
    .findByRole('button', { name: /Continue/iu })
    .click()

  cy.contains(email)

  if (complete) {
    cy.getCookie('otp-key').then(cookie => {
      // in debug mode, our cookies won't be encrypted so we can just read it directly from the browser
      // in production, the user would have to check their email in order to get the right token
      cy.visit('/token/' + cookie.value)
    })
  }
})
