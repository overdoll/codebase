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
    cy.findByText(/Two-factor Authentication/).should('exist')
  })

  it('can set up and see recovery as well as generate new ones', () => {
    // cy.get('[data-cy=recovery-codes-settings]').click()
    cy.findByText(/Recovery Codes/).should('not.be.disabled').click()
    cy.findByText(/No recovery codes/iu).should('exist')
    cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
    cy.findByText(/Your recovery codes/iu).should('exist')
    cy.get('[data-cy=recovery-code]').as('recovery-codes')
    cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
    cy.get('@recovery-codes').should('not.equal', cy.get('[data-cy=recovery-code]'))
  })
  it('can set up authenticator app', () => {
    cy.findByText(/Authenticator App/).should('not.be.disabled').click()
    cy.findByText(/Download an Authenticator App/iu).should('exist')
    cy.findByRole('button', { label: /Copy/ }).as('totp-secret')
    console.log(cy.get('@totp-secret'))
  })
})
