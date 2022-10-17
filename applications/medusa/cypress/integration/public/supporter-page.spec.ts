import { generateUsernameAndEmail } from '../../support/generate'

Cypress.config('defaultCommandTimeout', 20000)

describe('Supporter Landing Page', () => {
  it('go to the supporters page as logged in', () => {
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    cy.visit('/supporter')
    cy.findAllByText('Support Now').first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText(/Become a supporter to help/iu).should('be.visible')
  })
  it('go to the supporters page as not logged in', () => {
    cy.visit('/supporter')
    cy.findAllByText('Support Now').first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.url().should('contain', '/join')
  })
})
