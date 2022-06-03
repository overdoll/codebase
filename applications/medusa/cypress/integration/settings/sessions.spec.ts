import { generateUsernameAndEmail } from '../../support/generate'
import { logout } from '../../support/join_actions'

describe('Sessions Settings', () => {
  it('can see current session', () => {
    /**
     * See current session
     */
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    cy.visit('/settings/security')
    cy.findByText('Account Sessions').should('be.visible').click()
    cy.url().should('include', '/settings/security/sessions')
    cy.findByText(/Here is a list of devices/).should('exist')
    cy.findByText(/Current Session/).should('exist')

    /**
     * Logout, see new session, and revoke it
     */
    logout()
    cy.clearCookies()
    cy.joinWithExistingAccount(username)
    cy.visit('/')

    cy.visit('/settings/security/sessions')
    cy.findByText(/Here is a list of devices/).should('exist')
    cy.findByText(/Last Accessed/iu).should('exist').click()
    cy.findByRole('button', { name: /Revoke Session/iu }).should('not.be.disabled').click()
    cy.findByText(/Last Accessed/iu).should('not.exist')
  })
})
