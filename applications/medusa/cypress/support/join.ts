import { generateEmailFromExistingUsername } from './generate'
import URL from 'url-parse'
import { getEmail, tailLogs } from './email'
import { parse } from 'node-html-parser'

const Tokens = require('csrf')
const sign = require('cookie-signature').sign
const Cookie = require('cookie')

const getGraphqlRequest = (): any => {
  const tokens = new Tokens()

  const secret = tokens.secretSync()

  const token = tokens.create(secret)

  const val = `s:${sign(secret, Cypress.env('SESSION_SECRET')) as string}`

  return {
    method: 'POST',
    url: '/api/graphql',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': token,
      Cookie: Cookie.serialize('_csrf', val)
    }
  }
}

const verifyToken = (token: string, secret: string): void => {
  const verifyMutation = `mutation VerifyTokenMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      validation
      authenticationToken {
        token
        verified
      }
    }
  }`

  // verify token
  cy
    .request(
      {
        ...getGraphqlRequest(),
        body: {
          query: verifyMutation,
          variables: {
            input: {
              token,
              secret
            }
          }
        }
      }
    ).then(({ body }) => {
      expect(body.data.verifyAuthenticationToken.validation).to.equal(null)
    })
}

const joinAndVerify = (email: string): void => {
  const joinMutation = `mutation JoinMutation($input: GrantAuthenticationTokenInput!) {
    grantAuthenticationToken(input: $input) {
      authenticationToken {
        token
      }
    }
  }`

  const startTimestamp = new Date().getTime()

  // first, run the join mutation, and save the token ID
  cy
    .request(
      {
        ...getGraphqlRequest(),
        body: {
          query: joinMutation,
          variables: {
            input: { email }
          }
        }
      }
    )
    .then(({ body }) => {
      expect(body.data.grantAuthenticationToken.authenticationToken).to.not.equal(null)
    })
    .its('body.data.grantAuthenticationToken.authenticationToken.token')
    .as('token')

  if (Cypress.env('TESTMAIL_API_KEY') as string === '') {
    // read email logs directly from carrier service if no testmail API key is set
    tailLogs((result) => {
      const obj = JSON.parse(result.stdout)

      expect(obj.html).to.not.equal(null)

      const root = parse(obj.html)

      const link = root?.querySelector('a')?.getAttribute('href')

      const url = new URL(link as string)
      const query = new URLSearchParams(url.query)

      const token = query.get('token') as string
      const secret = query.get('secret') as string

      verifyToken(token, secret)
    })

    return
  }

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
        const query = new URLSearchParams(url.query)

        const token = query.get('token') as string
        const secret = query.get('secret') as string

        verifyToken(token, secret)
      } catch (e) {
        const message = `Failed "${email}" due to ${e as string}`
        throw new Error(message)
      }
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

  cy.session(email, function () {
    joinAndVerify(email)
    cy.get('@token').then((token) => {
      cy
        .request(
          {
            ...getGraphqlRequest(),
            body: {
              query: grantMutation,
              variables: {
                input: { token }
              }
            },
            retryOnNetworkFailure: false,
            retryOnStatusCodeFailure: false,
            followRedirect: false
          }
        )
        .then(({ body }) => {
          expect(body.data.grantAccountAccessWithAuthenticationToken.account).to.not.equal(null)
        })
    })

    cy.getCookie('od.session').should('exist')
  })
})

Cypress.Commands.add('joinWithNewAccount', (username: string) => {
  const email = generateEmailFromExistingUsername(username)

  const registerMutation = `mutation RegisterMutation($input: CreateAccountWithAuthenticationTokenInput!) {
    createAccountWithAuthenticationToken(input: $input) {
      account {
        id
      }
    }
  }`

  cy.session(email, () => {
    joinAndVerify(email)

    cy.get('@token').then((token) => {
      cy
        .request(
          {
            ...getGraphqlRequest(),
            body: {
              query: registerMutation,
              variables: {
                input: {
                  token,
                  username
                }
              }
            },
            retryOnNetworkFailure: false
          }
        ).then(({ body }) => {
          expect(body.data.createAccountWithAuthenticationToken.account).to.not.equal(null)
        })
    })

    cy.getCookie('od.session').should('exist')
  })
})
