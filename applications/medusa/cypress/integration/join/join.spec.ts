describe('Join', () => {
  before(() => {
    cy.cleanup()
  })

  it('check join on existing account', () => {
    cy.joinWithExistingAccount('artist_verified')
  })

  it('check join on new random account', () => {
    cy.joinWithNewRandomAccount()
  })
})
