import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnToggle } from '../../support/user_actions'

describe('Suspend/UnSuspend Club', () => {
  const [username, email] = generateUsernameAndEmail()
  const club = generateClubName()

  before(() => {
    cy.joinWithNewAccount(username, email)
    cy.createClub(club)
  })

  it('suspend club as staff', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    clickOnButton('Suspend Club')
    cy.findAllByText('Select duration').first().parent().select('Warning (none)')
    clickOnButton('Confirm Suspend Club')
  })

  it('login as suspended club and unsuspend', () => {
    cy.joinWithExistingAccount(username)
    cy.visit(`/club/${club}/home`)
    clickOnButton('Details')
    clickOnToggle(/I promise to be better/iu, true)
    clickOnButton('Un-Suspend Club')
    cy.findByText('Your club has been un-suspended').should('be.visible')
  })

  it('login as staff and suspend for 12h', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/account/${username}`)
    cy.visit(`/staff/club/${club}`)
    clickOnButton('Suspend Club')
    cy.findAllByText('Select duration').first().parent().select('12 hours')
    clickOnButton('Confirm Suspend Club')
  })

  it('login as suspended club and see that you cant unsuspend', () => {
    cy.joinWithExistingAccount(username)
    cy.visit(`/club/${club}/home`)
    clickOnButton('Details')
    cy.findByText(/Locked for/iu).should('be.visible')
  })
})
