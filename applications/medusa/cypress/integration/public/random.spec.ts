Cypress.config('defaultCommandTimeout', 20000)

describe('Random', () => {
  it('go to the random page', () => {
    cy.viewport('iphone-xr')
    cy.visit('/random')
    cy.findByText('Random posts').should('be.visible')
    cy.url().then(url => {
      cy.get('button[aria-label="Randomize!"]').should('not.be.disabled').click({ force: true })
      cy.url().should('not.equal', url)
    })
  })
})
