import { generateEmailFromExistingUsername } from './generate'
import { getEmail } from './email'
import { parse } from 'node-html-parser'
import { URL } from 'url'

const verify = (token: string, secret: string, cb: (token: string) => void): void => {
  const verifyMutation = `mutation VerifyTokenMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      authenticationToken {
        token
      }
    }
  }`

  // verify token
  cy
    .request(
      'POST',
      '/api/graphql',
      {
        query: verifyMutation,
        variables: {
          input: {
            token,
            secret
          }
        }
      }
    )
    .then((data) => {
      // @ts-expect-error
      const token = data?.verifyAuthenticationToken?.authenticationToken?.token
      cb(token)
    })
}

const joinAndVerify = (email: string, cb: (token: string) => void): void => {
  const joinMutation = `mutation JoinMutation($input: GrantAuthenticationTokenInput!) {
    grantAuthenticationToken(input: $input) {
      authenticationToken {
        token
      }
    }
  }`

  const startTimestamp = new Date().getTime()

  cy.session(email, () => {
    // first, run the join mutation, and save the token ID
    cy
      .request(
        'POST',
        '/api/graphql',
        {
          query: joinMutation,
          variables: { input: { email } }
        }
      )
      .then((data) => {
        if (Cypress.env('TESTMAIL_API_KEY') as string === '') {
          // read email logs directly from carrier service
          cy
            .exec('kubectl logs --tail 1 -l app.kubernetes.io/instance=carrier')
            .then(result => {
              const urlRegex = /(https?:\/\/[^ ]*)/
              const matches = result.stdout.match(urlRegex)

              if (matches == null) {
                throw new Error('misconfigured carrier')
              }

              const url = new URL(matches[1])

              const token = url.searchParams.get('token') as string
              const secret = url.searchParams.get('secret') as string

              verify(token, secret, cb)
            })
        } else {
          cy
            .wrap(null)
            .as(`Awaiting Verification Email ${email}`)
            .then({ timeout: 1000 * 60 * 5 }, async () => {
              try {
                const res = await getEmail(startTimestamp, email)
                const inbox = res.inbox

                expect(inbox.result).to.equal('success')
                expect(inbox.count).to.equal(1)

                const html = inbox.emails[0].html

                const root = parse(html)

                const link = root?.querySelector('a')?.getAttribute('href')

                const url = new URL(link as string)

                const token = url.searchParams.get('token') as string
                const secret = url.searchParams.get('secret') as string
                verify(token, secret, cb)
              } catch (e) {
                const message = `Failed "${email}" due to ${e as string}`
                throw new Error(message)
              }
            })
        }
      })
  })
}

Cypress.Commands.add('joinWithExistingAccount', (name: string) => {
  const email = generateEmailFromExistingUsername(name)

  const grantMutation = `mutation GrantMutation($input: GrantAccountAccessWithAuthenticationTokenInput!) {
    grantAccountAccessWithAuthenticationToken(input: $input) {
      account {
        id
      }
    }
  }`

  cy.session(email, () => {
    joinAndVerify(email, (token) => {
      cy
        .request(
          'POST',
          '/api/graphql',
          {
            query: grantMutation,
            variables: { input: { token } }
          }
        )
        .then(() => {
          cy.getCookie('od.session').should('exist')
        })
    })
  })
})

Cypress.Commands.add('joinWithNewAccount', (username: string) => {
  const email = generateEmailFromExistingUsername(username)

  const registerMutation = `mutation RegisterMutation($input: CreateAccountWithAuthenticationTokenInput!) {
    createAccountWithAuthenticationToken(input: $input) {
      validation
      account {
        id
      }
    }
  }`

  cy.session(email, () => {
    joinAndVerify(email, (token) => {
      cy
        .request(
          'POST',
          '/api/graphql',
          {
            query: registerMutation,
            variables: {
              input: {
                token,
                username
              }
            }
          }
        )
        .then(() => {
          cy.getCookie('od.session').should('exist')
        })
    })
  })
})
