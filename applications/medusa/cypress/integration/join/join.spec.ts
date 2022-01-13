import { generateEmailFromExistingUsername, generateUsernameAndEmail } from '../../support/generate'
import { join } from '../../support/join_actions'

describe('Join', () => {
  it('check join on existing account', () => {
    const email = generateEmailFromExistingUsername('artist_verified')

    join(email)

    cy.url().should('include', '/profile')
  })

  it('check join on new random account', () => {
    const [username, email] = generateUsernameAndEmail()

    join(email)

    cy.waitUntil(() => cy.findByRole('button', { name: /Register/iu }).should('not.be.disabled'))

    cy.findByRole('textbox', { name: /username/iu })
      .type(username)

    cy.findByRole('button', { name: /Register/iu })
      .click()

    cy.url().should('include', '/profile')
  })
})
