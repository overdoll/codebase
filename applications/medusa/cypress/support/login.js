Cypress.Commands.add('login', (email, complete = true) => {
  cy.visit('/join')

  // wait until button isn't disabled (it's ready to be interacted with)
  cy.waitUntil(() => cy.findByRole('button', { name: /Continue/iu }).should('not.be.disabled'))

  cy.findByRole('textbox', { name: /email/iu })
    .type(email)

  cy.findByRole('button', { name: /Continue/iu })
    .click()

  cy.contains(email)

  if (complete) {
    cy.getCookie('otp-key').then(cookie => {
      // in debug mode, our cookies won't be encrypted so we can just read it directly from the browser
      // in production, the user would have to check their email in order to get the right token
      cy.visit('/token/' + cookie.value)

      cy.url().should('include', '/profile')
    })
  }
})
