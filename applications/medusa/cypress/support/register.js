Cypress.Commands.add('register', (email, id) => {
  cy.waitUntil(() => cy.findByRole('button', { name: /Register/iu }).should('not.be.disabled'))

  cy.get('form')
    .findByRole('textbox', { name: /username/iu })
    .type(id)

  cy.get('form')
    .findByRole('button', { name: /Register/iu })
    .click()

  cy.url().should('include', '/profile')
})
