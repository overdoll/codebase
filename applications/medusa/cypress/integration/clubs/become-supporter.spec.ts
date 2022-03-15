import { generateUsernameAndEmail } from '../../support/generate'
import ChanceJS from 'chance'
import { createClubWithName } from '../../support/artist_actions'
import { clickOnButton } from '../../support/user_actions'

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
    cy.findByText(/I have read and agree to the/iu).should('be.visible').parent().findByRole('checkbox').click({ force: true })
    cy.findByText(/Remember this payment method/iu).should('be.visible').parent().findByRole('checkbox').click({ force: true })

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

    /*
    let token = ''
    cy.window().then(win => {
      const listener = (e): void => {
        if (e.data.source === 'overdoll-ccbill-flexforms-payment-flow') {
          win.removeEventListener('message', listener)
          token = e.data.payload.token
        }
      }
      win.addEventListener('message', listener)
    })

     */

    /*

     */
    // cy.get('@windowOpen', { timeout: 20000 })
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
      cy.log(doc.querySelector('meta[name="overdoll-ccbill-flexforms-payment-flow-token"]').content as string)
    })
    /*
    cy.intercept({
      method: 'GET',
      hostname: (Cypress.config().baseUrl as string).replace(/(^\w+:|^)\/\//, '')
    })

     */
    /*
      .then(() => {
      cy.window().then(win => {
        const listener = (e): void => {
          cy.log(e)
          if (e.data.source === 'overdoll-ccbill-flexforms-payment-flow') {
            win.removeEventListener('message', listener)
            cy.visit(`/${e.data.payload.token as string}`)
          }
        }
        win.addEventListener('message', listener)
      })
    })

       */

    // cy.findByText(/CCBill is a designated payment processor/iu, { timeout: 20000 }).should('not.exist')
  })
})
