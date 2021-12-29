import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Settings - Add Email', () => {
  const currentUsername =
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

  const newUsernameEmail =
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })
  const startTimestamp = Date.now()

  const currentEmail = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${currentUsername}@inbox.testmail.app`

  const newEmail = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${newUsernameEmail}@inbox.testmail.app`

  before(() => {
    cy.cleanup()
    cy.joinWithNewAccount(currentUsername)
  })

  beforeEach(() => {
    cy.preserveAccount()
  })

  it('should be able to add an email and confirm it', () => {
    cy.visit('/settings/profile')
    cy.waitUntil(() => cy.findByRole('button', { name: /Add Email/iu }).should('not.be.disabled'))

    cy.findByRole('button', { name: /Add Email/iu }).click()

    cy.findByPlaceholderText('Enter a new email address').should('be.visible').type(newEmail)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText('UNCONFIRMED').should('exist')
    cy.reload()
    cy.findByText('UNCONFIRMED').should('not.exist')
  })

  it('should be able to confirm new email through link', () => {
    cy.displayLastEmail(startTimestamp, 'Verify Email', newEmail)

    cy.findByText('verify new email').then(ln => {
      const url = ln.prop('href')
      cy.visit(url)
    })

    cy.url().should('include', '/confirm-email')
    cy.waitUntil(() => cy.url().should('include', '/settings/profile'))
    cy.findByText('CONFIRMED').should('exist')
  })

  it('should be able to make new email primary', () => {
    cy.findByText(newEmail).parent().parent().parent().get('[aria-label="Open Menu"]').click()
    cy.findByText(/Make Primary/iu).click()
    cy.findByText(newEmail).parent().parent().parent().findByText('PRIMARY').should('exist')
  })

  it('should be able to remove confirmed email', () => {
    cy.findByText(currentEmail).parent().parent().parent().get('[aria-label="Open Menu"]').click()
    cy.findByText(/Remove/iu).click()
    cy.findByText(currentEmail).should('not.exist')
    cy.findByText(newEmail).should('exist')
  })
})
