import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnToggle } from '../../support/user_actions'

describe('Lock/Unlock Account', () => {
  it('lock account, unlock account as staff and account', () => {
    /**
     * Setup account
     */
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)

    /**
     * Lock account as staff for 0h
     */
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/account/${username}`)
    clickOnButton('Lock Account')
    cy.findByText(/Select duration/iu).parent().should('be.visible').select('Warning (none)')
    clickOnButton('Confirm Lock Account')

    /**
     * Unlock account as owner
     */
    cy.joinWithExistingAccount(username)
    cy.visit('/settings/profile')
    cy.findByText(/Your account is currently locked/iu).should('be.visible')
    clickOnButton('View Details')
    clickOnToggle(/I promise to be better/iu, true)
    clickOnButton('Unlock Account')
    cy.findByText('Your account has been unlocked').should('be.visible')

    /**
     * Lock account as staff for 12h
     */
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/account/${username}`)
    clickOnButton('Lock Account')
    cy.findByText('Select duration').parent().should('be.visible').select('12 hours')
    clickOnButton('Confirm Lock Account')

    /**
     * Attempt to unlock account as owner and see that you can't
     */
    cy.joinWithExistingAccount(username)
    cy.visit('/')
    clickOnButton('View Details')
    cy.findByText(/Locked for/iu).should('be.visible')
  })
})
