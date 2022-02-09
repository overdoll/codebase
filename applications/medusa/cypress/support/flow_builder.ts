export const gotoNextStep = (): void => {
  cy.waitUntil(() => cy.findByRole('button', { name: 'Next' }).should('not.be.disabled'))
  cy.findByRole('button', { name: 'Next' }).click()
}

export const gotoPreviousStep = (): void => {
  cy.waitUntil(() => cy.findByRole('button', { name: 'Back' }).should('not.be.disabled'))
  cy.findByRole('button', { name: 'Back' }).click()
}

export const skipCurrentStep = (): void => {
  cy.waitUntil(() => cy.findByRole('button', { name: 'Skip' }).should('exist').should('not.be.disabled'))
  cy.findByRole('button', { name: 'Skip' }).click()
}

export const saveCurrentStep = (): void => {
  cy.waitUntil(() => cy.findByRole('button', { name: 'Save' }).should('not.be.disabled'))
  cy.findByRole('button', { name: 'Save' }).click()
}
