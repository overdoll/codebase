// TODO: add a test case where the user adds a new character, media and artist
describe('Upload', () => {
  beforeEach(() => {
    // clear indexedDB
    window.indexedDB.deleteDatabase('overdoll.uploads')
    cy.login('artist_verified_test@overdoll.com')
  })

  it('should be able to upload', () => {
    cy.visit('/upload')
  })
})
