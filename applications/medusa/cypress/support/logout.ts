Cypress.Commands.add('logout', () => {
  cy.clearCookie('od.session')

  cy.visit('/join')

  cy.url().should('include', '/join')
})
