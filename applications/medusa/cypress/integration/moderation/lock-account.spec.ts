import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnToggle } from '../../support/user_actions'

describe('Lock/Unlock Account', () => {
  const [username, email] = generateUsernameAndEmail()

  before(() => {
    cy.joinWithNewAccount(username, email)
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
})
