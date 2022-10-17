import { clickOnButton, typeIntoPlaceholder } from '../../support/user_actions'
import { generateUsernameAndEmail } from '../../support/generate'

Cypress.config('defaultCommandTimeout', 20000)

describe('Creators', () => {
  it('go to the creators page as not logged in', () => {
    const [username, email] = generateUsernameAndEmail()
    cy.visit('/creators')
    cy.findAllByText(/The next platform for/iu)
    cy.findAllByText('Start using overdoll').first().should('be.visible').should('not.be.disabled').click({ force: true })
    typeIntoPlaceholder(/xXx_/iu, username)
    typeIntoPlaceholder(/starcraft/iu, email)
    typeIntoPlaceholder(/twitter.com/iu, 'https://overdoll.com')
    clickOnButton('Submit')
    cy.findAllByText('Request submitted!').first().should('be.visible')
  })
})
