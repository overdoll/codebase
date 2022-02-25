describe('Visit Public Pages', () => {
  const username = '0eclipse'

  it('go to the home page', () => {
    cy.visit('/')
  })

  it('go to the clubs page', () => {
    cy.visit('/clubs')
    cy.findByPlaceholderText(/Search for a club by name/iu).should('exist')
    // TODO try joining a club as a not logged in user
  })

  it('go to the help page', () => {
    cy.visit('/help')
    cy.findByText(/General Help/iu).should('exist')
    // TODO make sure help links work?
  })

  it('go to a profile', () => {
    cy.visit(`/m/${username}`)
    cy.findByText(username).should('exist')
  })

  // TODO go to a public post and interact with it (probably a separate test)
})
