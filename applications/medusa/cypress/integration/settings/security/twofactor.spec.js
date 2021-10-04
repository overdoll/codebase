describe('Settings - Configure Two-Factor', () => {
  const id = Cypress._.random(0, 1e6)
  const email = `${id}@test.com`

  before(() => {
    cy.login(email)
    cy.register(email, id)
    cy.logout()
  })

  beforeEach(() => {
    cy.login(email)
    cy.url().should('include', '/profile')
    cy.visit('/settings/security')
  })

  it('one', () => {
    cy.findByText(/Two-factor Authentication/iu)
  })
  it('two', () => {
    cy.findByText(/Two-factor Authentication/iu)
  })
})
