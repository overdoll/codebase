import { clickOnButton, clickOnTile, searchForTerm } from '../../support/user_actions'

describe('Use Search', () => {
  // const character = 'Orion Strong'
  const series = 'Foreigner On Mars'
  const category = 'Assure'

  it('home page search', () => {
    cy.visit('/')
    cy.get('button[aria-label="Open Search"]').should('not.be.disabled')

    cy.get('button[aria-label="Open Search"]').click({ force: true })
    cy.findByPlaceholderText(/Search for characters/).should('be.visible')

    // test closing
    clickOnButton('Close')
    cy.findByPlaceholderText(/Search for characters/).should('not.exist')

    // check history disclosure
    cy.visit('/search')
    cy.visit('/')
    cy.get('button[aria-label="Open Search"]').click({ force: true })
    cy.go('back')
    cy.findByPlaceholderText(/Search for characters/).should('not.exist')
    cy.url().should('not.include', 'search')

    // test adding all types of tags
    cy.get('button[aria-label="Open Search"]').click({ force: true })
    searchForTerm(/Search for characters/, category)
    clickOnTile(category)
    cy.get('button[aria-label="close"]').should('not.be.disabled').click()
    cy.get('button[aria-label="close"]').should('not.exist')
    clickOnTile(category)
    cy.findByPlaceholderText(/Search for characters/).clear()

    // TODO add character search when its fixed

    searchForTerm(/Search for characters/, series)
    clickOnTile(series)
    cy.findByPlaceholderText(/Search for characters/).clear()

    cy.findByPlaceholderText(/Search for characters/).clear()
    searchForTerm(/Search for characters/, 'ThisWillFindNothing123454321')
    cy.findByText(/No categories, characters/iu).should('be.visible')

    cy.findByRole('button', { name: 'Save' }).should('not.be.disabled').click({ force: true })

    cy.url().should('include', '/search')
    clickOnButton('Fresh')
    cy.url().should('include', 'sort=NEW')
    clickOnButton('Best')
    cy.url().should('include', 'sort=TOP')

    cy.get('button[aria-label="Open Search"]').click({ force: true })
    // TODO add the same check for characters when its added as a query type
    cy.findAllByText(category).should('be.visible')
    cy.findAllByText(series).should('be.visible')
  })

  it('club page search', () => {
    cy.visit('/TestClub/posts?sort=NEW')
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').click()
    cy.url().should('include', 'supporter=FULL')
    cy.url().should('include', 'supporter=PARTIAL')
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').click()
    cy.url().should('not.contain', 'supporter=')
  })
})
