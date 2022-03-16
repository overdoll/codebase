import { generateUsernameAndEmail } from '../../support/generate'
import ChanceJS from 'chance'
import { createClubWithName } from '../../support/artist_actions'
import { clickOnButton } from '../../support/user_actions'
import { gotoNextStep } from '../../support/flow_builder'

const chance = new ChanceJS()

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

describe('Club - Become Supporter', () => {
  const [artistUsername, artistEmail] = generateUsernameAndEmail()
  const [username, email] = generateUsernameAndEmail()

  const newPaymentMethodClub = chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })

  const savedPaymentMethodClub = chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })

  before(() => {
    cy.joinWithNewAccount(artistUsername, artistEmail)
    createClubWithName(newPaymentMethodClub)
    createClubWithName(savedPaymentMethodClub)
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

    // check if agreement blocking works
    clickOnButton(/Subscribe with CCBill/iu)
    cy.findByText(/You must agree to the guidelines/iu).should('be.visible')
    cy.findByText(/I have read and agree to the/iu).should('be.visible').parent().get('label').click({ multiple: true })

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
    cy.get('select[name="state"]').select(testCardDetails.state)
    cy.get('input[name="postalCode"]').type(testCardDetails.postalCode)
    cy.get('input[name="creditCardNum"]').type(testCardDetails.creditCardNum)
    cy.get('select[name="cardExpirationMonth"]').select(testCardDetails.cardExpirationMonth)
    cy.get('select[name="cardExpirationYear"]').select(testCardDetails.cardExpirationYear)
    cy.get('input[name="cvv2"]').type(testCardDetails.cvv2)

    cy.get('[id=placeOrder]').click()
    cy.url().should('include', Cypress.config().baseUrl as string)
    cy.document().then((doc) => {
      // @ts-expect-error
      cy.visit(`/ccbill-transaction-details/${doc.querySelector('meta[name="overdoll-ccbill-flexforms-payment-flow-token"]')?.content as string}`)
    })
    cy.findByText(/Verifying Transaction/iu, { timeout: 10000 }).should('be.visible')
    cy.findByText(/Transaction Approved/iu, { timeout: 40000 }).should('be.visible')
    cy.visit(`/${newPaymentMethodClub}`)
    cy.findByRole('button', { name: /My Subscriptions/iu }).should('be.visible')
  })

  it('enable two factor', () => {
    // generate recovery codes
    cy.visit('/configure/multi-factor/recovery-codes')
    cy.findByRole('button', { name: /Generate Recovery Codes/ }).click()
    cy.findByText(/Make sure you save these codes/iu).should('be.visible')

    // enable totp
    cy.visit('/configure/multi-factor/totp')
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

  it('become supporter with saved payment method', () => {
    cy.visit(`/${savedPaymentMethodClub}`)
    clickOnButton(/Become a Supporter/iu)
    cy.findByText(/How will you pay/iu).should('be.visible')

    // check selections
    cy.findByText(/Enter a new payment method/iu).should('not.be.disabled').click()
    clickOnButton('Next')
    cy.findByRole('button', { name: /Subscribe with CCBill/iu }).should('not.be.disabled')
    cy.get('button[aria-label="Close"]').click()
    cy.findByText(/Use a saved payment method/iu).should('not.be.disabled').click()
    clickOnButton('Next')
    cy.findByText(/Select a saved payment method/iu).should('be.visible')

    // use saved payment method to subscribe
    clickOnButton('Subscribe')
    cy.findByText(/You must agree to the guidelines/iu).should('be.visible')
    cy.findByText(/Please select a payment method/iu).should('be.visible')
    cy.findByText(`${testCardDetails.cardExpirationMonth}/${testCardDetails.cardExpirationYear}`).should('not.be.disabled').click()
    cy.findByText(/I have read and agree to the/iu).should('be.visible').parent().findByRole('checkbox').click({ force: true })
    clickOnButton('Subscribe')
    cy.findByText(/Verifying Transaction/iu, { timeout: 10000 }).should('be.visible')
    cy.findByText(/Transaction Approved/iu, { timeout: 40000 }).should('be.visible')
    cy.visit(`/${savedPaymentMethodClub}`)
    cy.findByRole('button', { name: /My Subscriptions/iu }).should('be.visible')
  })

  // cancel subscription
  // update payment method
  // remove saved payment method
})
