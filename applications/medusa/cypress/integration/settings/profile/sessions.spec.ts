import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Settings - Add Email', () => {
  const currentUsername =
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

  before(() => {
    cy.cleanup()
    cy.joinWithNewAccount(currentUsername)
  })

  beforeEach(() => {
    cy.preserveAccount()
  })

  it('can see current session', () => {
    cy.visit('/settings/security')
    cy.findByText(/Sessions/).should('exist')
    cy.findByText(/Current Session/).should('exist')
  })

  it('can see a new session and revoke it', () => {
    cy.cleanup()
    cy.joinWithExistingAccount(currentUsername)
    cy.visit('/settings/security')
    cy.findByText(/Sessions/).should('exist')
    cy.findByText(/Last Accessed/iu).should('exist').click()
    cy.findByRole('button', { name: /Revoke Session/iu }).should('not.be.disabled').click()
    cy.findByText(/Last Accessed/iu).should('not.exist')
  })
})
