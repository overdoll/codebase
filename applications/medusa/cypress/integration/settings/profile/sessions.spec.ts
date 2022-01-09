import { generateUsernameAndEmail } from '../../../support/generate'
import { logout } from '../../../support/join_actions'

describe('Settings - Add Email', () => {
  const [username, email] = generateUsernameAndEmail()

  beforeEach(() => {
    cy.joinWithNewAccount(username, email)
  })

  it('can see current session', () => {
    cy.visit('/settings/security')
    cy.findByText(/Sessions/).should('exist')
    cy.findByText(/Current Session/).should('exist')
  })

  it('can see a new session and revoke it', () => {
    cy.visit('/')
    cy.clearCookies()

    cy.joinWithExistingAccount(username)
    cy.visit('/settings/security')
    cy.findByText(/Sessions/).should('exist')
    cy.findByText(/Last Accessed/iu).should('exist').click()
    cy.findByRole('button', { name: /Revoke Session/iu }).should('not.be.disabled').click()
    cy.findByText(/Last Accessed/iu).should('not.exist')
  })
})
