describe('Pages', () => {
  it('go to the home page', () => {
    cy.visit('/')
  })

  it('go to browse page', () => {
    cy.visit('/browse')
  })

  it('go to random page', () => {
    cy.visit('/random')
  })

  it('go to new page', () => {
    cy.visit('/new')
  })

  it('go to top page', () => {
    cy.visit('/top')
  })

  it('go to the artists page as not logged in', () => {
    cy.visit('/artists')
    cy.findAllByText(/overdoll is the first true/iu)
  })

  // TODO add tests for joining club from discover page as logged in, not logged in
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
