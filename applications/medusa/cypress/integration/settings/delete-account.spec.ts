import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnPanel, typeIntoPlaceholder } from '../../support/user_actions'

describe('Delete Account', () => {
  it('delete account', () => {
    /**
     * Setup account
     */
    const [username] = generateUsernameAndEmail()
    const deleteText = `delete ${username}`
    cy.joinWithNewAccount(username)
    cy.visit('/settings/profile')

    /**
     * Delete account
     */
    clickOnPanel('Delete Account')
    cy.url().should('include', '/settings/profile/delete-account')
    cy.findByText(/If you are no longer using/iu).should('be.visible')
    clickOnButton('Delete Account')
    typeIntoPlaceholder(deleteText, deleteText)
    clickOnButton('Confirm Delete Account')
    cy.findByText(/Your account has been successfully scheduled for deletion/iu).should('be.visible')

    /**
     * Cancel account deletion
     */
    cy.reload()
    cy.findByText(/You have requested to delete your account/iu).should('be.visible')
    clickOnButton('Cancel Account Deletion')
    cy.findByText(/You have cancelled the/iu).should('be.visible')
  })
})
