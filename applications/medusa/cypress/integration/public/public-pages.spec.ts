import { clickOnButton } from '../../support/user_actions'

describe('Visit Public Pages', () => {
  const username = '0eclipse'

  it('go to the home page', () => {
    cy.visit('/')
  })

  it('go to the invite only page as not logged in', () => {
    cy.visit('/clubs/invite-only')
    cy.findByText(/overdoll is invite-only/iu)
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
    cy.visit(`/profile/${username}`)
    cy.findByText(username).should('exist')
  })

  it('join a club as not logged in', () => {
    cy.visit('/TestClub')
    clickOnButton('Join')
    cy.url().should('include', '/join')
  })
})
