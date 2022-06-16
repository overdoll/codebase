import { generateUsernameAndEmail } from '../../support/generate'
import { join, logout } from '../../support/join_actions'
import { gotoNextStep } from '../../support/flow_builder'
import { clickOnButton, clickOnPanel, typeIntoPlaceholder } from '../../support/user_actions'

const gotoSettingsPage = (): void => {
  cy.visit('/settings/security')
  cy.findByText(/Two-factor Authentication/).should('exist')
  cy.waitUntil(() => cy.findByText(/Recovery Codes/).should('not.be.disabled'))
}

const isOnStep = (step: string): void => {
  switch (step) {
    case 'download':
      cy.findByText('Download App').should('exist')
      break
    case 'code':
      cy.findByText('Scan Code').should('exist')
      break
    case 'active':
      cy.findByText('Enter Code').should('exist')
      break
    default:
      break
  }
}

Cypress.config('defaultCommandTimeout', 10000)

describe('Recovery Codes and Two-Factor', () => {
  it('recovery codes, totp, login', () => {
    /**
     * Account setup
     */
    const [username, email] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)
    gotoSettingsPage()

    /**
     * Generate and re-generate recovery codes
     */
    // Create recovery codes
    clickOnPanel('Recovery Codes')
    cy.findByText(/Set up recovery codes/iu).should('be.visible')
    clickOnButton(/Generate Recovery Codes/iu)
    cy.findByText(/Generate new recovery codes/iu).should('exist')
    cy.reload()
    // Generate new codes and check to see if they are equal to the new ones
    cy.get('code').invoke('text').then(initialText => {
      clickOnButton(/Generate Recovery Codes/iu)
      cy.findByText(/Recovery codes successfully/iu).should('be.visible')
      cy.get('code').invoke('text').should('not.equal', initialText)
    })

    // Store recovery code as if the user "saved" it somewhere
    cy.get('code').invoke('text').then(text => {
      cy.setCookie('cypressTestRecoveryCode', text.slice(0, 8))
    })

    /**
     * Set up authenticator app
     */
    gotoSettingsPage()
    // Set up authenticator app
    clickOnPanel(/Authenticator App/)
    isOnStep('download')
    gotoNextStep()
    isOnStep('code')
    cy.get('[aria-label="Copy"]').find('code').invoke('text').then(secret => {
      // Store the secret as if the user stored it in an authenticator app
      cy.setCookie('cypressTestOtpSecret', secret)

      // Use a plugin to generate a one time password using the secret
      cy.task('generateOTP', secret).then(token => {
        gotoNextStep()
        isOnStep('activate')
        cy.get('form').findByPlaceholderText('123456').type(token as string)
        clickOnButton(/Activate/iu)
        cy.findByText('Two-Factor Setup Complete').should('exist')
      })
    })

    /**
     * Log out and join to get to the two factor join page
     */
    logout()
    join(email)

    /**
     * Log in using the 6 digit two factor code
     */
    cy.findByText(/Enter the 6-digit code/iu).should('exist')
    cy.getCookie('cypressTestOtpSecret').then(cookie => {
      cy.task('generateOTP', cookie?.value).then(token => {
        cy.waitUntil(() => cy.get('form').findByPlaceholderText('123456').should('not.be.disabled')).then(element => {
          if (element != null) {
            cy.get(element).type(token as string)
            cy.findByRole('button', { name: /Submit Code/iu }).click()
            cy.findByText(/Welcome back! Thanks for using two-factor to log in!/iu).should('exist')
          }
        })
      })
    })

    /**
     * Log out and join to get to the two factor join page
     */
    logout()
    join(email)

    /**
     * Log in using a recovery code
     */
    cy.findByText(/Enter the 6-digit code/iu).should('exist')
    cy.getCookie('cypressTestRecoveryCode').then(cookie => {
      cy.waitUntil(() => cy.findByRole('button', { name: /I lost access/iu }).should('not.be.disabled'))
      clickOnButton(/I lost access/iu)
      cy.waitUntil(() => cy.findByPlaceholderText(/recovery code/iu).should('exist'))
      typeIntoPlaceholder(/recovery code/iu, cookie?.value as string)
      cy.findByRole('button', { name: 'Submit' }).click()
      cy.findByText(/A recovery code was successfully used up to log you in/iu).should('exist')
      cy.findByText('Home').should('be.visible')
    })

    /**
     * Disable two factor
     */
    gotoSettingsPage()
    clickOnButton(/Disable/iu)
    clickOnButton(/Disable Two-factor/iu)
    cy.findByRole('button', { name: 'Disable' }).should('not.exist')
  })
})
