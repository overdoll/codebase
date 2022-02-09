import { generateUsernameAndEmail } from '../../support/generate'
import ChanceJS from 'chance'

const chance = new ChanceJS()

describe('Club - Create a Post', () => {
  const [username, email] = generateUsernameAndEmail()

  const clubName = chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })

  before(() => {
    cy.joinWithNewAccount(username, email)
  })

  beforeEach(() => {
    cy.joinWithNewAccount(username, email)
  })

  it('can create club and go to post upload page', () => {

  })
})
