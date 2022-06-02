import { generateEmail, generateUsernameAndEmail } from '../../../support/generate'

describe('Email Settings', () => {
  it('should be able to add an email and confirm it, then make it primary and then remove it', () => {
    /**
     * Setup account
     */
    const startTimestamp = Date.now()
    const [username, currentEmail] = generateUsernameAndEmail()
    const newEmail = generateEmail()
    cy.joinWithNewAccount(username)
    cy.visit('/settings/profile')

    /**
     * Add unconfirmed email
     */
    cy.waitUntil(() => cy.findByRole('button', { name: /Manage Emails/iu }).should('not.be.disabled'))
    cy.findByText('Manage Emails').should('be.visible').click()
    cy.url().should('include', '/settings/profile/emails')
    cy.waitUntil(() => cy.findByRole('button', { name: /Add Email/iu }).should('not.be.disabled'), { timeout: 20000 })
    cy.findByRole('button', { name: /Add Email/iu }).click()
    cy.findByPlaceholderText('Enter a new email address').should('be.visible').type(newEmail)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText('UNCONFIRMED').should('exist')
    cy.reload()
    cy.findByText('UNCONFIRMED').should('not.exist')

    /**
     * Confirm unconfirmed email
     */
    cy.displayLastEmail(startTimestamp, 'Verify Email', newEmail)
    cy.findByText('Confirm Email').then(ln => {
      const url = ln.prop('href')
      cy.visit(url)
    })
    cy.url().should('include', '/confirm-email')
    cy.waitUntil(() => cy.url().should('include', '/settings/profile/emails'))
    cy.findByText('CONFIRMED').should('exist')

    /**
     * Make confirmed email primary
     */
    cy.findByText(newEmail).parent().parent().parent().get('[aria-label="Open Menu"]').click()
    cy.findByText(/Make Primary/iu).click()
    cy.findByText(newEmail).parent().parent().parent().findByText('PRIMARY').should('exist')

    /**
     * Remove old email
     */
    cy.findByText(currentEmail).parent().parent().parent().get('[aria-label="Open Menu"]').click()
    cy.findByText('Remove').should('be.visible').click()
    cy.findByText(currentEmail).should('not.exist')
    cy.findByText(newEmail).should('exist')
  })
})
