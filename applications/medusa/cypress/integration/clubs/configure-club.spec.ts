import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 10000)

describe('Club - Configure', () => {
  const [username] = generateUsernameAndEmail()

  const clubName = generateClubName()

  const newClubName = generateClubName()

  it('create account', () => {
    cy.joinWithNewAccount(username)
  })

  it('assign artist role', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
  })

  it('create club', () => {
    cy.joinWithNewAccount(username)
    cy.visit('/clubs/create-club')
    cy.findByText('Your Club Name').should('be.visible')
    cy.findByPlaceholderText('The best name you can come up with').type(clubName)
    clickOnButton('Create Club')
    cy.url().should('include', `/club/${clubName}`)
  })

  it('visit club settings and change them', () => {
    cy.joinWithNewAccount(username)

    // change club name
    cy.visit(`/club/${clubName}/settings`)
    cy.findByText('Update Name').should('be.visible').click()
    cy.url().should('include', '/settings/name')

    cy.waitUntil(() => cy.findByRole('button', { name: /Change Club Name/iu }).should('not.be.disabled').click())
    cy.findByPlaceholderText(/Enter a new club name/).should('be.visible').type(newClubName)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText(/updated your club name/iu).should('be.visible')
    cy.findByRole('button', { name: /Change Club Name/iu }).click()

    // add club link and change to it
    cy.visit(`/club/${clubName}/settings`)
    cy.findByText('Manage Aliases').should('be.visible').click()
    cy.url().should('include', '/settings/aliases')

    cy.waitUntil(() => cy.findByRole('button', { name: /Add Club Link Alias/iu }).should('not.be.disabled').click())
    cy.findByPlaceholderText(/Enter a new club link/).should('be.visible').type(newClubName)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    // change to new club link and remove old
    cy.get('button[aria-label="Open Menu"]').click()
    cy.findByText(/Set Default/iu).should('be.visible').click()
    cy.get('button[aria-label="Open Menu"]').click()
    cy.findByText(/Remove Alias/iu).should('be.visible').click()
    cy.findByText(/clubName/iu).should('not.exist')
    cy.findByRole('button', { name: /Add Club Link Alias/iu }).click()
    cy.findByPlaceholderText(/Enter a new club link/).should('not.be.visible')

    // add new logo
    cy.visit(`/club/${newClubName}/settings`)
    cy.findByText('Club Thumbnail').should('be.visible').click()
    cy.url().should('include', '/settings/thumbnail')

    cy.waitUntil(() => cy.findByRole('button', { name: /Change Club Thumbnail/iu }).should('not.be.disabled').click({ force: true }))
    cy.findByText(/Drag and drop or/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.findByText(/Remove upload/iu).should('exist')
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText(/updated your club thumbnail/iu).should('be.visible')
  })

  it('visit club home page', () => {
    cy.joinWithNewAccount(username)

    cy.visit(`/club/${newClubName}/home`)
    cy.findAllByText(/Members/iu).should('exist')
  })

  it('visit club posts page', () => {
    cy.joinWithNewAccount(username)

    cy.visit(`/club/${newClubName}/posts`)
    cy.findByText(/Club Posts/iu).should('exist')
    cy.findByText(/No posts found/iu).should('exist')
  })

  it('visit club members page', () => {
    cy.joinWithNewAccount(username)

    cy.visit(`/club/${newClubName}/members`)
    cy.findByText('Club Members').should('exist')
    // club owner is now automatically a member
    // cy.findByText(/No members found/iu).should('exist')
  })

  it('cannot delete account', () => {
    cy.joinWithNewAccount(username)

    cy.visit('/settings/profile')
    cy.findByText('Delete Account').should('be.visible').click()
    cy.url().should('include', '/settings/profile/delete-account')
    cy.findByText(/You cannot delete your account because you currently own a club/iu).should('be.visible')
  })

  it('visit club public page', () => {
    const [username] = generateUsernameAndEmail()

    // need to visit club public page as a new member because owners are automatically members
    cy.joinWithNewAccount(username)

    cy.visit(`/${newClubName}`)
    cy.findByText(newClubName).should('exist')
    cy.findByRole('button', { name: /Join/iu }).should('not.be.disabled').click()
    cy.findByText(/You are now a member of/iu).should('be.visible')
    cy.findByRole('button', { name: /Leave/iu }).should('not.be.disabled').click()
    cy.findByRole('button', { name: /Join/iu }).should('exist')
  })
})
