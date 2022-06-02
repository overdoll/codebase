import { generateUsernameAndEmail } from '../../../support/generate'
import { gotoNextStep, gotoPreviousStep, saveCurrentStep, skipCurrentStep } from '../../../support/flow_builder'
import { clickOnTile, searchForTerm } from '../../../support/user_actions'

const preferenceAudience = 'Standard Audience'
const preferenceCategory = 'Alter'

const isOnStep = (step: string): void => {
  switch (step) {
    case 'age':
      cy.findByText('Your Age').should('exist')
      break
    case 'audience':
      cy.findByText('Select Audiences').should('exist')
      break
    case 'category':
      cy.findByText('Select Categories').should('exist')
      break
    default:
      break
  }
}

Cypress.config('defaultCommandTimeout', 10000)

describe('Curation Profile', () => {
  it('fill out the curation profile', () => {
    /**
     * Set up account
     */
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    cy.visit('/settings/preferences')

    /**
     * Go to curation profile
     */
    cy.waitUntil(() => cy.findByRole('button', { name: /Complete Curation Profile/iu }).should('not.be.disabled').click())
    cy.url().should('include', '/settings/preferences/curation-profile')

    /**
     * Fill out age section
     */
    isOnStep('age')
    skipCurrentStep()
    cy.findByText(/Age preference was skipped/iu).should('exist')
    gotoPreviousStep()
    cy.findByPlaceholderText('Your age').should('be.visible').type('19')
    cy.get('button[aria-label="Remove"]').should('not.be.disabled').click()
    cy.get('button[aria-label="Remove"]').should('be.disabled')
    cy.get('button[aria-label="Add"]').should('not.be.disabled').click()
    cy.findByPlaceholderText('Your age').should('have.value', '19')
    saveCurrentStep()

    /**
     * Fill out audience section
     */
    isOnStep('audience')
    skipCurrentStep()
    isOnStep('category')
    gotoPreviousStep()
    clickOnTile(preferenceAudience)
    saveCurrentStep()

    /**
     * Fill out category section
     */
    isOnStep('category')
    searchForTerm('Search for a category', preferenceCategory)
    clickOnTile(preferenceCategory)
    saveCurrentStep()
    cy.findByRole('button', { name: /Go home/iu }).should('exist')
    cy.visit('/settings/preferences')
    cy.waitUntil(() => cy.findByRole('button', { name: /Modify Curation Profile/iu }).should('not.be.disabled').click({ force: true }))
    isOnStep('age')
    gotoNextStep()
    isOnStep('audience')
    gotoNextStep()
    isOnStep('category')
    skipCurrentStep()
    cy.findByText(/Category preference was skipped/iu).should('exist')
  })
})
