import { generateUsernameAndEmail } from '../../support/generate'
import { gotoNextStep, gotoPreviousStep, saveCurrentStep } from '../../support/flow_builder'
import { searchForTerm } from '../../support/user_actions'
import { createClubWithName } from '../../support/artist_actions'
import ChanceJS from 'chance'
import { arrowDown, space } from '../../support/key_codes'

const chance = new ChanceJS()

describe('Club - Create a Post', () => {
  const [username, email] = generateUsernameAndEmail()

  const clubName = chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })

  const postAudience = 'Standard Audience'
  const postCategories = ['Alter', 'Assure', 'Transmit']
  const postCharacter = 'Haider Woodley'

  const nextStepIsDisabled = (): void => {
    cy.findByRole('button', { name: /Next/iu }).should('be.disabled')
  }

  const isOnStep = (step: string): void => {
    switch (step) {
      case 'arrange':
        cy.findByText(/Arrange Uploads/iu).should('exist')
        break
      case 'audience':
        cy.findByText(/Select Audience/iu).should('exist')
        break
      case 'category':
        cy.findByText(/Add Categories/iu).should('exist')
        break
      case 'character':
        cy.findByText(/Add Character/iu).should('exist')
        break
      case 'review':
        cy.findByText(/Review Post/iu).should('exist')
        break
      default:
        break
    }
  }

  const gotoClubCreatePost = (): void => {
    cy.visit(`/club/${clubName}/create-post`)
    cy.findByText(/Upload Files/).should('exist')
  }

  beforeEach(() => {
    cy.joinWithNewAccount(username, email)
  })

  it('can create club and go to post upload page', () => {
    createClubWithName(clubName)
  })

  it('can add audience, categories, characters, and go to review step', () => {
    gotoClubCreatePost()
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile(['test-post.png', 'test-post.png'])
    gotoNextStep()

    // adding and removing audiences
    isOnStep('audience')
    nextStepIsDisabled()
    cy.findByText(postAudience).click()
    cy.findByText('Non-Standard Audience').click()
    cy.findByText(postAudience).click()
    saveCurrentStep()

    // adding and removing categories
    isOnStep('category')
    nextStepIsDisabled()
    searchForTerm('Search for a category', postCategories[0])
    cy.findByText(postCategories[0]).click()
    // test removing category by the label
    cy.get('button[aria-label="close"]').should('not.be.disabled').click()
    cy.get('button[aria-label="close"]').should('not.exist')
    cy.findByText(postCategories[0]).click()
    // test removing category by selecting it again
    cy.findByRole('button', { name: postCategories[0] }).click()
    cy.get('button[aria-label="close"]').should('not.exist')
    cy.findByText(postCategories[0]).click()
    // add second category
    searchForTerm('Search for a category', postCategories[1])
    cy.findByText(postCategories[1]).click()
    // test button is still disabled if there are two categories
    nextStepIsDisabled()
    // add third category
    searchForTerm('Search for a category', postCategories[2])
    cy.findByText(postCategories[2]).click()
    // button is enabled after 3 categories added
    saveCurrentStep()

    // adding character
    isOnStep('character')
    nextStepIsDisabled()
    searchForTerm('Search for a character by name', postCharacter)
    cy.findByText(postCharacter).click()
    saveCurrentStep()
    isOnStep('review')

    // test refresh to save progress as well as URL working for resuming progress and post page for drafts
    cy.reload()
    cy.visit(`/club/${clubName}/posts?state=DRAFT`)
    cy.findByText('2').should('exist').click()
    isOnStep('arrange')
    gotoNextStep()
    isOnStep('audience')
    cy.findAllByText(postAudience).should('exist')
    gotoNextStep()
    isOnStep('category')
    cy.findAllByText(postCategories[0]).should('exist')
    cy.findAllByText(postCategories[1]).should('exist')
    cy.findAllByText(postCategories[2]).should('exist')
    gotoNextStep()
    isOnStep('character')
    cy.findAllByText(postCharacter).should('exist')
    gotoNextStep()
    isOnStep('review')
    cy.findByText(postCategories[0]).should('exist')
    cy.findByText(postCategories[1]).should('exist')
    cy.findByText(postCategories[2]).should('exist')
    cy.findByText(postCharacter).should('exist')

    // test post submission
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText(/Submitted for review/iu).should('exist')
    cy.findByRole('button', { name: /Post again/iu }).click()
    cy.findByText(/Upload Files/iu).should('exist')

    // test that post is in review and can be accessed from the posts page
    cy.visit(`/club/${clubName}/posts?state=REVIEW`)
    cy.findByText(/No posts found/iu).should('not.exist')
  })

  it('can drag and drop video, add extra file, rearrange, remove one file, exit flow', () => {
    gotoClubCreatePost()
    // drag and drop file to upload it

    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-video.mp4', { subjectType: 'drag-n-drop' })

    // use the upload files button to upload
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.waitUntil(() => cy.get('button[aria-label="Remove Upload"]').should('be.visible'))

    // test dragging and dropping to rearrange uploads
    // note that this is how react-beautiful-dnd tests the dragging and dropping behaviour
    // so I guess this is how we're doing it too
    cy.get('[data-rbd-draggable-context-id="0"]')
      .first()
      .focus()
      .trigger('keydown', {
        keyCode: space
      })
      .trigger('keydown', {
        keyCode: arrowDown,
        force: true
      })
      .trigger('keydown', {
        keyCode: space,
        force: true
      })
    saveCurrentStep()
    gotoPreviousStep()

    // can remove uploads
    cy.get('button[aria-label="Remove Upload"]').first().click()
    cy.get('button[aria-label="Remove Upload"]').should('not.exist')

    // can exit the flow
    cy.findByText(/Arrange Uploads/iu).parent().get('button[aria-label="Exit Creator"]').click()
    cy.waitUntil(() => cy.findByRole('button', { name: /Yes, exit/iu }).should('be.visible'))
    cy.findByRole('button', { name: /Yes, exit/iu }).click()
    cy.findByText(/Upload Files/iu).should('be.visible')
  })
})
