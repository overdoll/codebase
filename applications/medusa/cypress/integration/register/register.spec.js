describe('Register', () => {
  const id = Cypress._.random(0, 1e6)

  beforeEach(() => {
    const email = id + '@test.com'

    cy.login(email)
  })

  it('should be able to register', () => {
    cy.get('form')
      .findByRole('textbox', { name: /username/iu })
      .type(id)

    cy.get('form')
      .findByRole('button', { name: /Register/iu })
      .click()

    cy.url().should('include', '/profile')
  })
})
