import { gotoNextStep } from './flow_builder'

export const searchForTerm = (placeholder: string, search: string): void => {
  cy.findByPlaceholderText(placeholder).should('be.visible').clear().type(search)
  cy.waitUntil(() => cy.get('button[aria-label="Clear Search"]').should('be.visible'))
}

export const clickOnTile = (text: string): void => {
  cy.findByText(text).should('not.be.disabled').click()
}

export const clickOnButton = (text: string | RegExp): void => {
  cy.waitUntil(() => cy.findByRole('button', { name: text }).should('not.be.disabled'))
  cy.findByRole('button', { name: text }).should('exist').click({ force: true })
}
