describe('Pages', () => {
  it('go to the home page', () => {
    cy.visit('/')
  })

  it('go to the invite only page as not logged in', () => {
    cy.visit('/clubs/invite-only')
    cy.findAllByText(/overdoll is invite-only/iu)
  })

  it('go to the clubs discover page as not logged in', () => {
    cy.visit('/clubs/discover')
    cy.findByText(/Create an account/iu)
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
