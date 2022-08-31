import { clickOnButton } from '../../support/user_actions'
import { generateUsernameAndEmail } from '../../support/generate'

Cypress.config('defaultCommandTimeout', 10000)

const club = 'Test Club'
const rule = 'Rule #1 without infraction'
const character = 'Susannah Aguilar'
const category = 'Assure'

describe('Post', () => {
  const gotoPost = (): void => {
    cy.visit('/TestClub/post/25WqmS7kgwotdDaxQDEa6I4CjuO')
    cy.findByText('View Post').should('exist')
  }

  const loginAndGotoPost = (): void => {
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    gotoPost()
  }

  const clickOnPostSupportButton = (): void => {
    cy.findAllByRole('button', { name: 'Support' }).first().should('be.visible').should('not.be.disabled').click({ force: true })
  }

  const clickOnPostJoinButton = (): void => {
    cy.get(`button[aria-label="Join ${club}"]`).first().should('be.visible').should('not.be.disabled').click({ force: true })
  }

  const clickOnPostLikeButton = (): void => {
    cy.get('button[aria-label="Save"]').first().should('be.visible').should('not.be.disabled').click({ force: true })
  }

  const clickonReportPostMenuItem = (): void => {
    cy.get('button[aria-label="Open Menu"]').first().should('be.visible').should('not.be.disabled').click({ force: true }).parent().findByText(/Report Post/iu).should('be.visible').click({ force: true })
  }

  it('visit post as club owner', () => {
    cy.joinWithExistingAccount('0eclipse')
    gotoPost()
    /**
     * Click on manage club button
     */
    cy.findAllByRole('button', { name: /Manage Club/ }).first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.url().should('contain', '/club/TestClub/home')
  })

  it('like, join, support, report post as logged in', () => {
    /**
     * Like, unlike post
     */
    loginAndGotoPost()
    clickOnPostLikeButton()
    cy.get('button[aria-label="Un-Save"]').first().should('not.be.disabled').click({ force: true })
    cy.get('button[aria-label="Save"]').first().should('not.be.disabled')

    /**
     * Report post
     */
    clickonReportPostMenuItem()
    cy.findByText(rule).should('not.be.disabled').click({ force: true })
    clickOnButton('Submit Report')
    cy.findByText(/Post report was submitted/iu).should('be.visible')
    cy.get('button[aria-label="Open Menu"]').first().click({ force: true })
    cy.findAllByText(/Reported/iu).should('be.visible')

    /**
     * Join from post
     */
    clickOnPostJoinButton()
    cy.findByText(/You are now a member of/iu).should('be.visible')

    /**
     * Support from post
     */
    clickOnPostSupportButton()
    cy.findByText(/Your contribution directly supports/iu).should('be.visible')
  })

  it('like, join, support, report as not logged in', () => {
    /**
     * Like post
     */
    gotoPost()
    clickOnPostLikeButton()
    cy.findByText(/Save this post to your bookmarks/iu).should('be.visible')

    /**
     * Join from post
     */
    gotoPost()
    clickOnPostJoinButton()
    cy.url().should('include', '/join')

    /**
     * Support from post
     */
    gotoPost()
    clickOnPostSupportButton()
    cy.url().should('include', '/join')

    /**
     * Report from post
     */
    gotoPost()
    clickonReportPostMenuItem()
    cy.url().should('include', '/join')

    /**
     * Copy link from post
     */
    gotoPost()
    cy.get('button[aria-label="Copy Post Link"]').first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText(/Copied to clipboard/iu).should('be.visible')
  })

  it('club, character, category on post', () => {
    /**
     * Character
     */
    gotoPost()
    cy.findByText(character).should('not.be.disabled').click({ force: true })
    cy.findByText('Character').should('be.visible')

    /**
     * Club
     */
    gotoPost()
    cy.findAllByText(club).first().should('not.be.disabled').click()
    cy.findByText(/Join this club to see/iu).should('be.visible')

    /**
     * Category
     */
    gotoPost()
    cy.findAllByText(category).first().should('not.be.disabled').click()
    cy.findByText('Category').should('be.visible')
  })
})
