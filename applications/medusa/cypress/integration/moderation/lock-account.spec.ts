import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnToggle } from '../../support/user_actions'

describe('Lock/Unlock Account', () => {
  const [username] = generateUsernameAndEmail()

  before(() => {
    cy.joinWithNewAccount(username)
  })

  it('lock account as staff', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/account/${username}`)
    clickOnButton('Lock Account')
    cy.findByText(/Select duration/iu).parent().should('be.visible').select('Warning (none)')
    clickOnButton('Confirm Lock Account')
  })

  it('login as locked account and unlock', () => {
    cy.joinWithExistingAccount(username)
    cy.visit('/settings/profile')
    cy.findByText(/Your account is currently locked/iu).should('be.visible')
    clickOnButton('View Details')
    clickOnToggle(/I promise to be better/iu, true)
    clickOnButton('Unlock Account')
    cy.findByText('Your account has been unlocked').should('be.visible')
  })

  it('login as staff and lock for 12h', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/account/${username}`)
    clickOnButton('Lock Account')
    cy.findByText('Select duration').parent().should('be.visible').select('12 hours')
    clickOnButton('Confirm Lock Account')
  })

  it('login as locked and see that you cant unlock', () => {
    cy.joinWithExistingAccount(username)
    cy.visit('/')
    clickOnButton('View Details')
    cy.findByText(/Locked for/iu).should('be.visible')
  })

  it('delete account', () => {
    const deleteText = `delete ${username}`

    cy.joinWithExistingAccount(username)
    cy.visit('/settings/profile')

    // delete account
    cy.findByText('Delete Account').should('be.visible').click()
    cy.url().should('include', '/settings/profile/delete-account')
    cy.findByText(/If you are no longer using/iu).should('be.visible')
    clickOnButton('Delete Account')
    cy.findByPlaceholderText(deleteText).type(deleteText)
    clickOnButton('Confirm Delete Account')
    cy.findByText(/Your account has been successfully scheduled for deletion/iu).should('be.visible')

    // undelete account
    cy.reload()
    cy.findByText(/You have requested to delete your account/iu).should('be.visible')
    clickOnButton('Cancel Account Deletion')
    cy.findByText(/You have cancelled the/iu).should('be.visible')
  })
})
