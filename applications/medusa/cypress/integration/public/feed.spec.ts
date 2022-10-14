import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 20000)

describe('Feed', () => {
  it('go to the feed page as logged in', () => {
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.viewport('iphone-xr')
    cy.visit('/feed')
    cy.findByText(/Set up your curation profile/iu).should('be.visible')

    // set up curation profile
    clickOnButton('Set Up')
    cy.findByText(/Enter your birthday/).should('be.visible')
    cy.findByText('Month').parent().select('January')
    cy.findByText('Day').parent().select('1')
    cy.findByText('Year').parent().select('1990')
    clickOnButton('Save')
    cy.findByText(/Choose what you want to see/).should('be.visible')
    // TODO finish feed test
    // clickOnButton('Next')
  })

  it('go to the feed page as logged out', () => {
    cy.viewport('iphone-xr')
    cy.visit('/feed')

    cy.findByText(/Join to unlock a/iu).should('be.visible')
    clickOnButton('Join')
    cy.url().should('contain', '/join')
  })
})
