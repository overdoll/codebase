export const searchForTerm = (placeholder: string, search: string): void => {
  cy.findByPlaceholderText(placeholder).should('be.visible').clear().type(search)
  cy.waitUntil(() => cy.get('button[aria-label="Clear Search"]').should('be.visible'))
}
