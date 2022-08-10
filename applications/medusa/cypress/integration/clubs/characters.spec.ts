import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnTab, clickOnTile, typeIntoPlaceholder } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 10000)

const character = 'TestCharacter'

describe('Club Characters', () => {
  it('club characters', () => {
    /**
     * Set up the account to use in the tests
     */
    const [username] = generateUsernameAndEmail()
    const clubName = generateClubName()
    cy.joinWithNewAccount(username)
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
    cy.joinWithNewAccount(username)
    cy.createClub(clubName)

    /**
     * Visit characters page as not enabled
     */
    cy.visit(`/club/${clubName}/characters`)
    cy.findByText(/Custom Characters Disabled/iu).should('be.visible')

    /**
     * Enable characters as staff
     */
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${clubName}`)
    clickOnTab('Posts')
    clickOnButton('Enable Club Characters')
    cy.findByText(/Successfully enabled characters/iu).should('be.visible')

    /**
     * Create character as club owner
     */
    cy.visit(`/club/${clubName}/characters`)
    cy.findByText(/You haven't created/iu).should('be.visible')
    clickOnButton('Create Character')
    cy.findByText(/Create Club Character/iu).should('be.visible')
    typeIntoPlaceholder(/Character name/iu, character)
    clickOnButton('Create Character')
    cy.findByText(/Successfully created character/iu).should('be.visible')
    clickOnTile(character)
    cy.findByText('Club Character').should('be.visible')
  })
})
