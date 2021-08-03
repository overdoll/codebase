describe('Register', () => {
  const id = Cypress._.random(0, 1e6)

  it('should be able to register', () => {
    const email = id + '@test.com'

    cy.login(email)

    cy.waitUntil(() => cy.findByRole('button', { name: /Register/iu }).should('not.be.disabled'))

    cy.get('form')
      .findByRole('textbox', { name: /username/iu })
      .type(id)

    cy.get('form')
      .findByRole('button', { name: /Register/iu })
      .click()

    cy.url().should('include', '/profile')
  })
})
