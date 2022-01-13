import { generateUsernameAndEmail } from '../../../support/generate'
import { join, logout } from '../../../support/join_actions'

describe('Settings - Configure Two-Factor', () => {
  const [username, email] = generateUsernameAndEmail()

  const gotoSettingsPage = (): void => {
    cy.visit('/settings/security')
    cy.findByText(/Two-factor Authentication/).should('exist')
    cy.waitUntil(() => cy.findByText(/Recovery Codes/).should('not.be.disabled'))
  }

  before(() => {
    cy.joinWithNewAccount(username, email)
    gotoSettingsPage()

    // Create recovery codes. Chain parents to get to the button class
    cy.waitUntil(() => cy.findByRole('button', { name: /Recovery Codes/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Recovery Codes/ }).click()
    cy.findByText(/No recovery codes/iu).should('exist')
    cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
    cy.findByText(/Your recovery codes/iu).should('exist')
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
    cy.findByText(/Your recovery codes/iu).parent().get('code').invoke('text').then(initialText => {
      cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
      cy.findByText(/Your recovery codes/iu).parent().get('code').invoke('text').should('not.equal', initialText)
    })
  })

  it('can set up authenticator app and login using OTP, and recovery codes', () => {
    gotoSettingsPage()

    cy.waitUntil(() => cy.findByRole('button', { name: /Recovery Codes/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Recovery Codes/ }).click()

    // Store recovery code as if the user "saved" it somewhere
    cy.findByText(/Your recovery codes/iu).parent().get('code').invoke('text').then(text => {
      cy.setCookie('cypressTestRecoveryCode', text.slice(0, 8))
    })

    gotoSettingsPage()

    // Set up authenticator app
    cy.waitUntil(() => cy.findByRole('button', { name: /Authenticator App/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Authenticator App/ }).click()
    cy.findByText(/Download an Authenticator App/iu).should('exist')
    cy.get('[aria-label="Copy"]').find('code').invoke('text').then(secret => {
      // Store the secret as if the user stored it in an authenticator app
      cy.setCookie('cypressTestOtpSecret', secret)

      // Use a plugin to generate a one time password using the secret
      cy.task('generateOTP', secret).then(token => {
        cy.get('form').findByPlaceholderText('123456').type(token as string)
        cy.findByRole('button', { name: /Activate/iu }).click()
        cy.findByText(/You have successfully set up/iu).should('exist')
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
            cy.url().should('include', '/profile')
          }
        })
      })
    })

    logout()

    join(email)

    // Login using recovery code
    cy.findByText(/Enter the 6-digit code/iu).should('exist')
    cy.getCookie('cypressTestRecoveryCode').then(cookie => {
      console.log(cookie)
      cy.waitUntil(() => cy.findByRole('button', { name: /I lost access/iu }).should('not.be.disabled'))
      cy.findByRole('button', { name: /I lost access/iu }).click()
      cy.findByText(/Enter a recovery code/iu).should('be.visible').parent().findByPlaceholderText(/recovery code/iu).type(cookie?.value as string)
      cy.findByRole('button', { name: 'Submit' }).click()
      cy.url().should('include', '/profile')
    })

    // Disable two factor
    gotoSettingsPage()
    cy.waitUntil(() => cy.findByRole('button', { name: /Disable/iu }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Disable/iu }).click()
    cy.findByRole('button', { name: /Disable Two-factor/iu }).click()
    cy.findByText(/Disable Two-Factor Authentication/iu).should('not.exist')
  })
})
