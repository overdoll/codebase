import { GraphQLClient } from '@testmail.app/graphql-request'

const testmailClient = new GraphQLClient(
  // API endpoint:
  'https://api.testmail.app/api/graphql',
  // Use your API key:
  { headers: { Authorization: `Bearer ${Cypress.env('TESTMAIL_API_KEY')}` } }
)

const startTimestamp = Date.now()

Cypress.Commands.add('displayLastEmail', (alias, email) => {
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
              namespace:"${Cypress.env('TESTMAIL_NAMESPACE')}"
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
  email: (name) => {
    return `${Cypress.env('TESTMAIL_NAMESPACE')}.${name}@inbox.testmail.app`
  },
  username: (prefix = '') => {
    return `${prefix}${Cypress._.random(0, 1e6)}`
  }
}
