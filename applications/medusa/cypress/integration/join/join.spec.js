describe('Join', () => {
  it('check join on existing account', () => {
    const email = cy.account.email('artist_verified')

    cy.join(email).existingAccount()
  })

  it('check join on new account', () => {
    const username = cy.account.username()
    const email = cy.account.email()

    cy.join(email).newAccount(username)
  })
})
