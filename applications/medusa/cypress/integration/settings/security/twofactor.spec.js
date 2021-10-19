describe('Settings - Configure Two-Factor', () => {
  const id = Cypress._.random(0, 1e6)
  const email = `${id}@test.com`

  const gotoSettingsPage = () => cy.waitUntil(() =>
    cy.url().should('include', '/profile').then(() => {
      cy.visit('/settings/security')
      cy.findByText(/Two-factor Authentication/).should('exist')
    })
  )

  before(() => {
    cy.login(email)
    cy.register(email, id)
    cy.logout()
  })

  // TODO fix flakiness in usernames expand button and clicking into the page
  // TODO components where it expected the component to not be disposed
  // TODO issue is that the h2 is being selected and not the button

  // TODO add test for removing two factor

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('cypressTestRecoveryCode', 'cypressTestOtpSecret')
    cy.login(email)
  })

  it('can set up recovery codes', () => {
    gotoSettingsPage()

    // Create recovery codes
    cy.waitUntil(() => cy.findByText(/Recovery Codes/).should('not.be.disabled'))
    cy.findByText(/Recovery Codes/).click()
    cy.findByText(/No recovery codes/iu).should('exist')
    cy.findByRole('button', { name: /Generate Recovery Codes/iu }).click()
    cy.findByText(/Your recovery codes/iu).should('exist')
  })

  it('can generate new recovery codes', () => {
    gotoSettingsPage()

    // Generate new codes and check to see if they are equal to the new ones
    cy.waitUntil(() => cy.findByText(/Recovery Codes/).should('not.be.disabled'))
    cy.findByText(/Recovery Codes/).click()
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
    gotoSettingsPage()

    // Set up authenticator app
    cy.waitUntil(() => cy.findByText(/Authenticator App/).should('not.be.disabled'))
    cy.findByText(/Authenticator App/).click()
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
      cy.task('generateOTP', cookie.value).then(token => {
        cy.get('[aria-label="Please enter your pin code"]').then(element => {
          cy.get(element[0]).type(token)
          cy.url().should('include', '/profile')
        })
      })
    })
  })

  it('login using a recovery code', () => {
    cy.findByText(/Enter the 6-digit code/iu).should('exist')
    cy.getCookie('cypressTestRecoveryCode').then(cookie => {
      cy.waitUntil(() => cy.findByRole('button', { name: /I lost access/iu }).should('not.be.disabled'))
      cy.findByRole('button', { name: /I lost access/iu }).click()
      cy.findByText(/Enter a recovery code/iu).should('be.visible').parent().findByRole('textbox', { placeholder: /recovery code/iu }).type(cookie.value)
      cy.findByRole('button', { name: /Submit/iu }).click()
      cy.url().should('include', '/profile')
    })
  })
})
