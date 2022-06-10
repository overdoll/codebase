import { clickOnButton } from '../../support/user_actions'

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

  it('join a club as not logged in', () => {
    cy.visit('/TestClub')
    clickOnButton('Join')
    cy.url().should('include', '/join')
  })

  it('like a post as not logged in', () => {
    cy.visit('/TestClub/post/25WqmS7kgwotdDaxQDEa6I4CjuO')
    cy.findByText('Suggested Posts').should('exist')
    cy.get('button[aria-label="Like"]').first().should('not.be.disabled').click({ force: true })
    cy.url().should('include', '/join')
  })

  it('report a post as not logged in', () => {
    cy.visit('/TestClub/post/25WqmS7kgwotdDaxQDEa6I4CjuO')
    cy.findByText('Suggested Posts').should('exist')
    cy.get('button[aria-label="Open Menu"]').first().click({ force: true }).parent().findByText(/Report Post/iu).should('be.visible').click({ force: true })
    cy.url().should('include', '/join')
  })
})
