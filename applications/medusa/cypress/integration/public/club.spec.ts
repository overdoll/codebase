import { clickOnButton } from '../../support/user_actions'
import { generateUsernameAndEmail } from '../../support/generate'

Cypress.config('defaultCommandTimeout', 20000)

const ClubSlug = 'TestClub'

describe('Club Page', () => {
  it('join, support as not logged in', () => {
    cy.viewport('iphone-xr')
    /**
     * Join from club page
     */
    cy.visit(`/${ClubSlug}`)
    cy.findAllByRole('button', { name: 'Join' }).first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText(/Join this club/iu).should('be.visible')
    cy.findByRole('button', { name: 'Join' }).should('not.be.disabled').click({ force: true })
    cy.url().should('include', '/join')

    /**
     * Support from club page
     */
    cy.visit(`/${ClubSlug}`)
    clickOnButton(/Become a Supporter/iu)
    cy.url().should('include', '/join')
  })

  it('join club as club owner, new account', () => {
    cy.joinWithExistingAccount('0eclipse')

    // /**
    //  * Join/support as club owner
    //  */
    // cy.visit(`/${ClubSlug}`)
    // clickOnButton('Join')
    // cy.findByText(/you are already a member/iu).should('be.visible')
    // clickOnButton(/Become a Supporter/iu)
    // cy.findByText(/you are a supporter/iu).should('be.visible')
    // cy.findAllByRole('button', { name: /Manage Club/ }).first().should('be.visible').should('not.be.disabled').click({ force: true })
    // cy.url().should('contain', `/club/${ClubSlug}/home`)

    /**
     * Join/leave as new account
     */
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.visit(`/${ClubSlug}`)
    cy.findAllByRole('button', { name: 'Join' }).first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText(/You are now a member of/iu).should('be.visible')
    clickOnButton(/Leave/iu)
    cy.findByText(/See their newly/iu).should('be.visible')

    /**
     * Join from club page
     */
    cy.visit('/clubs/discover')
    cy.findAllByRole('button', { name: /Join/iu }).first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText(/You are now a member of/iu).should('be.visible')
  })

  it('click club buttons', () => {
    cy.visit(`/${ClubSlug}`)
    clickOnButton('All Posts')
    cy.url().should('contain', `/${ClubSlug}/posts`)
  })
})
