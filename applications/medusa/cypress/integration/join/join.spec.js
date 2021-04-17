describe('Join', () => {
  const email = 'artist_verified_test@overdoll.com';

  beforeEach(() => {
    cy.visit('/join');

    cy.get('form')
      .findByRole('textbox', { name: /email/i })
      .type(email);

    cy.get('form')
      .findByRole('button', { name: /Continue/i })
      .click();
  });

  it('asks to check email when joining', () => {
    // our email is shown on the page - we are asked to check it
    cy.findByText(email).should('exist');
  });

  it('persists state when refreshing', () => {
    cy.reload();

    // after a reload, we should still see our email on the page
    cy.findByText(email).should('exist');
  });

  it('redirects to profile when redeeming an existing user token', () => {
    cy.reload();

    cy.getCookie('otp-key').then(cookie => {
      cy.visit('/token/' + cookie.value);

      cy.url().should('include', '/profile');
    });
  });
});
