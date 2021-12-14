import '@testing-library/cypress/add-commands'
import '@cypress/code-coverage/support'
import 'cypress-file-upload'
import 'cypress-wait-until'
import './join'
import './email'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Start the joining session for an account with an email.
       *
       * Must chain with existingAccount() or newAccount() after
       * @example cy.join('test.123@testmail.app')
       */
      join: (email: string) => Chainable<Element>

      /**
       * The account exists already, so do the existing account flow
       * @example cy.join('test.123@testmail.app').existingAccount()
       */
      existingAccount: () => Chainable<Element>

      /**
       * Finish joining session by creating an account with email + username combo
       * @example cy.join('test.123@testmail.app').newAccount('new-username-123')
       */
      newAccount: (username: string) => Chainable<Element>

      /**
       * Preserve the currently-authenticated account
       *
       * Usually, you authenticate in the before() function and run preserveAccount() in beforeEach()
       *
       * @example cy.preserveAccount()
       */
      preserveAccount: () => Chainable<Element>

      /**
       * For the given email, display the last email that was sent to this email
       *
       * The email will be replaced in the DOM so it can be "tested" on
       * @example cy.displayLastEmail('register email', 'test.123@testmail.app')
       */
      displayLastEmail: (name: string, email: string) => Chainable<Element>
    }
  }
}
