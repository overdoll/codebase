import { generateUsernameAndEmail } from '../../support/generate'
import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Club - Create a Post', () => {
  const [username, email] = generateUsernameAndEmail()

  const clubName = chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })

  const gotoClubCreatePost = (): void => {
    cy.visit(`/club/${clubName}/create-post`)
    cy.findByText(/Upload Files/).should('exist')
  }

  beforeEach(() => {
    cy.joinWithNewAccount(username, email)
  })

  it('can create club and go to post upload page', () => {
    cy.visit('/configure/create-club')
    cy.findByText(/Create a Club/iu).should('exist')
    cy.get('form').findByPlaceholderText(/The best name you can/iu).should('be.visible').type(clubName)
    cy.waitUntil(() => cy.findByRole('button', { name: /Create Club/iu }).should('not.be.disabled').click())
    cy.url().should('include', `/club/${clubName}/home`)
  })

  it('can drag and drop video, add extra file, rearrange, remove one file', () => {
    gotoClubCreatePost()
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-video.mp4', { subjectType: 'drag-n-drop' })
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.waitUntil(() => cy.get('button[aria-label="Remove Upload"]').should('be.visible'))
    cy.waitUntil(() => cy.get('[data-rbd-draggable-context-id="0"]')
      .first()
      .trigger('mouseover')
      .trigger('mousedown', {
        which: 1
      })
      .trigger('mousemove', {
        clientX: 10,
        pageY: 1000,
        clientY: 1000,
        screenY: 1000
      })
      .trigger('mouseup', { force: true }))
    cy.findByRole('button', { name: /Save/iu }).should('be.visible')
    cy.get('button[aria-label="Remove Upload"]').first().click()
    cy.get('button[aria-label="Remove Upload"]').should('not.exist')
  })

  it('can upload one image file and exit flow', () => {
    gotoClubCreatePost()
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.findByText(/Arrange Uploads/iu).parent().get('button[aria-label="Exit Creator"]').click()
    cy.findByRole('button', { name: /Yes, exit/iu }).click()
    cy.findByText(/Upload Files/iu).should('be.visible')
  })
})
