// TODO: add a test case where the user adds a new character, media and artist
describe('Upload', () => {
  beforeEach(() => {
    // clear indexedDB
    window.indexedDB.deleteDatabase('overdoll.uploads')
    cy.login('artist_verified_test@overdoll.com')
  })

  it('should be able to upload', () => {
    cy.visit('/upload')

    return

    cy.findByTestId('file').attachFile('test-post.png')

    cy.findByRole('button', { name: 'next' }).click()

    // click on 'select artist' button
    cy.findByRole('button', { name: 'select artist' }).click()

    // select the unverified artist
    cy.findByRole('button', { name: /artist_unverified/iu }).click()

    // click on 'select character' button
    cy.findByRole('button', { name: 'select character' }).click()

    // select 2 characters
    cy.findByRole('button', { name: /Lylah Barrett/iu }).click()

    // TODO: need to search first before clicking
    cy.findByRole('button', { name: /Susannah Aguilar/iu }).click()

    // close out of character selection
    cy.findByRole('button', { name: 'close' }).click()

    // click on 'select category' button
    cy.findByRole('button', { name: 'select category' }).click()

    cy.findByPlaceholderText('search categories').type('Signal')

    cy.findByRole('button', { name: /Signal/iu }).click()

    // go back to input and un-search
    cy.findByDisplayValue('Signal').clear()

    // select 2 categories
    cy.findByRole('button', { name: /Assure/iu }).click()
    cy.findByRole('button', { name: /Convict/iu }).click()

    // close window
    cy.findByRole('button', { name: 'close' }).click()

    // go to next step
    cy.findByRole('button', { name: 'next' }).click()

    // submit
    cy.findByRole('button', { name: 'submit' }).click()
  })
})
