import { clickOnButton } from '../../support/user_actions'
import { generateUsernameAndEmail } from '../../support/generate'

describe('Visit Public Post', () => {
  const club = 'Test Club'
  const rule = 'Rule #1 without infraction'
  const character = 'Susannah Aguilar'
  const series = 'Foreigner On Mars'
  const category = 'Assure'
  const [username, email] = generateUsernameAndEmail()

  beforeEach(() => {
    cy.joinWithNewAccount(username, email)
    cy.visit('/TestClub/post/25WqmS7kgwotdDaxQDEa6I4CjuO')
    cy.findByText(/Recommended Posts/iu).should('exist')
  })

  it('like post', () => {
    cy.get('button[aria-label="Like"]').should('not.be.disabled').click({ force: true })
    // TODO test this correctly when liking is not broken
  })

  it('click on paginator', () => {
    cy.findByText(/Recommended Posts/iu).should('not.be.disabled').click({ force: true })
    cy.get('button[aria-label="Open Search"]').should('be.visible')
    cy.go('back')
    cy.findByText(/Recommended Posts/iu).should('not.be.disabled')
    cy.findByText(/Recommended Posts/iu).should('not.be.disabled').click({ force: true })
    cy.get('button[aria-label="Open Search"]').should('be.visible')
    clickOnButton('View Post')
    cy.findByText(/Recommended Posts/iu).should('not.be.disabled')
  })

  it('click on the post club', () => {
    cy.findByText(club).should('not.be.disabled').click()
    cy.findByText(/Exclusive Posts/iu).should('be.visible')
  })

  it('report post', () => {
    cy.get('button[aria-label="Open Menu"]').click({ force: true })
    cy.findByText(/Report Post/iu).should('be.visible').click({ force: true })
    cy.findByText(rule).should('not.be.disabled').click({ force: true })
    clickOnButton('Submit Report')
    cy.findByText(/Post report was submitted/iu).should('be.visible')
  })

  it('click on character', () => {
    cy.findByText(character).should('not.be.disabled').click({ force: true })
    cy.url().should('include', '/search')
  })

  it('click on series', () => {
    cy.findByText(series).should('not.be.disabled').click({ force: true })
    cy.url().should('include', '/search')
  })

  it('click on category', () => {
    cy.findByText(category).should('not.be.disabled').click({ force: true })
    cy.url().should('include', '/search')
  })
})
