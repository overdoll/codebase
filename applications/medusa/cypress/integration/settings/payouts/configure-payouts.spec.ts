import { generateClubName, generateUsernameAndEmail } from '../../../support/generate'
import { clickOnButton, clickOnToggle } from '../../../support/user_actions'

Cypress.config('defaultCommandTimeout', 10000)

describe('Settings - Configure Payouts', () => {
  const [username] = generateUsernameAndEmail()
  const clubName = generateClubName()

  before(() => {
    cy.joinWithNewAccount(username)
  })

  it('fill out payout details', () => {
    cy.assignArtistRole(username)
    cy.joinWithNewAccount(username)
    cy.visit('/settings/payouts')
    cy.findByText(/You must set up/iu).should('be.visible')
    cy.enableTwoFactor()
    cy.visit('/settings/payouts')
    // payout details
    cy.findByText('Enter your payout details').should('not.be.disabled').click()
    cy.url().should('include', '/settings/payouts/details')
    cy.findByPlaceholderText('Enter a first name').should('be.visible').type('Test')
    cy.findByPlaceholderText('Enter a last name').should('be.visible').type('Test')
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

    // payout method
    cy.findByText('Payout Method').should('not.be.disabled').click()
    cy.url().should('include', '/settings/payouts/method')
    cy.findByText('Read Agreement').should('be.visible')
    clickOnToggle(/I fully understand the information provided/iu, true)
    clickOnButton('Next')
    cy.findByText(/Paxum is an E-wallet/iu).click()
    clickOnButton('Next')
    cy.findByPlaceholderText('Enter your Paxum payments email').should('be.visible').type('test@example.com')
    clickOnButton('Set up payout method')
    clickOnButton('Back to Payouts Settings')
    cy.findByText('Your Payout Method').should('be.visible')

    // remove payout method
    cy.findByText('Update your payout method').should('not.be.disabled').click()
    clickOnButton('Delete Payout Method')
    cy.findByText('Read Agreement').should('be.visible')
    clickOnButton('Back to Payouts Settings')
    cy.findByText('Set up your payout method').should('not.be.disabled')

    // payouts marked as configured in club home
    cy.createClub(clubName)
    cy.visit(`/club/${clubName}/home`)
    cy.findByText('Balance').should('be.visible')
  })
})
