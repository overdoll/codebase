describe('Pages', () => {
  it('go to the creators page as not logged in', () => {
    cy.visit('/creators')
    cy.findAllByText(/The next platform for/iu)
  })

  it('go to the supporter page as not logged in', () => {
    cy.visit('/supporter')
    cy.findAllByText('BECOME A SUPPORTER').should('be.visible')
  })

  it('go to the help page', () => {
    cy.visit('/help')
    cy.findByText(/Legal/iu).should('exist')
  })

  it('go to a profile', () => {
    const username = '0eclipse'
    cy.visit(`/profile/${username}`)
    cy.findByText(username).should('exist')
  })
})
