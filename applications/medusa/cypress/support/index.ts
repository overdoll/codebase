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
       * Note that this will not do a full join flow - depending on API keys set, it will:
       *
       * 1. Make manual API calls instead of going through the interface
       * 2. If testmail API keys are set, will read the actual emails
       * 3. If testmail API keys are not set, will read from server logs
       *
       * @example cy.joinWithExistingAccount('poisonminion@test.com')
       */
      joinWithExistingAccount: (email: string) => Chainable<Element>

      /**
       * Do a joining session with a new account, with a specific username + email
       *
       * Note that this will not do a full join flow - depending on API keys set, it will:
       *
       * 1. Make manual API calls instead of going through the interface
       * 2. If testmail API keys are set, will read the actual emails
       * 3. If testmail API keys are not set, will read from server logs
       *
       * @example cy.joinWithNewRandomAccount('poisonminion@test.com', 'poisonminion')
       */
      joinWithNewAccount: (username: string, email: string) => Chainable<Element>

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

      /**
       * Ensures that before this suite runs, testmail API keys are configured since you need this in order to run the suite
       */
      validateEmailServerIsConfigured: () => Chainable<Element>
    }
  }
}
