describe('Register', () => {
  const id = Cypress._.random(0, 1e6)

  it('should be able to register', () => {
    const email = id + '@test.com'

    cy.login(email)

    cy.register(email, id)
  })
})
