import { clickOnButton } from '../../support/user_actions'
import { generateUsernameAndEmail } from '../../support/generate'

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
    cy.findByRole('button', { name: 'Support' }).first().should('not.be.disabled').click({ force: true })
  }

  const clickOnPostJoinButton = (): void => {
    cy.get(`button[aria-label="Join ${club}"]`).first().should('not.be.disabled').click({ force: true })
  }

  const clickOnPostLikeButton = (): void => {
    cy.get('button[aria-label="Like"]').first().should('not.be.disabled').click({ force: true })
  }

  it('like, join, support, report post as logged in', () => {
    /**
     * Like, unlike post
     */
    loginAndGotoPost()
    clickOnPostLikeButton()
    cy.get('button[aria-label="Remove Like"]').first().should('not.be.disabled').click({ force: true })
    cy.get('button[aria-label="Like"]').first().should('not.be.disabled')

    /**
     * Report post
     */
    cy.get('button[aria-label="Open Menu"]').first().click({ force: true }).parent().findByText(/Report Post/iu).should('be.visible').click({ force: true })
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
    cy.url().should('include', '/join')

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
    cy.get('button[aria-label="Open Menu"]').first().click({ force: true }).parent().findByText(/Report Post/iu).should('be.visible').click({ force: true })
    cy.url().should('include', '/join')

    /**
     * Copy link from post
     */
    gotoPost()
    cy.get('button[aria-label="Copy Link"]').first().should('not.be.disabled').click({ force: true })
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
    cy.findByText(club).should('be.visible')

    /**
     * Category
     */
    gotoPost()
    cy.findAllByText(category).first().should('not.be.disabled').click()
    cy.findByText('Category').should('be.visible')
  })
})
