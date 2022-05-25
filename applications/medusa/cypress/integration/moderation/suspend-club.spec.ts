import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnToggle } from '../../support/user_actions'

describe('Suspend/UnSuspend Club', () => {
  const [username] = generateUsernameAndEmail()
  const club = generateClubName()

  it('create account', () => {
    cy.joinWithNewAccount(username)
  })

  it('assign artist role', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
  })

  it('create club', () => {
    cy.joinWithNewAccount(username)
    cy.createClub(club)
  })

  it('suspend club as staff', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    clickOnButton('Suspend Club')
    cy.findByText('Suspension Duration').should('be.visible')
    cy.findAllByText('Select duration').first().parent().should('be.visible').select('Warning (none)')
    clickOnButton('Confirm Suspend Club')
    cy.reload()
    cy.findByText('Suspended').should('be.visible')
  })

  it('login as suspended club and unsuspend', () => {
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${club}/home`)
    clickOnButton('Details')
    clickOnToggle(/I promise to be better/iu, true)
    clickOnButton('Un-Suspend Club')
    cy.findByText('Your club has been un-suspended').should('be.visible')
  })

  it('login as staff and suspend for 12h', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    clickOnButton('Suspend Club')
    cy.findAllByText('Select duration').first().parent().should('be.visible').select('12 hours')
    clickOnButton('Confirm Suspend Club')
    cy.reload()
    cy.findByText('Suspended').should('be.visible')
  })

  it('login as suspended club and see that you cant unsuspend', () => {
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${club}/home`)
    clickOnButton('Details')
    cy.findByText(/Locked for/iu).should('be.visible')
  })

  it('login as staff and terminate club', () => {
    const cancellationText = `cancel all subscriptions for ${club}`
    const terminationText = `terminate ${club}`

    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    cy.findByText('Termination').should('not.be.disabled').click()

    // cancel club supporter subscriptions
    cy.findByText('Cancel Active Supporter Subscriptions').should('be.visible')
    clickOnButton('Cancel Supporter Subscriptions')
    cy.findByText(/into the input below to confirm that you would like to cancel all of the club's active supporter subscriptions/iu).should('be.visible')
    cy.findByPlaceholderText(cancellationText).type(cancellationText)
    clickOnButton('Cancel all active club supporter subscriptions')
    cy.findByText(/Successfully cancelled all active club supporter subscriptions/iu).should('be.visible')

    // terminate club
    clickOnButton('Terminate Club')
    cy.findByText(/into the input below to confirm that you would like to terminate the club/iu).should('be.visible')
    cy.findByPlaceholderText(terminationText).type(terminationText)
    clickOnButton('Confirm Terminate Club')
    cy.findByText(/Successfully terminated club/iu).should('be.visible')
    cy.reload()
    cy.findByText('Terminated').should('be.visible')
  })

  it('login as terminated club', () => {
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${club}/home`)
    cy.findByText(/Club was terminated by/iu).should('be.visible')
  })
})
