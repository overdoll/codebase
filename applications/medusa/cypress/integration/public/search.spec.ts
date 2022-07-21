import { clickOnButton, typeIntoPlaceholder } from '../../support/user_actions'

const series1 = 'Pilots Of A Star'
const series2 = 'Heroes And Companions'
const category1 = 'Assure'
const category2 = 'Alter'
const character1 = 'Orion Strong'
const club = 'Second Test Club'

Cypress.config('defaultCommandTimeout', 20000)

const openSearch = (): void => {
  cy.get('button[aria-label="Open Search"]').should('be.visible').should('not.be.disabled').click({ force: true })
  cy.findByPlaceholderText(/Search for a club/).should('be.visible')
}

describe('Search', () => {
  it('search button', () => {
    cy.visit('/')
    openSearch()

    // test closing
    clickOnButton('Close')
    cy.findByPlaceholderText(/Search for a club/).should('not.exist')

    // test clicking on a character
    openSearch()
    typeIntoPlaceholder(/Search for a club/, character1)
    cy.findByText('Search Results').should('be.visible')
    cy.findAllByText(character1).should('not.be.disabled').first().click({ force: true })
    cy.findByText('Character').should('be.visible')
    cy.findByText(series1).should('not.be.disabled').click({ force: true })
    cy.findByText('Series').should('be.visible')

    // test clicking on a category
    cy.visit('/')
    openSearch()
    typeIntoPlaceholder(/Search for a club/, category1)
    cy.findByText('Search Results').should('be.visible')
    cy.findAllByText(category1).should('not.be.disabled').first().click({ force: true })
    cy.findByText('Category').should('be.visible')
    cy.findByText(category2).should('not.be.disabled').click({ force: true })
    cy.findByText('Category').should('be.visible')

    // test clicking on a series
    cy.visit('/')
    openSearch()
    typeIntoPlaceholder(/Search for a club/, series2)
    cy.findByText('Search Results').should('be.visible')
    cy.findAllByText(series2).should('not.be.disabled').first().click({ force: true })
    cy.findByText('Series').should('be.visible')

    // test search bar
    cy.visit('/')
    openSearch()
    typeIntoPlaceholder(/Search for a club/, 'Second Test Club')
    cy.findByText('Search Results').should('be.visible')
    cy.findAllByText(club).should('not.be.disabled').first().click({ force: true })
    cy.url().should('contain', '/SecondTestClub')

    // test search bar no results
    cy.visit('/')
    openSearch()
    typeIntoPlaceholder(/Search for a club/, '123123123123123123123')
    cy.findByText(/We couldn't find a club/).should('be.visible')
  })
})
