import { generateUsernameAndEmail } from '../../support/generate'

Cypress.config('defaultCommandTimeout', 20000)

describe('Discover', () => {
  it('go to the discover page as logged out', () => {
    cy.viewport('iphone-xr')
    cy.visit('/discover')

    // click on a club and see club page
    cy.findByText('Second Test Club').should('be.visible').click({ force: true })
    cy.findByText('Join Second Test Club').should('be.visible').click({ force: true })

    // join from discover page
    cy.visit('/discover')
    cy.findAllByRole('button', { name: 'Join' }).first().should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText('Join this club').should('be.visible')
  })

  it('join club from discover page as logged in', () => {
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.viewport('iphone-xr')
    cy.visit('/discover')

    cy.findAllByRole('button', { name: 'Join' }).first().should('be.visible').should('not.be.disabled').click({ force: true }).should('not.exist')
    cy.findByText(/You are now a member of/iu).should('be.visible')
  })
})
