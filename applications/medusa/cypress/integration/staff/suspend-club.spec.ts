import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnToggle, typeIntoPlaceholder } from '../../support/user_actions'

describe('Suspend/UnSuspend/Terminate/UnTerminate/Cancel Subscriptions Club', () => {
  it('suspend club, unsuspend club, cancel all subscriptions, terminate club, unterminate club', () => {
    /**
     * Set up account
     */
    const [username] = generateUsernameAndEmail()
    const club = generateClubName()
    cy.joinWithNewAccount(username)
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
    cy.joinWithNewAccount(username)
    cy.createClub(club)

    /**
     * Suspend club as staff for 0h
     */
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    clickOnButton('Suspend Club')
    cy.findByText('Suspension Duration').should('be.visible')
    cy.findAllByText('Select duration').first().parent().should('be.visible').select('Warning (none)')
    clickOnButton('Confirm Suspend Club')
    cy.findByText(/Successfully suspended club/iu).should('be.visible')

    /**
     * Unsuspend club as owner
     */
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${club}/home`)
    clickOnButton('Details')
    clickOnToggle(/I promise to be better/iu, true)
    clickOnButton('Un-Suspend Club')
    cy.findByText('Your club has been un-suspended').should('be.visible')

    /**
     * Suspend club as staff for 12h
     */
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    clickOnButton('Suspend Club')
    cy.findAllByText('Select duration').first().parent().should('be.visible').select('12 hours')
    clickOnButton('Confirm Suspend Club')
    cy.reload()
    cy.findByText('Suspended').should('be.visible')

    /**
     * Unsuspend as club owner and see that you can't
     */
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${club}/home`)
    clickOnButton('Details')
    cy.findByText(/Locked for/iu).should('be.visible')

    /**
     * Terminate club as staff
     */
    const cancellationText = `cancel all subscriptions for ${club}`
    const terminationText = `terminate ${club}`

    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    cy.findByText('Termination').should('not.be.disabled').click()

    // cancel club supporter subscriptions
    cy.findByText('Cancel Active Supporter Subscriptions').should('be.visible')
    clickOnButton('Cancel Supporter Subscriptions')
    cy.findByText(/into the input below to confirm that you would like to cancel all of the club's active supporter subscriptions/iu).should('be.visible')
    typeIntoPlaceholder(cancellationText, cancellationText)
    clickOnButton('Cancel all active club supporter subscriptions')
    cy.findByText(/Successfully cancelled all active club supporter subscriptions/iu).should('be.visible')

    // terminate club
    clickOnButton('Terminate Club')
    cy.findByText(/into the input below to confirm that you would like to terminate the club/iu).should('be.visible')
    typeIntoPlaceholder(terminationText, terminationText)
    clickOnButton('Confirm Terminate Club')
    cy.findByText(/Successfully terminated club/iu).should('be.visible')
    cy.reload()
    cy.findByText('Terminated').should('be.visible')

    /**
     * Login as terminated club and see it terminated
     */
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${club}/home`)
    cy.findByText(/This club was terminated/iu).should('be.visible')

    /**
     * UnTerminate club as staff
     */
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/staff/club/${club}`)
    cy.findByText('Termination').should('not.be.disabled').click()
    clickOnButton('Remove Termination')
    clickOnButton(/Un-Terminate Club/iu)
    cy.findByText(/Successfully un-terminated club/iu).should('be.visible')

    /**
     * Login as club owner and see termination removed
     */
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${club}/home`)
    cy.findByText(/This club was terminated/iu).should('not.exist')
  })
})
