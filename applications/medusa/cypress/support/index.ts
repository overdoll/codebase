import '@testing-library/cypress/add-commands'
import '@cypress/code-coverage/support'
import 'cypress-file-upload'
import 'cypress-wait-until'
import './join'
import './email'
import './cookies'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Start the joining session for an account that already exists in the system.
       *
       * All you need to provide is the "name" and it will append the proper email variables
       * @example cy.joinWithExistingAccount('poisonminion')
       */
      joinWithExistingAccount: (name: string) => Chainable<Element>

      /**
       * Do the joining session but don't check if it finished (useful for other flows, like 2FA)
       *
       * @example cy.join('poisonminion')
       */
      join: (name: string) => Chainable<Element>

      /**
       * Do a joining session with a new account.
       *
       * All you need to provide is the "name" and it will create the proper email and username
       * @example cy.joinWithNewAccount('poisonminion')
       */
      joinWithNewAccount: (name: string) => Chainable<Element>

      /**
       * Do a joining session with a new account, with random username + email
       *
       * Can optionally add a prefix
       *
       * @example cy.joinWithNewRandomAccount()
       */
      joinWithNewRandomAccount: (prefix?: string) => Chainable<Element>

      /**
       * Preserve the currently-authenticated account
       *
       * Usually, you authenticate in the before() function and run preserveAccount() in beforeEach()
       *
       * @example cy.preserveAccount()
       */
      preserveAccount: () => Chainable<Element>

      /**
       * Logout the current account
       **
       * @example cy.logout()
       */
      logout: () => Chainable<Element>

      /**
       * Cleanup
       **
       * @example cy.cleanup()
       */
      cleanup: () => Chainable<Element>

      /**
       * For the given email, display the last email that was sent to this email
       *
       * The email will be replaced in the DOM so it can be "tested" on
       *
       * Enter timestamp as the time when the email "would have been" sent to isolate tests better
       *
       * @example cy.displayLastEmail(Date.now(), 'register email', 'test.123@testmail.app')
       */
      displayLastEmail: (startTimestamp: number, name: string, email: string) => Chainable<Element>
    }
  }
}
