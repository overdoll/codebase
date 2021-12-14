import ChanceJS from 'chance'

const chance = new ChanceJS()

Cypress.Commands.add('joinWithExistingAccount', (name: string) => {
  const email = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${name}@inbox.testmail.app`
  startJoin(email)
  cy.url().should('include', '/profile')
})

Cypress.Commands.add('joinWithNewAccount', (name: string) => {
  const email = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${name}@inbox.testmail.app`
  startJoin(email)
  finishWithNewAccount(name)
})

Cypress.Commands.add('joinWithRandomAccount', (prefix: string = '') => {
  const name = `${prefix}${
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })
  }`

  const email = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${name}@inbox.testmail.app`
  startJoin(email)
  finishWithNewAccount(name)
})

Cypress.Commands.add('preserveAccount', () => {
  Cypress.Cookies.preserveOnce('od.session')
})

const finishWithNewAccount = (username: string): void => {
  cy.waitUntil(() => cy.findByRole('button', { name: /Register/iu }).should('not.be.disabled'))

  cy.findByRole('textbox', { name: /username/iu })
    .type(username)

  cy.findByRole('button', { name: /Register/iu })
    .click()

  cy.url().should('include', '/profile')
}

const startJoin = (email: string): void => {
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

  cy.url().should('include', '/verify-token')

  cy.waitUntil(() => cy.findByRole('button', { name: /I closed the original tab/iu }).should('not.be.disabled'))

  cy.findByRole('button', { name: /I closed the original tab/iu })
    .click()
}
