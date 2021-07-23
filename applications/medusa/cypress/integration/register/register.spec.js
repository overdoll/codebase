describe('Register', () => {
  const id = Cypress._.random(0, 1e6)

  beforeEach(() => {
    const email = id + '@test.com'

    cy.login(email, false)
  })

  it('should be able to register', () => {
    cy.getCookie('otp-key').then(cookie => {
      // in debug mode, our cookies won't be encrypted so we can just read it directly from the browser
      // in production, the user would have to check their email in order to get the right token
      cy.visit('/token/' + cookie.value)
    })

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
