import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnTile } from '../../support/user_actions'

describe('Preferences', () => {
  it('preferences button as logged out', () => {
    cy.viewport('iphone-xr')
    cy.visit('/random')
    clickOnButton('Preferences')
    cy.findByText(/to filter out content you/iu)
    clickOnButton('Join')
    cy.url().should('contain', '/join')
  })

  it('preferences button as logged in', () => {
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.viewport('iphone-xr')
    cy.visit('/random')
    clickOnButton('Preferences')
    cy.findByText(/Choose what you want/iu).should('be.visible')
    clickOnTile('Standard Audience')
    cy.findByText(/We'll show you/iu).should('not.exist')
    clickOnButton('Save')
    cy.findByText(/We'll remember your choices/iu).should('be.visible')
  })
})
