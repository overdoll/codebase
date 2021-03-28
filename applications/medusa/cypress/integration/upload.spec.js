describe('Upload', () => {
  beforeEach(() => {
    cy.login('artist_verified_test@overdoll.com');
  });

  it('should be able to upload', () => {
    cy.visit('/upload');
  });
});
