import { generateUsernameAndEmail } from '../../../support/generate'

describe('Settings - Add Email', () => {
  const [username] = generateUsernameAndEmail()

  beforeEach(() => {
    cy.joinWithNewAccount(username)
  })

  it('can see current session', () => {
    cy.visit('/settings/security')
    cy.findByText('Account Sessions').should('be.visible').click()
    cy.url().should('include', '/settings/security/sessions')

    cy.findByText(/Here is a list of devices/).should('exist')
    cy.findByText(/Current Session/).should('exist')
  })

  it('can see a new session and revoke it', () => {
    cy.visit('/')
    cy.clearCookies()

    cy.joinWithExistingAccount(username)
    cy.visit('/settings/security/sessions')
    cy.findByText(/Here is a list of devices/).should('exist')
    cy.findByText(/Last Accessed/iu).should('exist').click()
    cy.findByRole('button', { name: /Revoke Session/iu }).should('not.be.disabled').click()
    cy.findByText(/Last Accessed/iu).should('not.exist')
  })
})
