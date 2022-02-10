import { generateUsernameAndEmail } from '../../../support/generate'

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
        cy.waitUntil(() => cy.findByText(preferenceAudience).should('exist'))
        break
      case 'category':
        cy.findByText('Select Categories').should('exist')
        cy.waitUntil(() => cy.findByRole('button', { name: /Load More/iu }).should('exist'))
        break
      default:
        break
    }
  }
  // TODO this test is broken because the query for the curation profile is broken. should work after its fixed.
  /*

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
    isOnStep('category')
    gotoPreviousStep()
    cy.findByText(preferenceAudience).should('exist').click()
    saveCurrentStep()

    // fill out the categories section
    isOnStep('category')
    searchForTerm('Search for a category', preferenceCategory)
    cy.findByText(preferenceCategory).should('exist').click()
    saveCurrentStep()
    cy.findByRole('button', { name: /Go home/iu }).should('exist').click()
    cy.visit('/configure/curation-profile')
    gotoNextStep()
    isOnStep('audience')
    gotoNextStep()
    isOnStep('category')
    skipCurrentStep()
    cy.findByText(/Category preference was skipped/iu).should('exist')
  })

   */
})
