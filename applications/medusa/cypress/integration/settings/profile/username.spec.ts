import ChanceJS from 'chance'
import { generateUsernameAndEmail } from '../../../support/generate'

const chance = new ChanceJS()

describe('Settings - Change Username', () => {
  const [username] = generateUsernameAndEmail()

  beforeEach(() => {
    cy.joinWithNewAccount(username)
  })

  it('should be able to change username', () => {
    cy.visit('/settings/profile')
    cy.findByText('Manage Username').should('be.visible').click()
    cy.url().should('include', '/settings/profile/username')

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

    // log out
    cy.visit('/')

    cy.url().should('include', '/')

    cy.waitUntil(() => cy.get('button[aria-label="Home"]').should('be.visible'))

    cy.waitUntil(() => cy.findByRole('button', { name: /Dropdown Menu/iu }).should('not.be.disabled'))

    cy.findByRole('button', { name: /Dropdown Menu/iu })
      .click()

    cy.waitUntil(() => cy.findByRole('button', { name: /Log Out/iu }).should('exist'))

    cy.findByRole('button', { name: /Log Out/iu })
      .click()

    cy.waitUntil(() => cy.findAllByText(/You have been logged out/iu).should('exist'))
  })

  it('go to the invite only page as logged in', () => {
    cy.visit('/clubs/invite-only')
    cy.findByText(/overdoll is invite-only/iu)
  })
})
