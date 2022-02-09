export const createClubWithName = (name: string): void => {
  cy.visit('/configure/create-club')
  cy.findByText(/Create a Club/iu).should('exist')
  cy.get('form').findByPlaceholderText(/The best name you can/iu).should('be.visible').type(name)
  cy.waitUntil(() => cy.findByRole('button', { name: /Create Club/iu }).should('not.be.disabled').click())
  cy.url().should('include', `/club/${name}/home`)
}
