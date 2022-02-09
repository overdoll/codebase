import { generateEmailFromExistingUsername, generateUsernameAndEmail } from '../../support/generate'
import { join } from '../../support/join_actions'

describe('Join', () => {
  it('check join on existing account', () => {
    const email = generateEmailFromExistingUsername('artist_verified')

    join(email)

    cy.url().should('include', '/')

    cy.findByText(/Welcome back!/iu).should('exist')
  })

  it('check join on new random account', () => {
    const [username, email] = generateUsernameAndEmail()

    join(email)

    cy.waitUntil(() => cy.findByRole('button', { name: /Register/iu }).should('not.be.disabled'))

    cy.findByRole('textbox', { name: /username/iu })
      .type(username)

    cy.findByRole('button', { name: /Register/iu })
      .click()

    cy.url().should('include', '/')

    cy.findByText(/Welcome to overdoll!/iu).should('exist')
  })

  it('can cancel join flow', () => {
    const [, email] = generateUsernameAndEmail()

    cy.visit('/join')

    cy.findByRole('textbox', { name: /email/iu })
      .type(email)

    cy.waitUntil(() => cy.findByRole('button', { name: /Continue/iu }).should('not.be.disabled')).click()

    cy.waitUntil(() => cy.findByRole('button', { name: /Cancel/iu }).should('not.be.disabled')).click()

    cy.findByRole('button', { name: /Yes, cancel/iu }).should('not.be.disabled').click()

    cy.findByRole('button', { name: /Continue/iu }).should('exist')
  })
})
