import { generateUsernameAndEmail } from '../../support/generate'
import ChanceJS from 'chance'
import { createClubWithName } from '../../support/artist_actions'
import { clickOnButton } from '../../support/user_actions'

const chance = new ChanceJS()

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
      cy.stub(win, 'open').as('windowOpen')
    })
    clickOnButton(/Subscribe with CCBill/iu)
    cy.get('@windowOpen').should('have.been.calledOnce')
    clickOnButton(/Place your order/iu)
  })
})
