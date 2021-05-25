describe('Register', () => {
  const id = Cypress._.random(0, 1e6)

  beforeEach(() => {
    cy.visit('/join')

    const email = id + '@test.com'

    cy.get('form')
      .findByRole('textbox', { name: /email/iu })
      .type(email)

    cy.get('form')
      .findByRole('button', { name: /Continue/iu })
      .click()

    cy.getCookie('otp-key').then(cookie => {
      // in debug mode, our cookies won't be encrypted so we can just read it directly from the browser
      // in production, the user would have to check their email in order to get the right token
      cy.visit('/token/' + cookie.value)
    })
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
