// TODO: add a test case where the user adds a new character, media and artist
describe('Upload', () => {
  const artist = 'artist_verified'

  const customArtist = 'artist_custom'

  const character = 'Lylah Barrett'

  const media = 'Suspicious Of The Universe'

  const customCharacter = 'Custom Character'

  const customMedia = 'Custom Media'

  beforeEach(() => {
    // clear indexedDB
    window.indexedDB.deleteDatabase('overdoll.uploads')
    window.indexedDB.deleteDatabase('uppy-blobs')
    cy.clearLocalStorage()
    cy.login('artist_unverified_test@overdoll.com')

    cy.visit('/upload')

    cy.findByTestId('file').should('exist')

    // Wait is necessary due to a bug or something with attaching files more than once
    cy.wait(1000)

    cy.findByTestId('file').attachFile('test-post.png')

    cy.waitUntil(() => cy.findByText(/Hold a tile/u).should('exist'))
  })

  it('should be able to upload a post', () => {
    // Go to tagging

    cy.findByRole('button', { name: /Next/u }).click()

    cy.findByText(/To continue/u).should('exist')

    // Check if Next button is disabled
    cy.findByRole('button', { name: /Next/u }).should('be.disabled')

    // Add an artist successfully
    cy.findByRole('button', { name: /Artist/u }).click()

    cy.findByRole('button', { name: /Add/u }).click()

    cy.findByText(/Search for an artist/u).should('exist')

    cy.findByRole('textbox', { placeholder: /Search for an artist/u })
      .type(artist)

    cy.findAllByText(artist).first().click()

    cy.findByText(/Tag your post/u).should('exist')

    cy.findByText(artist).should('exist')

    // Add custom artist successfully, replacing current artist
    cy.findByRole('button', { name: /Add/u }).click()

    cy.findByText(/Search for an artist/u).should('exist')

    cy.findByRole('textbox', { placeholder: /Search for an artist/u })
      .clear()

    cy.findByRole('textbox', { placeholder: /Search for an artist/u })
      .type(customArtist)

    cy.findByRole('button', { name: `Add artist ${customArtist}` }).click()

    cy.findByText(/Search for an artist/u).should('not.exist')

    // Add custom character and media
    cy.findByRole('button', { name: /Characters/u }).click()

    cy.findByRole('button', { name: /Add/u }).click()

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .clear()

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .type(customCharacter)

    cy.findByRole('button', { name: `Add character ${customCharacter}` }).click()

    cy.findByText(/Select the media/u).should('exist')

    cy.findByRole('textbox', { placeholder: /Search for a media/u })
      .type(customMedia)

    cy.findByRole('button', { name: `Add media ${customMedia}` }).click()

    cy.findByText(`${customCharacter} (${customMedia})`).should('exist')

    // Remove character
    cy.findByRole('button', { name: /close/u }).click()

    // Add pre-defined character successfully
    cy.findByRole('button', { name: /Add/u }).click()

    cy.findByText(/Search for a character/u).should('exist')

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .type(character)

    cy.findByText(character).first().click()

    cy.findByRole('button', { name: /Close Search/u }).click()

    cy.findByText(/Search for a character/u).should('not.exist')

    cy.findByText(new RegExp(character, 'u')).should('exist')

    // Add custom character and existing media
    cy.findByRole('button', { name: /Add/u }).click()

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .clear()

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .type(customCharacter)

    cy.findByRole('button', { name: `Add character ${customCharacter}` }).click()

    cy.findByText(/Select the media/u).should('exist')

    cy.findByText(media).first().click()

    // Add category
    cy.findByRole('button', { name: /Categories/u }).click()

    cy.findByRole('button', { name: /Add/u }).click()

    cy.findByRole('textbox', { placeholder: /Search for a category/u })
      .type('Signal')

    cy.findByText('Signal').first().click()

    cy.findByRole('button', { name: /Close Search/u }).click()

    cy.findByRole('button', { name: /close/u }).first().click()

    cy.findByRole('button', { name: /Add/u }).click()

    cy.findByRole('textbox', { placeholder: /Search for a category/u })
      .clear()

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .type('Assure')

    cy.findByText('Assure').first().click()

    cy.findByRole('textbox', { placeholder: /Search for a category/u })
      .clear()

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .type('Carry')

    cy.findByText('Carry').first().click()

    cy.findByRole('textbox', { placeholder: /Search for a category/u })
      .clear()

    cy.findByRole('textbox', { placeholder: /Search for a character/u })
      .type('Alter')

    cy.findByText('Alter').first().click()

    cy.findByRole('button', { name: /Close Search/u }).click()

    // Review stage
    cy.findByRole('button', { name: /Next/u }).click()

    cy.findByText(/Review your post/u).should('exist')

    // Check that you can still submit after refreshing, indicating the data was loaded
    cy.reload()

    cy.findByText(/Review your post/u).should('exist')

    // Submit
    cy.findByRole('button', { name: /Submit/u }).click()

    cy.findByText(/Your post was submitted for approval/u).should('exist')
  })

  it('should be able to add extra media', () => {
    cy.findByTestId('file').should('exist')

    cy.findByTestId('file').attachFile('test-post.png')

    cy.findAllByRole('button', { name: /Close/u }).eq(0).click({ multiple: false })
  })

  it('should be able to cancel upload by removing tile', () => {
    cy.findByRole('button', { name: /Close/u }).click()

    cy.findByText(/Upload up to/u).should('exist')
  })

  it('should be able to cancel upload by clicking back button', () => {
    cy.findByRole('button', { name: /Cancel/u }).click()

    cy.findByRole('button', { name: /Go Back/u }).click()

    cy.findByRole('button', { name: /Cancel/u }).click()

    cy.findByRole('button', { name: /Cancel Upload/u }).click()

    cy.findByText(/Upload up to/u).should('exist')
  })
})
