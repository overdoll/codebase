describe('Join', () => {
  const email = 'i2fhz.artist_verified@inbox.testmail.app'

  it('asks to check email when joining', () => {
    cy.login(email, false)

    // our email is shown on the page - we are asked to check it
    cy.findByText(email).should('exist')
  })

  it('persists state when refreshing', () => {
    cy.login(email, false)

    cy.reload()

    // after a reload, we should still see our email on the page
    cy.findByText(email).should('exist')
  })

  it('redirects to profile when redeeming an existing user token, and ensures account is correctly set up', () => {
    cy.login(email)

    cy.url().should('include', '/profile')
  })
})
