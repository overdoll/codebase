import { clickOnAriaLabelButton, clickOnButton } from '../../support/user_actions'
import { generateClubName, generateUsernameAndEmail } from '../../support/generate'

const ClubName = 'Test Club'
const ClubSlug = 'TestClub'

describe('Club Page', () => {
  it('click club buttons', () => {
    cy.visit(`/${ClubSlug}`)
    clickOnAriaLabelButton('Copy Link')
    cy.findByText(/Copied to clipboard/iu).should('be.visible')
    clickOnButton('All Posts')
    cy.url().should('contain', `/${ClubSlug}/posts`)
  })

  it('join a club as not logged in', () => {
    cy.visit(`/${ClubSlug}`)
    clickOnButton(`Join ${ClubName}`)
    cy.url().should('include', '/join')
  })

  it('support a club as not logged in', () => {
    cy.visit(`/${ClubSlug}`)
    clickOnButton(/Become a Supporter/iu)
    cy.url().should('include', '/join')
  })

  it('join club as club owner, new account', () => {
    const [username] = generateUsernameAndEmail()
    const clubName = generateClubName()
    cy.joinWithNewAccount(username)
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
    cy.joinWithNewAccount(username)
    cy.createClub(clubName)

    /**
     * Join/support as club owner
     */
    cy.visit(`/${clubName}`)
    clickOnButton(`Join ${ClubName}`)
    cy.findByText(/you are already a member/iu).should('be.visible')
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/you are a supporter/iu).should('be.visible')
    clickOnButton(/Manage Club/iu)
    cy.url().should('contain', `/club/${clubName}/home`)

    /**
     * Join/leave as new account
     */
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.visit(`/${clubName}`)
    cy.findByText(clubName).should('exist')
    clickOnButton(`Join ${ClubName}`)
    cy.findByText(/You are now a member of/iu).should('be.visible')
    clickOnButton(/Leave/iu)
    cy.findByRole('button', { name: `Join ${ClubName}` }).should('not.be.disabled')
  })
})
