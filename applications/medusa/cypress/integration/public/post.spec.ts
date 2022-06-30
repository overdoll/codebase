import { clickOnButton } from '../../support/user_actions'
import { generateUsernameAndEmail } from '../../support/generate'

const club = 'Test Club'
const rule = 'Rule #1 without infraction'
const character = 'Susannah Aguilar'

describe('Post', () => {
  beforeEach(() => {
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    cy.visit('/TestClub/post/25WqmS7kgwotdDaxQDEa6I4CjuO')
    cy.findByText('Suggested Posts').should('exist')
  })

  it('like post', () => {
    cy.get('button[aria-label="Like"]').first().should('not.be.disabled').click({ force: true })
  })

  it('click on the post club', () => {
    cy.findAllByText(club).first().should('not.be.disabled').click()
    cy.findByText(/Top Posts/iu).should('be.visible')
  })

  it('report post', () => {
    cy.get('button[aria-label="Open Menu"]').first().click({ force: true }).parent().findByText(/Report Post/iu).should('be.visible').click({ force: true })
    cy.findByText(rule).should('not.be.disabled').click({ force: true })
    clickOnButton('Submit Report')
    cy.findByText(/Post report was submitted/iu).should('be.visible')
    cy.get('button[aria-label="Open Menu"]').first().click({ force: true })
    cy.findAllByText(/Reported/iu).should('be.visible')
  })

  it('click on post character', () => {
    cy.findByText(character).should('not.be.disabled').click({ force: true })
    cy.findByText('Character').should('be.visible')
  })
})
