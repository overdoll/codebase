import { generateUsernameAndEmail } from '../../../support/generate'
import { join, logout } from '../../../support/join_actions'
import { gotoNextStep } from '../../../support/flow_builder'

Cypress.config('defaultCommandTimeout', 10000)

describe('Settings - Configure Two-Factor', () => {
  const [username, email] = generateUsernameAndEmail()

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

  before(() => {
    cy.joinWithNewAccount(username, email)
    gotoSettingsPage()

    // Create recovery codes. Chain parents to get to the button class
    cy.waitUntil(() => cy.findByRole('button', { name: /Recovery Codes/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Recovery Codes/ }).click()
    cy.waitUntil(() => cy.findByText(/Set up recovery codes/iu).should('exist'))
    cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
    cy.findByText(/Generate new recovery codes/iu).should('exist')
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('cypressTestRecoveryCode', 'cypressTestOtpSecret')
    cy.joinWithNewAccount(username, email)
  })

  it('can generate new recovery codes', () => {
    gotoSettingsPage()

    // Generate new codes and check to see if they are equal to the new ones
    cy.waitUntil(() => cy.findByRole('button', { name: /Recovery Codes/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Recovery Codes/ }).click()
    cy.get('code').invoke('text').then(initialText => {
      cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
      cy.get('code').invoke('text').should('not.equal', initialText)
    })
  })

  it('can set up authenticator app and login using OTP, and recovery codes', () => {
    gotoSettingsPage()

    cy.waitUntil(() => cy.findByRole('button', { name: /Recovery Codes/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Recovery Codes/ }).click()

    // Store recovery code as if the user "saved" it somewhere
    cy.get('code').invoke('text').then(text => {
      cy.setCookie('cypressTestRecoveryCode', text.slice(0, 8))
    })

    gotoSettingsPage()

    // Set up authenticator app
    cy.waitUntil(() => cy.findByRole('button', { name: /Authenticator App/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Authenticator App/ }).click()
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
        cy.findByRole('button', { name: /Activate/iu }).click()
        cy.findByText(/Two-factor setup complete/iu).should('exist')
        cy.findByRole('button', { name: 'Back to settings' }).click()
        cy.waitUntil(() => cy.findByText('Two-factor Authentication').should('exist'))
      })
    })

    logout()

    join(email)

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

    logout()

    join(email)

    // Login using recovery code
    cy.findByText(/Enter the 6-digit code/iu).should('exist')
    cy.getCookie('cypressTestRecoveryCode').then(cookie => {
      cy.waitUntil(() => cy.findByRole('button', { name: /I lost access/iu }).should('not.be.disabled'))
      cy.findByRole('button', { name: /I lost access/iu }).click()
      cy.waitUntil(() => cy.findByPlaceholderText(/recovery code/iu).should('exist'))
      cy.findByPlaceholderText(/recovery code/iu).type(cookie?.value as string)
      cy.findByRole('button', { name: 'Submit' }).click()
      cy.findByText(/A recovery code was successfully used up to log you in/iu).should('exist')
      cy.url().should('include', '/')
    })

    // Disable two factor
    gotoSettingsPage()
    cy.waitUntil(() => cy.findByRole('button', { name: /Disable/iu }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Disable/iu }).click()
    cy.findByRole('button', { name: /Disable Two-factor/iu }).click()
    cy.findByText(/Disable Two-Factor Authentication/iu).should('not.exist')
  })
})
