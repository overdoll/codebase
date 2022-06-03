import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { gotoNextStep, gotoPreviousStep, saveCurrentStep } from '../../support/flow_builder'
import { clickOnButton, clickOnTab, clickOnTile, searchForTerm } from '../../support/user_actions'

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
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click()
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
    // add third category
    searchForTerm('Search for a category', postCategories[2])
    clickOnTile(postCategories[2])
    // button is enabled after 3 categories added
    saveCurrentStep()

    /**
     * Add character, save character
     */
    isOnStep('character')
    nextStepIsDisabled()
    searchForTerm('Search for a character by name', postCharacter)
    clickOnTile(postCharacter)
    saveCurrentStep()

    /**
     * Review step works and contains exclusive supporter content
     */
    isOnStep('review')
    cy.findByText('Exclusive Supporter Content').should('be.visible')

    /**
     * Refresh page to check that everything has saved correctly
     */
    cy.reload()
    // open post from draft
    cy.visit(`/club/${clubName}/posts?state=DRAFT`)
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click()
    cy.findAllByText('Edit Draft').should('be.visible').click()
    isOnStep('arrange')
    // remove supporter content
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click()
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
    cy.get('button[aria-label="Supporter Only"]').should('not.be.disabled').first().click()
    gotoNextStep()
    isOnStep('audience')
    gotoNextStep()
    isOnStep('category')
    gotoNextStep()
    isOnStep('character')
    gotoNextStep()
    isOnStep('review')
    // test post submission
    cy.findByRole('button', { name: /Submit/iu }).should('not.be.disabled').click()
    cy.findByText(/Submitted for review/iu).should('exist')
    cy.findByRole('button', { name: /Post again/iu }).click()
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
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-video.mp4', { subjectType: 'drag-n-drop' })
    // use the upload files button to upload
    cy.findByText(/Upload Files/iu).should('not.be.disabled').get('input[type="file"]').attachFile('test-post.png')
    cy.get('button[aria-label="Remove Upload"]').should('be.visible')
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
    cy.findByText('Arrange Uploads').parent().get('button[aria-label="Exit Creator"]').click()
    cy.waitUntil(() => cy.findByRole('button', { name: /Yes, exit/iu }).should('be.visible'))
    cy.findByRole('button', { name: /Yes, exit/iu }).click()
    cy.findByText(/Upload one or more files by/iu).should('be.visible')

    /**
     * Delete draft post
     */
    cy.visit(`/club/${clubName}/posts?state=DRAFT`)
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click()
    cy.findByText('Delete Post').should('be.visible').click()
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
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click()
    cy.findByText('Archive Post').should('be.visible').click()
    cy.findByText(/Post was archived/iu).should('be.visible')
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click()
    cy.findByText('Un-Archive Post').should('be.visible').click()
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
    cy.get('button[aria-label="Open Menu"]').should('be.visible').click()
    cy.findByText('Moderate').should('be.visible').click()
    clickOnTab('Actions')
    clickOnButton('Remove Post')
    clickOnButton('Select Rule')
    clickOnTile(rule)
    cy.findByPlaceholderText(/Add a note describing/iu).should('be.visible').type('A note about why the post was removed')
    clickOnButton('Confirm Remove Post')
    cy.findByText(/Successfully removed post/iu).should('be.visible')
  })
})
