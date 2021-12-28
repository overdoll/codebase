import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Settings - Change Username', () => {
  const currentUsername =
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

  const takenUsername =
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

  before(() => {
    cy.cleanup()
    cy.joinWithNewAccount(takenUsername)
    cy.cleanup()
    cy.joinWithNewAccount(currentUsername)
  })

  beforeEach(() => {
    cy.preserveAccount()
  })

  it('should be able to change username', () => {
    cy.visit('/settings/profile')
    cy.waitUntil(() => cy.findByRole('button', { name: /Change Username/iu }).should('not.be.disabled'))

    cy.findByRole('button', { name: /Change Username/iu }).click()

    const newUsername = chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

    cy.get('form').findByPlaceholderText('Enter a new username').should('be.visible').type(newUsername)

    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()

    cy.findByRole('button', { name: /Yes, change/iu }).should('not.be.disabled').click()
    cy.findByText(newUsername).should('exist')
  })

  it('should not be able to change to a taken username', () => {
    cy.visit('/settings/profile')
    cy.waitUntil(() => cy.findByRole('button', { name: /Change Username/iu }).should('not.be.disabled'))

    cy.findByRole('button', { name: /Change Username/iu }).click()

    cy.get('form').findByPlaceholderText('Enter a new username').should('be.visible').type(takenUsername)

    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByRole('button', { name: /Yes, change/iu }).should('not.be.disabled').click()

    cy.findByText(/USERNAME_TAKEN/iu).should('exist')
  })
})
