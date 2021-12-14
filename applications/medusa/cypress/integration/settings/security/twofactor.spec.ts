describe('Settings - Configure Two-Factor', () => {
  const username = cy.account.username()
  const email = cy.account.email(username)

  const gotoSettingsPage = () => {
    cy.visit('/settings/security')
    cy.findByText(/Two-factor Authentication/).should('exist')
    cy.waitUntil(() => cy.findByText(/Recovery Codes/).should('not.be.disabled'))
  }

  before(() => {
    cy.join(email).newAccount(username)
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('cypressTestRecoveryCode', 'cypressTestOtpSecret')
  })

  it('can set up recovery codes', () => {
    cy.preserveAccount()
    gotoSettingsPage()

    // Create recovery codes. Chain parents to get to the button class
    cy.waitUntil(() => cy.findByRole('button', { name: /Recovery Codes/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Recovery Codes/ }).click()
    cy.findByText(/No recovery codes/iu).should('exist')
    cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
    cy.findByText(/Your recovery codes/iu).should('exist')
  })

  it('can generate new recovery codes', () => {
    cy.preserveAccount()
    gotoSettingsPage()

    // Generate new codes and check to see if they are equal to the new ones
    cy.waitUntil(() => cy.findByRole('button', { name: /Recovery Codes/ }).should('not.be.disabled'))
    cy.findByRole('button', { name: /Recovery Codes/ }).click()
    cy.findByText(/Your recovery codes/iu).parent().get('code').invoke('text').then(initialText => {
      cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
      cy.findByText(/Your recovery codes/iu).parent().get('code').invoke('text').should('not.equal', initialText)
    })

    // Store recovery code as if the user "saved" it somewhere
    cy.findByText(/Your recovery codes/iu).parent().get('code').invoke('text').then(text => {
      cy.setCookie('cypressTestRecoveryCode', text.slice(0, 8))
    })
  })

  it('can set up authenticator app', () => {
    cy.preserveAccount()
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
        cy.get('form').findByRole('textbox', { placeholder: '123456' }).type(token)
        cy.findByRole('button', { name: /Activate/iu }).click()
        cy.findByText(/You have successfully set up/iu).should('exist')
      })
    })
  })

  it('login using one time password', () => {
    cy.findByText(/Enter the 6-digit code/iu).should('exist')
    cy.getCookie('cypressTestOtpSecret').then(cookie => {
      cy.task('generateOTP', cookie?.value).then(token => {
        cy.waitUntil(() => cy.get('[aria-label="Please enter your pin code"]').should('not.be.disabled')).then(element => {
          cy.get(element[0]).type(token as string)
          cy.url().should('include', '/profile')
        })
      })
    })
  })

  it('login using a recovery code and disable two factor', () => {
    // Login using recovery code
    cy.findByText(/Enter the 6-digit code/iu).should('exist')
    cy.getCookie('cypressTestRecoveryCode').then(cookie => {
      cy.waitUntil(() => cy.findByRole('button', { name: /I lost access/iu }).should('not.be.disabled'))
      cy.findByRole('button', { name: /I lost access/iu }).click()
      cy.findByText(/Enter a recovery code/iu).should('be.visible').parent().findByRole('textbox', { placeholder: /recovery code/iu }).type(cookie?.value as string)
      cy.findByRole('button', { name: /Submit/iu }).click()
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
