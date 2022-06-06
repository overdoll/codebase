import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnPanel } from '../../support/user_actions'

describe('Sessions Settings', () => {
  it('can see current session', () => {
    /**
     * See current session
     */
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    cy.visit('/settings/security')
    clickOnPanel('Account Sessions')
    cy.url().should('include', '/settings/security/sessions')
    cy.findByText(/Here is a list of devices/).should('exist')
    cy.findByText(/Current Session/).should('exist')

    /**
     * Logout, see new session, and revoke it
     // TODO cannot test this unless we find a way to mimic IP within the same test
     logout()
     join(email)
     cy.findByText('Home').should('be.visible')
     cy.visit('/settings/security/sessions')
     cy.findByText(/Here is a list of devices/).should('exist')
     cy.findByText(/Last Accessed/iu).should('exist').click()
     clickOnButton(/Revoke Session/iu)
     cy.findByText(/Last Accessed/iu).should('not.exist')
     */
  })
})
