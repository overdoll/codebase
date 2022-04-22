describe('Visit Public Pages', () => {
  const username = '0eclipse'

  it('go to the home page', () => {
    cy.visit('/')
  })

  it('go to the clubs discover page', () => {
    cy.visit('/clubs/discover')
    cy.findByPlaceholderText(/Search for a club by name/iu).should('exist')
    // TODO try joining a club as a not logged in user
  })

  it('go to the help page', () => {
    cy.visit('/help')
    cy.findByText(/Legal/iu).should('exist')
    // TODO make sure help links work?
  })

  it('go to a profile', () => {
    cy.visit(`/profile/${username}`)
    cy.findByText(username).should('exist')
  })

  // TODO go to a public post and interact with it (probably a separate test)
})
