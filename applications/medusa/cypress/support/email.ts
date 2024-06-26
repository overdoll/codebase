import { GraphQLClient } from '@testmail.app/graphql-request'

const testmailClient = new GraphQLClient(
  // API endpoint:
  'https://api.testmail.app/api/graphql',
  // Use your API key:
  { headers: { Authorization: `Bearer ${Cypress.env('TESTMAIL_API_KEY') as string}` } }
)

interface InboxEmail {
  html: string
}

interface InboxEmailResponse {
  inbox: {
    result: string
    count: number
    emails: InboxEmail[]
  }
}

export const getEmail = async (startTimestamp: number, email: string): Promise<InboxEmailResponse> => {
  if (Cypress.env('TESTMAIL_API_KEY') as string === '') {
    throw new Error('please configure testmail API key')
  }

  // should only be a testmail email
  const parts = email.split('@')
  const main = parts[0].split('.')
  const tag = main[1]

  return await testmailClient.request<InboxEmailResponse>(
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
}

Cypress.Commands.add('displayLastEmail', (startTimestamp: number, alias: string, email: string) => {
  // if we aren't using testmail, read from logs
  if (Cypress.env('TESTMAIL_API_KEY') as string === '') {
    throw new Error('please configure testmail API key')
  }

  cy
    .wrap(null)
    .as(`Awaiting ${alias} - ${email}`)
    .then({ timeout: 1000 * 60 * 5 }, async () => {
      // read from CLI logs
      try {
        const res = await getEmail(startTimestamp, email)
        const inbox = res.inbox

        expect(inbox.result).to.equal('success')
        expect(inbox.count).to.equal(1)

        cy.document().invoke('write', inbox.emails[0].html)
      } catch (e) {
        const message = `Failed "${alias}" due to ${e as string}`
        throw new Error(message)
      }
    })
})
