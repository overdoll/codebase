import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { gotoNextStep, gotoPreviousStep, saveCurrentStep } from '../../support/flow_builder'
import { clickOnButton, clickOnTab, clickOnTile, searchForTerm, typeIntoPlaceholder } from '../../support/user_actions'

const postAudience = 'Standard Audience'
const postCategories = ['Alter', 'Assure', 'Transmit']
const postCharacter = 'Haider Woodley'
const rule = 'Rule #1 without infraction'

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

const gotoClubCreatePost = (clubName): void => {
  cy.visit(`/club/${clubName as string}/create-post`)
  cy.findByText(/Upload Files/).should('exist')
}

const waitForProcessing = (): void => {
  cy.findByText(/Processing Post Content/iu, { timeout: 30000 }).should('not.exist')
}

Cypress.config('defaultCommandTimeout', 10000)

describe('Create & Manage Posts', () => {
  it('create post, manage posts, approve post', () => {
    /**
     * Set up the account to use in the tests
     */
    const [username] = generateUsernameAndEmail()
    const clubName = generateClubName()
    cy.joinWithNewAccount(username)
    cy.joinWithExistingAccount('0eclipse')
    cy.assignArtistRole(username)
    cy.joinWithNewAccount(username)
    cy.createClub(clubName)

    /**
     * Upload two files, wait for processing and go to next step
     */
    gotoClubCreatePost(clubName)
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile(['test-post.png', 'test-post.png'])
    isOnStep('arrange')
    cy.findByText(/You'll need to upload at least/iu).should('not.exist')
    waitForProcessing()
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click({ force: true })
    cy.findByText(/Free content should be/).should('be.visible')
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click({ force: true })
    cy.findByText(/Free content should be/).should('not.exist')
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click({ force: true })
    cy.findByText(/Free content should be/).should('be.visible').click({ force: true })
    clickOnButton('Got it')
    gotoNextStep()

    /**
     * Select audience, change audience, save audience
     */
    isOnStep('audience')
    nextStepIsDisabled()
    clickOnTile(postAudience)
    clickOnTile('Non-Standard Audience')
    clickOnTile(postAudience)
    saveCurrentStep()

    /**
     * Add category, remove category, save categories
     */
    isOnStep('category')
    cy.findByRole('button', { name: '0 / 3' }).should('be.disabled')
    searchForTerm('Search for a category', postCategories[0])
    clickOnTile(postCategories[0])
    // test removing category by the label
    cy.get('button[aria-label="Clear Search"]').should('not.be.disabled').click({ force: true })
    cy.get('button[aria-label="close"]').should('be.visible').should('not.be.disabled').click({
      force: true,
      multiple: true
    })
    cy.get('button[aria-label="close"]').should('not.exist')
    clickOnTile(postCategories[0])
    // test removing category by selecting it again
    cy.findByRole('button', { name: postCategories[0] }).click()
    cy.get('button[aria-label="close"]').should('not.exist')
    clickOnTile(postCategories[0])
    // add second category
    searchForTerm('Search for a category', postCategories[1])
    clickOnTile(postCategories[1])
    // add third category
    searchForTerm('Search for a category', postCategories[2])
    clickOnTile(postCategories[2])
    // button is enabled after 3 categories added
    saveCurrentStep()

    /**
     * Add character, save character
     */
    isOnStep('character')
    cy.findByRole('button', { name: '0 / 1' }).should('be.disabled')
    searchForTerm('Search for a character by name', postCharacter)
    clickOnTile(postCharacter)
    saveCurrentStep()

    /**
     * Review step works and contains exclusive supporter content
     */
    isOnStep('review')
    cy.findByText(/Exclusive Supporter Content/iu).should('be.visible')

    /**
     * Refresh page to check that everything has saved correctly
     */
    cy.reload()
    // open post from draft
    cy.visit(`/club/${clubName}/posts?state=DRAFT`)
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click({ force: true })
    cy.findAllByText('Edit Draft').should('be.visible').click({ force: true })
    isOnStep('arrange')
    gotoNextStep()
    // check audience
    isOnStep('audience')
    cy.findAllByText(postAudience).should('exist')
    gotoNextStep()
    // check category
    isOnStep('category')
    cy.findAllByText(postCategories[0]).should('exist')
    cy.findAllByText(postCategories[1]).should('exist')
    cy.findAllByText(postCategories[2]).should('exist')
    gotoNextStep()
    // check character
    isOnStep('character')
    cy.findAllByText(postCharacter).should('exist')
    gotoNextStep()
    isOnStep('review')
    // check that it's not exclusive anymore and previous selections exist for the post
    cy.findByText('Exclusive Supporter Content').should('not.exist')
    cy.findByText(postCategories[0]).should('exist')
    cy.findByText(postCategories[1]).should('exist')
    cy.findByText(postCategories[2]).should('exist')
    cy.findByText(postCharacter).should('exist')
    // add supporter content so we can test that the subscription button appears
    cy.reload()
    isOnStep('arrange')
    gotoNextStep()
    isOnStep('audience')
    gotoNextStep()
    isOnStep('category')
    gotoNextStep()
    isOnStep('character')
    gotoNextStep()
    isOnStep('review')
    // test post submission
    clickOnButton(/Submit/iu)
    cy.findByText(/Submitted for review/iu).should('exist')
    clickOnButton(/Post again/i)
    cy.findByText(/Upload Files/iu).should('exist')

    /**
     * Test the review post
     */
    cy.reload()
    cy.visit(`/club/${clubName}/posts?state=REVIEW`)
    cy.findByText(/Club Posts/iu).should('be.visible')
    cy.findAllByText(/REVIEW/iu).should('be.visible')
    gotoClubCreatePost(clubName)

    /**
     * Upload new files, remove upload, rearrange
     */
    // test drag and drop
    // TODO invalid mp4 causes infinite processing - use this to test it?
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-video.mp4', { subjectType: 'drag-n-drop' })
    // use the upload files button to upload
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.get('button[aria-label="Remove Upload"]').should('be.visible')
    // test rearrange
    clickOnButton('Rearrange Uploads')
    cy.get('button[aria-label="Down"]').click({ force: true })
    clickOnButton('Save Order')
    clickOnButton('Rearrange Uploads')
    cy.get('button[aria-label="Up"]').click({ force: true })
    clickOnButton('Cancel')
    clickOnButton('Rearrange Uploads')
    cy.findByRole('button', { name: 'Save Order' }).should('not.exist')
    clickOnButton('Cancel')
    gotoNextStep()
    gotoPreviousStep()
    // can remove uploads
    cy.get('button[aria-label="Remove Upload"]').first().click({ force: true })
    // can rewind categories from post in review
    isOnStep('arrange')
    gotoNextStep()
    isOnStep('audience')
    clickOnTile(postAudience)
    saveCurrentStep()
    isOnStep('category')
    cy.get('button[aria-label="Rewind Categories"]').should('not.be.disabled').click({ force: true })
    cy.findByText('Add Categories From Post').should('be.visible')
    cy.findByText(/Select a post/).should('be.visible')
    cy.findAllByRole('button').should('be.visible').eq(2).click()
    clickOnButton('Add Categories')
    saveCurrentStep()
    // can exit the flow
    cy.findByText('Add Character').parent().get('button[aria-label="Exit Creator"]').click({ force: true })
    cy.waitUntil(() => cy.findByRole('button', { name: /Yes, exit/iu }).should('be.visible'))
    clickOnButton(/Yes, exit/iu)
    cy.findByText(/Upload one or more files by/iu).should('be.visible')

    /**
     * Delete draft post
     */
    cy.visit(`/club/${clubName}/create-post`)
    cy.findByText(/You have unpublished/).should('not.be.disabled').click({ force: true })
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click({ force: true })
    cy.findByText('Delete Post').should('be.visible').click({ force: true })
    cy.findByText('Delete Post Confirmation').should('be.visible')
    clickOnButton('Delete Post')
    cy.findByText(/Post was deleted/iu).should('be.visible')

    /**
     * Login as moderator and approve post
     */
    cy.joinWithExistingAccount('poisonminion')
    cy.visit('/moderation/post-queue')
    clickOnButton('Approve')
    cy.findByText(/Post created by/iu).should('be.visible')

    /**
     * Join as club owner and see the post is published and archive it and un-archive ot
     */
    cy.joinWithNewAccount(username)
    cy.visit(`/club/${clubName}/posts?state=PUBLISHED`)
    cy.reload()
    cy.findAllByText(/PUBLISHED/iu).should('be.visible')
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click({ force: true })
    cy.findByText('Archive Post').should('be.visible').click({ force: true })
    cy.findByText(/Post was archived/iu).should('be.visible')
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click({ force: true })
    cy.findByText('Un-Archive Post').should('be.visible').click({ force: true })
    cy.findByText(/Post was un-archived/iu).should('be.visible')

    /**
     * Check that you can collect subscription revenue from the home page
     */
    cy.visit(`/club/${clubName}/home`)
    cy.findByText(/Post exclusive content at least once by/iu).should('be.visible')

    /**
     * Check that a new user can subscribe to your club
     */
    const [newUsername] = generateUsernameAndEmail()
    cy.joinWithNewAccount(newUsername)
    cy.visit(`/${clubName}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/Your contribution directly supports/iu).should('be.visible')

    /**
     * Remove post as staff
     */
    cy.joinWithExistingAccount('0eclipse')
    cy.visit(`/${clubName}/posts?sort=NEW`)
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click({ force: true })
    cy.findByText('Moderate').should('be.visible').click({ force: true })
    clickOnTab('Actions')
    clickOnButton('Remove Post')
    clickOnButton('Select Rule')
    clickOnTile(rule)
    typeIntoPlaceholder(/Add a note describing/iu, 'A note about why the post was removed')
    clickOnButton('Confirm Remove Post')
    cy.findByText(/Successfully removed post/iu).should('be.visible')
  })
})
