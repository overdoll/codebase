import { generateEmailFromExistingUsername, generateUsernameAndEmail } from '../../support/generate'
import { join, logout } from '../../support/join_actions'
import { clickOnButton, typeIntoPlaceholder } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 20000)

describe('Join', () => {
  it('check join on new random account', () => {
    /**
     * Register and check state
     */
    const [username, email] = generateUsernameAndEmail()
    join(email)
    cy.findByText(/What should we call/iu).should('be.visible')

    // refresh should restore state
    cy.reload()
    cy.findByText(/What should we call/iu).should('be.visible')

    typeIntoPlaceholder('Enter a username', username)
    clickOnButton(/Register/iu)
    cy.findByText(/Welcome to overdoll!/iu).should('exist')
    cy.url().should('include', '/feed')

    /**
     * Log out and check state
     */
    cy.visit('/')
    cy.url().should('include', '/')
    cy.get('button[aria-label="Home"]').should('be.visible')
    clickOnButton(/Dropdown Menu/iu)
    clickOnButton(/Log Out/iu)
    cy.findAllByText(/You have been logged out/iu).should('exist')
    cy.get('a[href="/join"]').should('be.visible')
  })

  it('check join on existing account', () => {
    const email = generateEmailFromExistingUsername('artist_verified')

    join(email)

    cy.url().should('include', '/')
  })

  it('revoke token in lobby', () => {
    /**
     * Get to the lobby step
     */
    const [, email] = generateUsernameAndEmail()
    cy.visit('/join')
    typeIntoPlaceholder(/Enter an email/iu, email)
    clickOnButton(/Next/iu)
    cy.findByText(/Check your email for a/iu).should('be.visible')

    // refresh should restore state
    cy.reload()
    cy.findByText(/Check your email for a/iu).should('be.visible')

    /**
     * Cancel join in lobby and check state
     */
    cy.findByText(email).should('be.visible')
    cy.get('button[aria-label="Cancel"]').should('be.visible').should('not.be.disabled').click({ force: true })
    cy.waitUntil(() => cy.findByText(/Confirm Join Cancellation/iu).should('be.visible'))
    clickOnButton(/Yes, cancel/iu)
    clickOnButton(/Next/iu)
    typeIntoPlaceholder(/Enter an email/iu, email)
    clickOnButton(/Next/iu)
    cy.findByText(/Check your email for a/iu).should('be.visible')
  })

  it('revoke token in multi factor', () => {
    /**
     * Setup account
     */
    const [username, email] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    cy.enableTwoFactor()
    logout()

    /**
     * Login with account and cancel join in multi-factor page
     */
    join(email)
    cy.findByText(/Enter the 6-digit code/iu).should('be.visible')
    cy.get('button[aria-label="Cancel"]').should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText(/Confirm Join Cancellation/iu).should('be.visible')
    clickOnButton(/Yes, cancel/iu)
    cy.findByRole('button', { name: /Next/iu }).should('not.be.disabled')
  })

  // it('invalid token page', () => {
  //   cy.visit('/verify-token')
  //   cy.findByText(/This link is either invalid or/iu).should('be.visible')
  //   clickOnButton('Back')
  //   cy.findByRole('button', { name: /Next/iu }).should('not.be.disabled')
  // })
})
