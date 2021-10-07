Cypress.Commands.add('logout', () => {
  cy.clearCookie('connect.sid')

  cy.visit('/join')

  cy.url().should('include', '/join')
})
