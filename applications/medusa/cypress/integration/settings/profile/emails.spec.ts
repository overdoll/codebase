import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Settings - Add Email', () => {
  const startTimestamp = Date.now()

  const newEmail = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })}@inbox.testmail.app`

  const currentUsername =
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

  const currentEmail = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${currentUsername}@inbox.testmail.app`

  beforeEach(() => {
    cy.joinWithNewAccount(currentUsername)
  })

  it('should be able to add an email and confirm it, then make it primary and then remove it', () => {
    cy.visit('/settings/profile')
    cy.waitUntil(() => cy.findByRole('button', { name: /Add Email/iu }).should('not.be.disabled'))

    cy.findByRole('button', { name: /Add Email/iu }).click()

    cy.findByPlaceholderText('Enter a new email address').should('be.visible').type(newEmail)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText('UNCONFIRMED').should('exist')
    cy.reload()
    cy.findByText('UNCONFIRMED').should('not.exist')

    // confirm email
    cy.displayLastEmail(startTimestamp, 'Verify Email', newEmail)

    cy.findByText('verify new email').then(ln => {
      const url = ln.prop('href')
      cy.visit(url)
    })

    cy.url().should('include', '/confirm-email')
    cy.waitUntil(() => cy.url().should('include', '/settings/profile'))
    cy.findByText('CONFIRMED').should('exist')

    // make it primary
    cy.findByText(newEmail).parent().parent().parent().get('[aria-label="Open Menu"]').click()
    cy.findByText(/Make Primary/iu).click()
    cy.findByText(newEmail).parent().parent().parent().findByText('PRIMARY').should('exist')

    // remove old
    cy.findByText(currentEmail).parent().parent().parent().get('[aria-label="Open Menu"]').click()
    cy.findByText(/Remove/iu).click()
    cy.findByText(currentEmail).should('not.exist')
    cy.findByText(newEmail).should('exist')
  })
})
