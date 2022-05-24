import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { gotoNextStep, gotoPreviousStep, saveCurrentStep } from '../../support/flow_builder'
import { clickOnButton, clickOnTile, searchForTerm } from '../../support/user_actions'

Cypress.config('defaultCommandTimeout', 10000)

describe('Club - Create a Post', () => {
  const [username] = generateUsernameAndEmail()

  const clubName = generateClubName()

  const postAudience = 'Standard Audience'
  const postCategories = ['Alter', 'Assure', 'Transmit']
  const postCharacter = 'Haider Woodley'

  const nextStepIsDisabled = (): void => {
    cy.findByRole('button', { name: /Next/iu }).should('be.disabled')
  }

  const isOnStep = (step: string): void => {
    switch (step) {
      case 'arrange':
        cy.findByText('Arrange Uploads').should('exist')
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

  const waitForProcessing = (): void => {
    cy.findByText(/Processing Post Content/iu, { timeout: 30000 }).should('not.exist')
  }

  it('create account', () => {
    cy.joinWithNewAccount(username)
  })

  it('assign artist role', () => {
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
  })

  it('create club', () => {
    cy.joinWithNewAccount(username)
    cy.createClub(clubName)
  })

  beforeEach(() => {
    cy.joinWithNewAccount(username)
  })

  it('can add audience, categories, characters, and submit post', () => {
    gotoClubCreatePost()
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile(['test-post.png', 'test-post.png'])
    isOnStep('arrange')
    cy.findByText(/You'll need to upload at least/iu).should('not.exist')
    waitForProcessing()
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click()
    gotoNextStep()

    // adding and removing audiences
    isOnStep('audience')
    nextStepIsDisabled()
    clickOnTile(postAudience)
    clickOnTile('Non-Standard Audience')
    clickOnTile(postAudience)
    saveCurrentStep()

    // adding and removing categories
    isOnStep('category')
    nextStepIsDisabled()
    searchForTerm('Search for a category', postCategories[0])
    clickOnTile(postCategories[0])
    // test removing category by the label
    cy.get('button[aria-label="close"]').should('not.be.disabled').click()
    cy.get('button[aria-label="close"]').should('not.exist')
    clickOnTile(postCategories[0])
    // test removing category by selecting it again
    cy.findByRole('button', { name: postCategories[0] }).click()
    cy.get('button[aria-label="close"]').should('not.exist')
    clickOnTile(postCategories[0])
    // add second category
    searchForTerm('Search for a category', postCategories[1])
    clickOnTile(postCategories[1])
    // test button is still disabled if there are two categories
    nextStepIsDisabled()
    // add third category
    searchForTerm('Search for a category', postCategories[2])
    clickOnTile(postCategories[2])
    // button is enabled after 3 categories added
    saveCurrentStep()

    // adding character
    isOnStep('character')
    nextStepIsDisabled()
    searchForTerm('Search for a character by name', postCharacter)
    clickOnTile(postCharacter)
    saveCurrentStep()
    isOnStep('review')
    cy.findByText('Exclusive Supporter Content').should('be.visible')

    // test refresh to save progress as well as URL working for resuming progress and post page for drafts
    cy.reload()
    cy.visit(`/club/${clubName}/posts?state=DRAFT`)
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click()
    cy.findAllByText('Edit Draft').should('be.visible').click()
    isOnStep('arrange')
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click()
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
    cy.findByText('Exclusive Supporter Content').should('not.exist')
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
    cy.reload()
    cy.visit(`/club/${clubName}/posts?state=REVIEW`)
    cy.findByText(/Club Posts/iu).should('be.visible')
    cy.findByText(/No posts found/iu).should('not.exist')
  })

  it('can drag and drop video, add extra file, rearrange, remove one file, exit flow', () => {
    gotoClubCreatePost()
    // drag and drop file to upload it

    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-video.mp4', { subjectType: 'drag-n-drop' })
    // use the upload files button to upload
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.waitUntil(() => cy.get('button[aria-label="Remove Upload"]').should('be.visible'))

    // test rearrange
    clickOnButton('Rearrange Uploads')
    cy.get('button[aria-label="Down"]').click()
    clickOnButton('Save Order')
    clickOnButton('Rearrange Uploads')
    cy.get('button[aria-label="Up"]').click()
    clickOnButton('Cancel')
    clickOnButton('Rearrange Uploads')
    cy.findByRole('button', { name: 'Save Order' }).should('not.exist')
    clickOnButton('Cancel')

    gotoNextStep()
    gotoPreviousStep()

    // can remove uploads
    cy.get('button[aria-label="Remove Upload"]').first().click()
    // can exit the flow
    cy.findByText(/Arrange Uploads/iu).parent().get('button[aria-label="Exit Creator"]').click()
    cy.waitUntil(() => cy.findByRole('button', { name: /Yes, exit/iu }).should('be.visible'))
    cy.findByRole('button', { name: /Yes, exit/iu }).click()
    cy.findByText(/Upload one or more files by/iu).should('be.visible')
  })
})
