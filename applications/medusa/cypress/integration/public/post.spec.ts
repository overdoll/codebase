import { generateUsernameAndEmail } from '../../support/generate'

Cypress.config('defaultCommandTimeout', 20000)

// const club = 'Test Club'
const character = 'Susannah Aguilar'
const category = 'Assure'

describe('Post', () => {
  const gotoPost = (): void => {
    cy.visit('/TestClub/post/25WqmS7kgwotdDaxQDEa6I4CjuO')
    cy.findByText('Like this post').should('be.visible')
  }

  const loginAndGotoPost = (): void => {
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    gotoPost()
  }

  const clickOnPostJoinButton = (): void => {
    cy.findAllByRole('button', { name: 'Join' }).first().should('be.visible').should('not.be.disabled').click({ force: true })
  }

  const clickOnPostLikeButton = (): void => {
    cy.findAllByRole('button', { name: 'Like' }).first().should('be.visible').should('not.be.disabled').click({ force: true })
  }

  const clickonReportPostMenuItem = (): void => {
    cy.get('button[aria-label="Open Menu"]').first().should('be.visible').should('not.be.disabled').click({ force: true }).parent().findByText(/Report Post/iu).should('be.visible').click({ force: true })
  }

  it('club, character, category on post', () => {
    /**
     * Club
     */
    // gotoPost()
    // cy.findAllByText(club).first().scrollIntoView().should('be.visible').should('not.be.disabled').click({ force: true })
    // cy.findByText(/See their newly/iu).should('be.visible')

    /**
     * Character
     */
    gotoPost()
    cy.findByText(character).should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText('Character').should('be.visible')

    /**
     * Category
     */
    gotoPost()
    cy.findAllByText(category).first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText('Category').should('be.visible')
  })

  it('like, join, support, report post as logged in', () => {
    /**
     * Like, unlike post
     */
    loginAndGotoPost()
    clickOnPostLikeButton()
    cy.findAllByRole('button', { name: 'Liked' }).first().should('not.be.disabled').click({ force: true })
    cy.findAllByRole('button', { name: 'Like' }).first().should('not.be.disabled')

    /**
     * Report post
     */
    // clickonReportPostMenuItem()
    // cy.findByText(rule).should('not.be.disabled').click({ force: true })
    // clickOnButton('Submit Report')
    // cy.findByText(/Post report was submitted/iu).should('be.visible')
    // cy.get('button[aria-label="Open Menu"]').first().click({ force: true })
    // cy.findAllByText(/Reported/iu).should('be.visible')

    /**
     * Join from post
     */
    clickOnPostJoinButton()
    cy.findByText(/You are now a member of/iu).should('be.visible')
  })

  it('like, join, support, report as not logged in', () => {
    cy.viewport('iphone-xr')
    /**
     * Like post
     */
    gotoPost()
    clickOnPostLikeButton()
    cy.findByText(/Like this post/iu).should('be.visible')

    /**
     * Join from post
     */
    gotoPost()
    clickOnPostJoinButton()
    cy.findByText(/Join this club/iu).should('be.visible')

    /**
     * Report from post
     */
    gotoPost()
    clickonReportPostMenuItem()
    cy.url().should('include', '/join')
  })
})
