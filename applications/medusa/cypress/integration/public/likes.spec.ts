import { generateUsernameAndEmail } from '../../support/generate'

Cypress.config('defaultCommandTimeout', 20000)

describe('Likes', () => {
  it('go to the likes page as logged in', () => {
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.viewport('iphone-xr')
    cy.visit('/likes')
    cy.findByText('Your liked posts').should('exist')
  })
})
