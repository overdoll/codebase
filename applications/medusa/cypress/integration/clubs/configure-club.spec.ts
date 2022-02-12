import { generateUsernameAndEmail } from '../../support/generate'
import ChanceJS from 'chance'
import { createClubWithName } from '../../support/artist_actions'

const chance = new ChanceJS()

Cypress.config('defaultCommandTimeout', 10000)
//
describe('Club - Configure', () => {
  const [username, email] = generateUsernameAndEmail()

  const clubName = chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })

  const newClubName = chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })

  before(() => {
    cy.joinWithNewAccount(username, email)
    createClubWithName(clubName)
  })

  beforeEach(() => {
    cy.joinWithNewAccount(username, email)
  })

  it('visit club settings and change them', () => {
    cy.visit(`/club/${clubName}/settings`)

    // change club name
    cy.waitUntil(() => cy.findByRole('button', { name: /Change Club Name/iu }).should('not.be.disabled').click())
    cy.findByPlaceholderText(/Enter a new club name/).should('be.visible').type(newClubName)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText(/updated your club name/iu).should('be.visible')
    cy.findByRole('button', { name: /Change Club Name/iu }).click()

    // add club link and change to it
    cy.waitUntil(() => cy.findByRole('button', { name: /Add Club Link Alias/iu }).should('not.be.disabled').click())
    cy.findByPlaceholderText(/Enter a new club link/).should('be.visible').type(newClubName)
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    // change to new club link and remove old
    cy.get('button[aria-label="Open Menu"]').click()
    cy.findByText(/Set Default/iu).should('be.visible').click()
    cy.get('button[aria-label="Open Menu"]').click()
    cy.findByText(/Remove Alias/iu).should('be.visible').click()
    cy.findByText(/clubName/iu).should('not.exist')

    // add new logo
    cy.waitUntil(() => cy.findByRole('button', { name: /Change Club Thumbnail/iu }).should('not.be.disabled').click({ force: true }))
    cy.findByText(/Drag and drop or/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.findByText(/updated your club thumbnail/iu).should('be.visible')
  })

  it('visit club home page', () => {
    cy.visit(`/club/${newClubName}/home`)
    cy.findAllByText(/Members/iu).should('exist')
  })

  it('visit club posts page', () => {
    cy.visit(`/club/${newClubName}/posts`)
    cy.findByText(/Club Posts/iu).should('exist')
    cy.findByText(/No posts found/iu).should('exist')
  })

  it('visit club members page', () => {
    cy.visit(`/club/${newClubName}/members`)
    cy.findByText('Club Members').should('exist')
    cy.findByText(/No members found/iu).should('exist')
  })

  it('visit club public page', () => {
    cy.visit(`/${newClubName}`)
    cy.findByText(newClubName).should('exist')
    cy.findByRole('button', { name: /Join/iu }).should('not.be.disabled').click()
    cy.findByText(/You are now a member of/iu).should('be.visible')
    cy.findByRole('button', { name: /Leave/iu }).should('not.be.disabled').click()
    cy.findByRole('button', { name: /Join/iu }).should('exist')
  })
})
