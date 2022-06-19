import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnPanel, clickOnToggle, typeIntoPlaceholder } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 10000)

describe('Payouts', () => {
  it('payout method, payout details, club payouts', () => {
    /**
     * Set up account for payouts
     */
    const [username] = generateUsernameAndEmail()
    const clubName = generateClubName()
    cy.joinWithNewAccount(username)
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
    cy.joinWithNewAccount(username)

    /**
     * Enable two factor so you can set up payouts
     */
    cy.visit('/settings/payouts')
    cy.findByText(/You must set up/iu).should('be.visible')
    cy.enableTwoFactor()

    /**
     * Payout details update
     */
    cy.visit('/settings/payouts')
    clickOnPanel('Enter your payout details')
    cy.url().should('include', '/settings/payouts/details')
    typeIntoPlaceholder('Enter a first name', 'Test')
    typeIntoPlaceholder('Enter a last name', 'Test')
    cy.findByText('Select a country').parent().should('not.be.disabled').select('Iraq')
    clickOnButton('Update Account Details')
    cy.findByText('Successfully updated account details').should('be.visible')
    clickOnButton('Back to Payouts Settings')
    cy.findByText('Your Payout Details').should('be.visible')
    // check invalid country
    cy.findByText('Payout Method').should('not.be.disabled').click()
    cy.findByText('Country Not Supported').should('be.visible')
    clickOnButton('Back to Payouts Settings')
    // restore to valid country
    cy.findByText('Update your payout details').should('not.be.disabled').click()
    cy.findByText(/Iran/iu).parent().select('Canada')
    clickOnButton('Update Account Details')
    cy.findByText('Successfully updated account details').should('be.visible')
    clickOnButton('Back to Payouts Settings')

    /**
     * Payout method update
     */
    clickOnPanel('Payout Method')
    cy.url().should('include', '/settings/payouts/method')
    cy.findByText('Platform Agreement').should('be.visible')
    clickOnToggle(/I fully understand the information provided/iu, true)
    clickOnButton('Next')
    cy.findByText(/Paxum is an E-wallet/iu).click()
    clickOnButton('Next')
    typeIntoPlaceholder('Enter your Paxum payments email', 'test@example.com')
    clickOnButton('Set up payout method')
    clickOnButton('Back to Payouts Settings')
    cy.findByText('Your Payout Method').should('be.visible')

    /**
     * Check club home to see payouts are configured
     */
    cy.createClub(clubName)
    cy.visit(`/club/${clubName}/home`)
    cy.findByText('Balance').should('be.visible')

    /**
     * Remove payout method
     */
    cy.visit('/settings/payouts')
    cy.findByText('Update your payout method').should('not.be.disabled').click()
    clickOnButton('Delete Payout Method')
    cy.findByText('Read Agreement').should('be.visible')
    clickOnButton('Back to Payouts Settings')
    cy.findByText('Set up your payout method').should('not.be.disabled')
  })
})
