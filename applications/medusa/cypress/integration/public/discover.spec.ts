import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 20000)

// TODO unskip once the a/b test is done

describe('Discover', () => {
  it.skip('go to the discover page as logged out', () => {
    cy.viewport('iphone-xr')
    cy.visit('/discover')

    // click on a club and see club page
    cy.findByText('Second Test Club').parent().should('be.visible').click({ force: true })
    clickOnButton('Join')
    cy.findByText('Join this club').should('be.visible')

    // join from discover page
    cy.visit('/discover')
    cy.findAllByRole('button', { name: 'Join' }).first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText('Join this club').should('be.visible')
  })

  it.skip('join club from discover page as logged in', () => {
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.viewport('iphone-xr')
    cy.visit('/discover')

    cy.findAllByRole('button', { name: 'Join' }).first().should('be.visible').should('not.be.disabled').click({ force: true }).should('not.exist')
    cy.findByText(/You are now a member of/iu).should('be.visible')
  })
})
