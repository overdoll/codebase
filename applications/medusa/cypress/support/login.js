Cypress.Commands.add('login', email => {
  cy.visit('/join');

  cy.get('form')
    .findByRole('textbox', { name: /email/i })
    .type(email);

  cy.get('form')
    .findByRole('button', { name: /Continue/i })
    .click();

  cy.getCookie('otp-key').then(cookie => {
    // in debug mode, our cookies won't be encrypted so we can just read it directly from the browser
    // in production, the user would have to check their email in order to get the right token
    cy.visit('/token/' + cookie.value);
  });
});
