import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnPanel, typeIntoPlaceholder } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 10000)

describe('Manage Club', () => {
  it('club settings, club pages, public club join', () => {
    /**
     * Set up the account to use in the tests
     */
    const [username] = generateUsernameAndEmail()
    const clubName = generateClubName()
    const newClubName = generateClubName()
    cy.joinWithNewAccount(username)
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
    cy.joinWithNewAccount(username)

    /**
     * Use the club creator page to create a club
     */
    cy.visit('/clubs/create-club')
    cy.findByText('Your Club Name').should('be.visible')
    typeIntoPlaceholder('The best name you can come up with', clubName)
    clickOnButton('Create Club')
    cy.url().should('include', `/club/${clubName}`)

    /**
     * Visit club public page
     */
    cy.visit(`/${clubName}`)
    cy.findByText(/You haven't posted/iu).should('be.visible')
    clickOnButton(/Create a Post/iu)
    cy.url().should('include', `/club/${clubName}/create-post`)

    /**
     * Change club name
     */
    cy.visit(`/club/${clubName}/settings`)
    clickOnPanel('Update Name')
    cy.url().should('include', '/settings/name')
    cy.waitUntil(() => cy.findByRole('button', { name: /Change Club Name/iu }).should('not.be.disabled').click())
    typeIntoPlaceholder(/Enter a new club name/, newClubName)
    clickOnButton(/Submit/i)
    cy.findByText(/updated your club name/iu).should('be.visible')
    clickOnButton(/Change Club Name/i)

    /**
     * Add and remove aliases
     */
    cy.visit(`/club/${clubName}/settings`)
    clickOnPanel('Manage Aliases')
    cy.url().should('include', '/settings/aliases')
    cy.waitUntil(() => cy.findByRole('button', { name: /Add Club Link Alias/iu }).should('not.be.disabled').click())
    typeIntoPlaceholder(/Enter a new club link/, newClubName)
    clickOnButton(/Submit/iu)
    // change to new club link and remove old
    cy.get('button[aria-label="Open Menu"]').click()
    cy.findByText(/Set Default/iu).should('be.visible').click()
    cy.get('button[aria-label="Open Menu"]').click()
    cy.findByText(/Remove Alias/iu).should('be.visible').click()
    cy.findByText(/clubName/iu).should('not.exist')
    clickOnButton(/Add Club Link Alias/iu)
    cy.findByPlaceholderText(/Enter a new club link/).should('not.be.visible')

    /**
     * Upload new logo
     */
    cy.visit(`/club/${newClubName}/settings`)
    clickOnPanel('Club Thumbnail')
    cy.url().should('include', '/settings/thumbnail')
    cy.findByText('Drop').should('be.visible').parent().parent().get('input[type="file"]').attachFile('test-post.png')
    cy.findByText(/updated your club thumbnail/iu).should('be.visible')

    /**
     * Visit club home page
     */
    cy.visit(`/club/${newClubName}/home`)
    cy.findAllByText(/Members/iu).should('exist')
    cy.findByText(/Not Collecting Subscriptions/iu).should('be.visible')
    cy.findByText(/Payouts Not Setup/iu).should('be.visible')

    /**
     * Visit club posts page
     */
    cy.visit(`/club/${newClubName}/posts`)
    cy.findByText(/Club Posts/iu).should('exist')
    cy.findByText(/No posts were found/iu).should('exist')

    /**
     * Visit club members page
     */
    cy.visit(`/club/${newClubName}/members`)
    cy.findByText('Club Members').should('exist')
    cy.findByText(username).should('be.visible')

    /**
     * Check that you can't delete your account when you own a club
     */
    cy.visit('/settings/profile')
    cy.findByText('Delete Account').should('be.visible').click()
    cy.url().should('include', '/settings/profile/delete-account')
    cy.findByText(/You cannot delete your account because you currently own a club/iu).should('be.visible')
  })
})
