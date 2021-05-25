describe('Register', () => {
  const id = Cypress._.random(0, 1e6)

  beforeEach(() => {
    cy.visit('/join')

    const email = id + '@test.com'

    cy.get('form')
      .findByRole('textbox', { name: /email/i })
      .type(email)

    cy.get('form')
      .findByRole('button', { name: /Continue/i })
      .click()

    cy.getCookie('otp-key').then(cookie => {
      // in debug mode, our cookies won't be encrypted so we can just read it directly from the browser
      // in production, the user would have to check their email in order to get the right token
      cy.visit('/token/' + cookie.value)
    })
  })

  it('should be able to register', () => {
    cy.get('form')
      .findByRole('textbox', { name: /username/i })
      .type(id)

    cy.get('form')
      .findByRole('button', { name: /Register/i })
      .click()

    cy.url().should('include', '/profile')
  })
})
