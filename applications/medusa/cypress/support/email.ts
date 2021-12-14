import { GraphQLClient } from '@testmail.app/graphql-request'
import ChanceJS from 'chance'

const testmailClient = new GraphQLClient(
  // API endpoint:
  'https://api.testmail.app/api/graphql',
  // Use your API key:
  { headers: { Authorization: `Bearer ${Cypress.env('TESTMAIL_API_KEY') as string}` } }
)

const startTimestamp = Date.now()

const chance = new ChanceJS()

Cypress.Commands.add('displayLastEmail', (alias: string, email: string) => {
  // grab "tag" from email

  // should only be a testmail email

  const parts = email.split('@')
  const main = parts[0].split('.')
  const tag = main[1]

  cy
    .wrap(null)
    .as(`Awaiting ${alias} - ${email}`)
    .then({ timeout: 1000 * 60 * 5 }, async () => {
      try {
        const res = await testmailClient.request(
          `{
            inbox (
              namespace:"${Cypress.env('TESTMAIL_NAMESPACE') as string}"
              tag:"${tag}"
              timestamp_from:${startTimestamp}
              livequery:true
            ) {
              result
              count
              emails {
                subject
                html
                text
              }
            }
          }`
        )

        const inbox = res.inbox

        expect(inbox.result).to.equal('success')
        expect(inbox.count).to.equal(1)

        cy.document().invoke('write', inbox.emails[0].html)
      } catch (e) {
        const message = `Failed "${alias}" due to ${e}`
        throw new Error(message)
      }
    })
})

cy.account = {
  email: (name: string) => `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${name}@inbox.testmail.app`,
  username: (prefix = '') => `${prefix}${
    chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })
  }`
}
