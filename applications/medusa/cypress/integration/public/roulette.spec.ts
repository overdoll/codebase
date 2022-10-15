import { clickOnAriaLabelButton } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 30000)

describe('Roulette', () => {
  it('go to the home page', () => {
    cy.viewport('iphone-xr')
    cy.visit('/')
    cy.findByText('ROULETTE').should('be.visible').should('not.be.disabled').click({ force: true })
    cy.findByText(/Tap on the green button/iu).should('be.visible')
    clickOnAriaLabelButton('Spin Roulette')
    cy.url().should('include', 'gameSessionId')
    cy.get('[data-test-id="roulette-post"]').should('be.visible')
    clickOnAriaLabelButton('Spin Roulette')
  })
})
