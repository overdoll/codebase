import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnPanel } from '../../support/user_actions'

describe('Username Settings', () => {
  it('should be able to change username', () => {
    /**
     * Change username
     */
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    cy.visit('/settings/profile')
    clickOnPanel('Manage Username')
    cy.url().should('include', '/settings/profile/username')
    clickOnButton(/Change Username/iu)
    const [newUsername] = generateUsernameAndEmail()
    cy.get('form').findByPlaceholderText('Enter a new username').should('be.visible').type(newUsername)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByRole('button', { name: /Yes, change/iu }).should('not.be.disabled').click()
    cy.waitUntil(() => cy.findAllByText(new RegExp(newUsername, 'iu')).should('exist'))
    cy.findByText(/You have recently made a username edit/iu).should('be.visible')
  })
})
