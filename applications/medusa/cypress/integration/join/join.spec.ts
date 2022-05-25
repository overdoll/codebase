import { generateEmailFromExistingUsername, generateUsernameAndEmail } from '../../support/generate'
import { join } from '../../support/join_actions'
import { clickOnButton } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 10000)

describe('Join', () => {
  it('check join on existing account', () => {
    const email = generateEmailFromExistingUsername('artist_verified')

    join(email)

    cy.url().should('include', '/')
  })

  it('check join on new random account', () => {
    const [username, email] = generateUsernameAndEmail()

    join(email)

    cy.waitUntil(() => cy.findByRole('button', { name: /Register/iu }).should('not.be.disabled'))

    cy.findByPlaceholderText(/Username/iu)
      .type(username)

    cy.findByRole('button', { name: /Register/iu })
      .click()

    cy.url().should('include', '/')

    cy.findByText(/Welcome to overdoll!/iu).should('exist')

    // log out
    cy.visit('/')

    cy.url().should('include', '/')

    cy.waitUntil(() => cy.get('button[aria-label="Home"]').should('be.visible'))

    cy.waitUntil(() => cy.findByRole('button', { name: /Dropdown Menu/iu }).should('not.be.disabled'))

    cy.findByRole('button', { name: /Dropdown Menu/iu })
      .click()

    cy.waitUntil(() => cy.findByRole('button', { name: /Log Out/iu }).should('exist'))

    cy.findByRole('button', { name: /Log Out/iu })
      .click()

    cy.waitUntil(() => cy.findAllByText(/You have been logged out/iu).should('exist'))
  })

  it('can cancel join flow and check fully cleared state', () => {
    const [, email] = generateUsernameAndEmail()

    cy.visit('/join')

    cy.findByPlaceholderText(/Enter an email/iu)
      .type(email)

    clickOnButton(/Continue/iu)

    cy.findByText(/Tap on the link/iu).should('be.visible')

    cy.findByText(/Waiting for you to/iu).should('be.visible')

    cy.get('button[aria-label="Close"]').should('be.visible').should('not.be.disabled').click({ force: true })

    cy.findByText(/Confirm Join Cancellation/iu).should('be.visible')

    clickOnButton(/Yes, cancel/iu)

    cy.waitUntil(() => cy.findByRole('button', { name: /Continue/iu }).should('exist'))

    cy.findByPlaceholderText(/Enter an email/iu)
      .type(email)

    clickOnButton(/Continue/iu)

    cy.findByText(/Tap on the link you received/iu).should('be.visible')
  })
})
