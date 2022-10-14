Cypress.config('defaultCommandTimeout', 20000)

describe('Home', () => {
  it('go to the home page', () => {
    cy.visit('/')
    cy.findByText('RANDOM').should('be.visible').should('not.be.disabled').click({ force: true })
    cy.url().should('contain', '/random')
  })
})
