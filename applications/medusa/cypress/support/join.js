Cypress.Commands.add('join', (email) => {
  cy.visit('/join')

  // wait until button isn't disabled (it's ready to be interacted with)
  cy.waitUntil(() => cy.findByRole('button', { name: /Continue/iu }).should('not.be.disabled'))

  cy.findByRole('textbox', { name: /email/iu })
    .type(email)

  cy.findByRole('button', { name: /Continue/iu })
    .click()

  cy.contains(email)

  cy.displayLastEmail('Join Email', email)

  // we dont want to "click" on the link or else the test will break, so we just visit it
  cy.findByText('authenticate').then(ln => {
    const url = ln.prop('href')
    cy.visit(url)
  })

  cy.url().should('include', '/token')
})

Cypress.Commands.add('existingAccount', () => {
  cy.waitUntil(() => cy.findByRole('button', { name: /I closed the original tab/iu }).should('not.be.disabled'))

  cy.findByRole('button', { name: /I closed the original tab/iu })
    .click()

  cy.url().should('include', '/profile')

  cy.url().should('include', '/profile')
})

Cypress.Commands.add('newAccount', (id) => {
  cy.waitUntil(() => cy.findByRole('button', { name: /Register/iu }).should('not.be.disabled'))

  cy.get('form')
    .findByRole('textbox', { name: /username/iu })
    .type(id)

  cy.get('form')
    .findByRole('button', { name: /Register/iu })
    .click()

  cy.url().should('include', '/profile')
})

Cypress.Commands.add('preserveAuth', (email) => {
  Cypress.Cookies.preserveOnce('connect.sid')
})
