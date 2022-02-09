import { generateUsernameAndEmail } from '../../../support/generate'
import { gotoPreviousStep, saveCurrentStep, skipCurrentStep } from '../../../support/flow_builder'
import { searchForTerm } from '../../../support/user_actions'

describe('Settings - Curation Profile', () => {
  const [username, email] = generateUsernameAndEmail()

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

  it('fill out the curation profile', () => {
    cy.joinWithNewAccount(username, email)
    cy.visit('/settings/preferences')
    cy.waitUntil(() => cy.findByRole('button', { name: /Complete Curation Profile/iu }).should('not.be.disabled').click())
    cy.url().should('include', '/configure/curation-profile')

    // fill out the age section
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

    // fill out the audience section
    isOnStep('audience')
    skipCurrentStep()
    cy.findByText(/Audience preference was skipped/iu).should('exist')
    gotoPreviousStep()
    cy.findByText(preferenceAudience).should('exist').click()
    saveCurrentStep()

    // fill out the categories section
    isOnStep('category')
    searchForTerm('Search for a category', preferenceCategory)
    cy.findByText(preferenceCategory).should('exist').click()
    saveCurrentStep()
    cy.findByRole('button', { name: /Go home/iu }).should('exist')
    cy.get('button[aria-label="Close"]').click()
    skipCurrentStep()
    cy.findByText(/Category preference was skipped/iu).should('exist')
  })
})
