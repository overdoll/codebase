import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Settings - Change Username', () => {
  const currentUsername = 'poisonminion'

  before(() => {
    cy.joinWithExistingAccount('poisonminion')
  })

  beforeEach(() => {
    cy.preserveAccount()

    cy.visit('/settings/profile')
    cy.findByText(/Current Username/iu).should('exist')
    cy.waitUntil(() => cy.findByRole('button', { name: /Change Username/iu }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Change Username/iu })
      .click()
    cy.findByText(/Enter a new username/iu)
  })

  it('should be able to change username and cannot change to a taken username', () => {
    const newUsername = chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

    cy.get('form').findByPlaceholderText('Enter a new username').should('be.visible').type(newUsername)

    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()

    cy.waitUntil(() => cy.findAllByText(newUsername).should('exist'))

    // Find all previous usernames and check if the change went through
    cy.findByText(/Previous Usernames/iu).click()

    cy.findByText(/Previous Usernames/iu).parent('div').parent('button').parent('div').within(() => {
      cy.findByText(currentUsername).should('exist')
      cy.findByText(newUsername).should('exist')
    })

    cy.get('form').findByPlaceholderText('Enter a new username').should('be.visible').clear().type('0eclipse')

    // Check if username is taken here
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()

    cy.findByText(/USERNAME_TAKEN/iu).should('exist')
  })
})
