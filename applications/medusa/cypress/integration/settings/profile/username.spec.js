describe('Settings - Change Username', () => {
  const id = Cypress._.random(0, 1e6)
  const newUsername = `newUser${id}`
  const email = `${id}@test.com`

  beforeEach(() => {
    cy.login(email)
    cy.register(email, id)

    cy.visit('/settings/profile')
    cy.findByText(/Current Username/iu).should('exist')
    cy.waitUntil(() => cy.findByRole('button', { name: /Change Username/iu }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Change Username/iu }).click()
    cy.findByText(/Enter a new username/iu)
  })

  it('should be able to change username and cannot change to a taken username', () => {
    cy.get('form').findByRole('textbox', { placeholder: 'Enter a new username' }).should('be.visible').type(newUsername)

    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()

    cy.waitUntil(() => cy.findAllByText(newUsername).should('exist'))

    // Find all previous usernames and check if the change went through
    cy.findByText(/Previous Usernames/iu).click()

    cy.findByText(/Previous Usernames/iu).parent('div').parent('button').parent('div').within(() => {
      cy.findByText(id).should('exist')
      cy.findByText(newUsername).should('exist')
    })

    // Check if username is taken here
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()

    cy.findByText(/USERNAME_TAKEN/iu).should('exist')
  })
})
