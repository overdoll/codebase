import { typeIntoPlaceholder } from './user_actions'

export const logout = (): void => {
  cy.visit('/logout')

  cy.waitUntil(() => cy.findAllByText(/You have been logged out/iu).should('exist'))
}

export const join = (email: string): void => {
  cy.visit('/join')

  let startTimestamp

  // wait until button isn't disabled (it's ready to be interacted with)
  // TODO fix flakiness with timestamp - the subtraction is a temp solution
  cy.waitUntil(() => cy.findByRole('button', { name: /Next/iu }).should('not.be.disabled')).then(() => {
    startTimestamp = Date.now() - 500
  })

  typeIntoPlaceholder(/Enter an email/iu, email)

  cy.findByRole('button', { name: /Next/iu }).should('not.be.disabled')
    .click()

  cy.findByText(/Check your email for a/iu).should('be.visible')

  cy.contains(email).then(() => {
    cy.displayLastEmail(startTimestamp, 'Join Email', email)
  })

  cy.get('.auth-code').invoke('text').then(text => {
    cy.visit('/join')
    typeIntoPlaceholder(/Enter 6-digit code/iu, text)
    cy.findByText(/Check your email for a/iu).should('not.exist')
  })
}
