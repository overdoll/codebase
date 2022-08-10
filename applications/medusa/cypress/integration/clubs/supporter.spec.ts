import { generateUsernameAndEmail } from '../../support/generate'
import { clickOnButton, clickOnPanel, clickOnTab, clickOnToggle } from '../../support/user_actions'

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

const newPaymentMethodClub = 'TestClub'
const newPaymentMethodClubName = 'Test Club'

const savedPaymentMethodClub = 'SecondTestClub'

Cypress.config('defaultCommandTimeout', 10000)

describe('Supporter', () => {
  it('become supporter', () => {
    /**
     * Set up supporter account
     */
    const [username] = generateUsernameAndEmail()
    cy.joinWithNewAccount(username)

    /**
     * Become supporter using new payment method
     */
    cy.visit(`/${newPaymentMethodClub}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/Your contribution directly supports/iu).should('be.visible')
    // change currency
    cy.findByText('USD').should('not.be.disabled').parent().get('select').select('CAD')
    cy.findByText(/CA[$]/u).should('be.visible')
    cy.findByText('CAD').should('not.be.disabled').parent().get('select').select('USD')

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
    cy.findByText(/CCBill is a designated payment processor/iu).should('exist')

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
    cy.url().should('include', '/payment-flow')
    cy.document().then((doc) => {
      // @ts-expect-error
      cy.visit(`/${newPaymentMethodClub}?token=${doc.querySelector('meta[name="overdoll-ccbill-flexforms-payment-flow-token"]')?.content as string}`)
    })
    cy.findByText(/Transaction Approved/iu, { timeout: 60000 }).should('be.visible')
    clickOnButton('Close')
    clickOnButton(/Manage Subscription/i)
    cy.findByText('Subscription Details').should('be.visible')

    /**
     * Enable two factor so you can support using saved payment method
     */
    cy.visit(`/${savedPaymentMethodClub}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/You must enable two-factor authentication/iu).should('be.visible')
    cy.visit('/settings/billing/payment-methods')
    cy.findByText(/You must enable two-factor authentication/iu).should('be.visible')
    cy.enableTwoFactor()

    /**
     * Cancel subscription, update payment method modal
     */
    cy.visit('/settings/billing')
    clickOnPanel('My Subscriptions')
    cy.url().should('include', '/settings/billing/subscriptions')
    cy.findByText(newPaymentMethodClubName).should('be.visible').click({ force: true })
    cy.findByText('Subscription Details').should('be.visible')
    clickOnButton(/Manage Subscription/iu)

    // update payment method modal
    cy.findByText('Update Payment Method').should('be.visible').click({ force: true })
    cy.findByText(/Your payment method cannot be directly updated through our platform/iu).should('be.visible').click()
    cy.get('button[aria-label="Close"]').click({ force: true })

    // cancel subscription
    clickOnButton(/Manage Subscription/iu)
    cy.findByText('Cancel Subscription').should('be.visible').click({ force: true })
    cy.findByText(/Cancellation Reason/iu).should('not.be.disabled').click({ force: true })
    clickOnButton('Cancel Subscription')
    cy.findByText(newPaymentMethodClubName).should('be.visible')
    cy.findByText(/Benefits expire in/iu).should('be.visible')

    /**
     * Become supporter using saved payment method
     */
    cy.visit(`/${savedPaymentMethodClub}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/How will you pay/iu).should('be.visible')

    // check selections
    cy.findByText(/Enter a new payment method/iu).should('not.be.disabled').click({ force: true })
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
    cy.findByText(/Use a saved payment method/iu).should('not.be.disabled').click({ force: true })
    clickOnButton('Next')
    cy.findByText(/Select a saved payment method/iu).should('be.visible')

    // // use saved payment method to subscribe
    // cy.findByText(`${testCardDetails.cardExpirationMonth}/${testCardDetails.cardExpirationYear}`).should('not.be.disabled').click({ force: true })
    // clickOnToggle(/I have read and agree to the/iu, true)
    // clickOnButton('Subscribe')
    // cy.findByText(/Transaction Approved/iu, { timeout: 60000 }).should('be.visible')
    // clickOnButton('Close')
    // cy.findByRole('button', { name: /Manage Subscription/iu }).should('be.visible')

    /**
     * Remove saved payment method
     */
    cy.visit('/settings/billing')
    clickOnPanel('Payment Methods')
    cy.url().should('include', '/settings/billing/payment-methods')

    cy.findByText(`${testCardDetails.cardExpirationMonth}/${testCardDetails.cardExpirationYear}`).should('be.visible')
    cy.get('button[aria-label="Open Menu"]').click({ force: true })
    cy.findByText(/Delete Payment Method/iu).should('be.visible').click({ force: true })
    clickOnButton('Delete Saved Payment Method')
    cy.findByText(/No payment methods found/iu).should('be.visible')

    /**
     * Check that you can't delete account with active subscriptions
     */
    cy.visit('/settings/profile')
    clickOnPanel('Delete Account')
    cy.url().should('include', '/settings/profile/delete-account')
    cy.findByText(/You cannot delete your account until you cancel your subscriptions/iu).should('be.visible')

    /**
     * Disable two factor so you can switch between accounts
     */
    cy.visit('/settings/security')
    cy.waitUntil(() => cy.findByRole('button', { name: /Disable/iu }).should('not.be.disabled'))
    clickOnButton(/Disable/iu)
    clickOnButton(/Disable Two-factor/iu)
    cy.findByText(/Disable Two-Factor Authentication/iu).should('not.exist')

    /**
     * Issue refund on transaction for account as staff, check metrics, check refunds, issue payout
     */
    cy.joinWithExistingAccount('0eclipse')

    // go to club payments
    cy.visit(`/club/${savedPaymentMethodClub}/revenue`)
    clickOnButton('View Payments')
    cy.findByText(/Your club's Payments are the detailed breakdown/iu).should('be.visible')
    cy.findAllByText('PENDING').first().should('be.visible').click({ force: true })
    cy.findByText(/Fee Breakdown/iu).should('be.visible')

    // refund transaction
    cy.visit(`/staff/account/${username}`)
    clickOnTab('Transactions')
    cy.findByText('Transactions').should('be.visible')
    cy.findAllByText('PAYMENT').first().should('be.visible').click({ force: true })
    cy.findByText('CCBill Transaction ID').should('be.visible')
    clickOnButton(/Manage Transaction/iu)
    cy.findByText('Refund Transaction').should('be.visible').click({ force: true })
    cy.findByText('Select refund amount').parent().should('not.be.disabled').select('$6.99 - Maximum Amount')
    clickOnButton('Refund Transaction')
    cy.findByText(/Successfully refunded/iu).should('be.visible')

    cy.visit(`/club/${savedPaymentMethodClub}/revenue`)
    // see transaction metrics
    cy.findByText('Transaction Metrics').should('be.visible')

    // go to refunded transaction
    clickOnButton('View Payments')
    cy.findAllByText('PENDING').first().should('be.visible').click({ force: true })
    cy.findByText(/Deduction Breakdown/iu).should('be.visible')
    /*
        // issue payout
        cy.visit(`/staff/club/${newPaymentMethodClub}`)
        clickOnTab('Payouts')
        clickOnButton('Initiate Payout')
        clickOnButton('Confirm Initiate Payout')
        cy.findByText(/Successfully initiated payout/iu).should('be.visible')

        // TODO payout cannot be seen because transactions are still pending
        cy.visit(`/club/${newPaymentMethodClub}/revenue`)
        cy.findByText('Deposit Date').should('be.visible')
    */

    /**
     * See refunded transaction as account
     */
    cy.joinWithNewAccount(username)

    // expired subscription from refund

    // TODO expired subscription doesn't always show
    /**
     cy.visit('/settings/billing/subscriptions')
     cy.findByText('Expired').should('be.visible').click({ force: true })
     cy.findByText(savedPaymentMethodClubName).should('be.visible')
     */

    // refunded transaction
    cy.visit('/settings/billing')
    cy.findByText('Transaction History').should('be.visible').click({ force: true })
    cy.url().should('include', '/settings/billing/transactions')
    cy.findByText(newPaymentMethodClubName).should('be.visible')
    cy.waitUntil(() => cy.findAllByText(/refunded to this payment/iu).should('be.visible'))
  })
})
