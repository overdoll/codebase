import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Settings - Change Username', () => {
  const currentUsername =
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

  beforeEach(() => {
    cy.joinWithNewAccount(currentUsername)
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
    cy.waitUntil(() => cy.findAllByText(new RegExp(newUsername, 'iu')).should('exist'))
  })
})
