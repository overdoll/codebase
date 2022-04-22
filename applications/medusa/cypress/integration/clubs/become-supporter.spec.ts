import { generateClubName, generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnToggle } from '../../support/user_actions'
import { gotoNextStep } from '../../support/flow_builder'

const testCardDetails = {
  firstName: 'Test',
  lastName: 'User',
  address: '123 Test Street',
  city: 'City',
  country: 'CA',
  state: 'ON',
  postalCode: 'M2N 6S3',
  creditCardNum: '4111111111111111',
  cardExpirationMonth: '04',
  cardExpirationYear: '2030',
  cvv2: '301'
}

Cypress.config('defaultCommandTimeout', 10000)

describe('Club - Become Supporter', () => {
  const [artistUsername, artistEmail] = generateUsernameAndEmail()
  const [username, email] = generateUsernameAndEmail()

  const newPaymentMethodClub = generateClubName()

  const savedPaymentMethodClub = generateClubName()

  before(() => {
    cy.joinWithNewAccount(artistUsername, artistEmail)
    cy.createClub(newPaymentMethodClub)
    cy.createClub(savedPaymentMethodClub)
  })

  beforeEach(() => {
    cy.joinWithNewAccount(username, email)
  })

  it('become supporter with new payment method', () => {
    cy.visit(`/${newPaymentMethodClub}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/Your contribution directly supports/iu).should('be.visible')

    // change currency
    cy.findByText(/Preferred Billing Currency/iu).should('exist').parent().get('select').select('CAD')
    cy.findByText(/CA[$]/u).should('be.visible')
    cy.findByText(/Preferred Billing Currency/iu).should('exist').parent().get('select').select('USD')

    // check if agreement blocking works
    clickOnButton(/Subscribe with CCBill/iu)
    cy.findByText(/You must agree to the guidelines/iu).should('be.visible')
    clickOnToggle(/I have read and agree to the/iu, true)
    clickOnToggle(/Remember this payment method/iu, true)

    // fill out payment details in new window
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake(url => {
        // @ts-expect-error
        return win.open.wrappedMethod.call(win, url, '_self')
        // @ts-expect-error
      }).as('windowOpen')
    })
    clickOnButton(/Subscribe with CCBill/iu)
    cy.findByText(/CCBill is a designated payment processor/iu, { timeout: 20000 }).should('be.visible')

    // fill out billing details
    cy.get('input[name="firstName"]').type(testCardDetails.firstName)
    cy.get('input[name="lastName"]').type(testCardDetails.lastName)
    cy.get('input[name="address"]').type(testCardDetails.address)
    cy.get('input[name="city"]').type(testCardDetails.city)
    cy.get('select[name="country"]').select(testCardDetails.country)
    cy.get('input[name="postalCode"]').type(testCardDetails.postalCode)
    cy.get('select[name="state"]').select(testCardDetails.state)
    cy.get('input[name="creditCardNum"]').type(testCardDetails.creditCardNum)
    cy.get('select[name="cardExpirationMonth"]').select(testCardDetails.cardExpirationMonth)
    cy.get('select[name="cardExpirationYear"]').select(testCardDetails.cardExpirationYear)
    cy.get('input[name="cvv2"]').type(testCardDetails.cvv2)

    cy.get('[id=placeOrder]').click()
    cy.url().should('include', Cypress.config().baseUrl as string)
    cy.document().then((doc) => {
      // @ts-expect-error
      cy.visit(`/${newPaymentMethodClub}?token=${doc.querySelector('meta[name="overdoll-ccbill-flexforms-payment-flow-token"]')?.content as string}`)
    })
    cy.findByText(/Transaction Approved/iu, { timeout: 60000 }).should('be.visible')
    clickOnButton('Close')
    cy.findByRole('button', { name: /My Subscriptions/iu }).should('be.visible')
  })

  it('enable two factor', () => {
    // check that they are restricted by two factor
    cy.visit(`/${savedPaymentMethodClub}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/You must enable two-factor authentication/iu).should('be.visible')
    cy.visit('/settings/billing/payment-methods')
    cy.findByText(/You must enable two-factor authentication/iu).should('be.visible')

    // generate recovery codes
    cy.visit('/settings/security/recovery-codes')
    cy.findByRole('button', { name: /Generate Recovery Codes/ }).click()
    cy.findByText(/Make sure you save these codes/iu).should('be.visible')

    // enable totp
    cy.visit('/settings/security/totp')
    gotoNextStep()
    cy.get('[aria-label="Copy"]').find('code').invoke('text').then(secret => {
      // use a plugin to generate a one time password using the secret
      cy.task('generateOTP', secret).then(token => {
        gotoNextStep()
        cy.get('form').findByPlaceholderText('123456').type(token as string)
        cy.findByRole('button', { name: /Activate/iu }).click()
        cy.findByText(/Two-factor setup complete/iu).should('exist')
      })
    })
  })

  it('cancel subscription and update payment method', () => {
    cy.visit('/settings/billing')
    cy.findByText('My Subscriptions').should('be.visible').click()
    cy.url().should('include', '/settings/billing/subscriptions')

    cy.findByText(newPaymentMethodClub).should('be.visible').click()
    cy.findByText('Subscription Details').should('be.visible')
    clickOnButton(/Manage Subscription/iu)

    // update payment method modal
    cy.findByText('Update Payment Method').should('be.visible').click()
    cy.findByText(/Your payment method cannot be directly updated through our platform/iu).should('be.visible').click()
    cy.get('button[aria-label="Close"]').click({ force: true })

    // cancel subscription
    clickOnButton(/Manage Subscription/iu)
    cy.findByText('Cancel Subscription').should('be.visible').click()
    cy.findByText(/Cancellation Reason/iu).should('not.be.disabled').click({ force: true })
    clickOnButton('Cancel Subscription')
    cy.findByText(newPaymentMethodClub).should('be.visible')
    cy.reload()
    cy.findByText(newPaymentMethodClub).should('be.visible').click()
    cy.findByText(/Benefits expire in/iu).should('be.visible')
  })

  it('become supporter with saved payment method', () => {
    cy.visit(`/${savedPaymentMethodClub}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/How will you pay/iu).should('be.visible')

    // check selections
    cy.findByText(/Enter a new payment method/iu).should('not.be.disabled').click()
    clickOnButton('Next')
    cy.findByRole('button', { name: /Subscribe with CCBill/iu }).should('not.be.disabled')
    cy.findByText(/I have read and agree to the/iu).should('be.visible').parent().get('label').click({ multiple: true })
    // stub the window so it doesn't appear
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })
    clickOnButton(/Subscribe with CCBill/iu)
    cy.findByText(/Enter your payment details in the new window/iu).should('be.visible')
    clickOnButton(/Cancel/iu)
    cy.findByText(/Your contribution directly supports/iu).should('be.visible')

    cy.get('button[aria-label="Close"]').click()
    cy.findByText(/Use a saved payment method/iu).should('not.be.disabled').click()
    clickOnButton('Next')
    cy.findByText(/Select a saved payment method/iu).should('be.visible')

    // use saved payment method to subscribe
    clickOnButton('Subscribe')
    cy.findByText(/Please select a payment method/iu).should('exist')
    cy.findByText(`${testCardDetails.cardExpirationMonth}/${testCardDetails.cardExpirationYear}`).should('not.be.disabled').click()
    clickOnToggle(/I have read and agree to the/iu, true)
    clickOnButton('Subscribe')
    cy.findByText(/Transaction Approved/iu, { timeout: 60000 }).should('be.visible')
    clickOnButton('Close')
    cy.findByRole('button', { name: /My Subscriptions/iu }).should('be.visible')
  })

  it('remove saved payment method', () => {
    cy.visit('/settings/billing')
    cy.findByText('Payment Methods').should('be.visible').click()
    cy.url().should('include', '/settings/billing/payment-methods')

    cy.findByText(`${testCardDetails.cardExpirationMonth}/${testCardDetails.cardExpirationYear}`).should('be.visible')
    cy.get('button[aria-label="Open Menu"]').click()
    cy.findByText(/Delete Payment Method/iu).should('be.visible').click()
    clickOnButton('Delete Saved Payment Method')
    cy.findByText(/No payment methods found/iu).should('be.visible')
  })

  it('view transactions', () => {
    cy.visit('/settings/billing')
    cy.findByText('Transaction History').should('be.visible').click()
    cy.url().should('include', '/settings/billing/transactions')

    cy.findByText(newPaymentMethodClub).should('be.visible')
  })
})
