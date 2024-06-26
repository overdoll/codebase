export const searchForTerm = (placeholder: string | RegExp, search: string): void => {
  cy.findByPlaceholderText(placeholder).should('be.visible').clear().type(search, { force: true })
  cy.waitUntil(() => cy.get('button[aria-label="Clear Search"]').should('be.visible'))
}

export const clickOnTile = (text: string | RegExp): void => {
  cy.findByText(text).should('not.be.disabled').click({ force: true })
}

export const clickOnButton = (text: string | RegExp): void => {
  cy.findByRole('button', { name: text }).should('be.visible').should('not.be.disabled').click({ force: true })
}

export const clickOnAriaLabelButton = (text: string): void => {
  cy.get(`button[aria-label="${text}"]`).should('be.visible').should('not.be.disabled').click({ force: true })
}

export const clickOnToggle = (placeholder: string | RegExp, expect: boolean): void => {
  const expectValue = expect ? 'be.checked' : 'not.be.checked'
  cy.findByText(placeholder).should('be.visible').parent().get('[type="checkbox"]').check({ force: true }).should(expectValue)
}

export const clickOnTab = (text: string | RegExp): void => {
  cy.findByRole('tab', { name: text }).should('not.be.disabled').click({ force: true })
}

export const typeIntoPlaceholder = (placeholder: string | RegExp, type: string): void => {
  cy.findByPlaceholderText(placeholder).should('be.visible').should('not.be.disabled').type(type, { force: true })
}

export const clickOnPanel = (text: string | RegExp): void => {
  cy.findByText(text).should('be.visible').click({ force: true })
}
