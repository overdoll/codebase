export const logout = (): void => {
  cy.waitUntil(() => cy.findByRole('button', { name: /Menu/iu }).should('not.be.disabled'))

  cy.findByRole('button', { name: /Menu/iu })
    .click()

  cy.findByRole('button', { name: /Log Out/iu })
    .click()

  cy.waitUntil(() => cy.findAllByText(/home/iu).should('exist'))
}

export const join = (email: string): void => {
  cy.visit('/join')

  let startTimestamp

  // wait until button isn't disabled (it's ready to be interacted with)
  cy.waitUntil(() => cy.findByRole('button', { name: /Continue/iu }).should('not.be.disabled')).then(() => {
    startTimestamp = Date.now()
  })

  cy.findByRole('textbox', { name: /email/iu })
    .type(email)

  cy.findByRole('button', { name: /Continue/iu })
    .click()

  cy.contains(email).then(() => {
    cy.displayLastEmail(startTimestamp, 'Join Email', email)
  })

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
