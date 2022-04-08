import { generateEmailFromExistingUsername } from './generate'
import URL from 'url-parse'
import { getEmail } from './email'
import { parse } from 'node-html-parser'
import _crypto from 'crypto'
import Cookie from 'cookie'

const getGraphqlRequest = (): any => {
  const token = _crypto.randomBytes(64).toString('hex')

  const iv = _crypto.randomBytes(12)
  const cipher = _crypto.createCipheriv('aes-256-gcm', Cypress.env('SECURITY_SECRET'), iv)
  const encrypted = Buffer.concat([iv, cipher.update(token), cipher.final(), cipher.getAuthTag()]).toString(
    'hex'
  )

  return {
    method: 'POST',
    url: '/api/graphql',
    headers: {
      'Content-Type': 'application/json',
      'X-overdoll-Security': token,
      Cookie: Cookie.serialize('od.security', encrypted)
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

  let startTimestamp

  // TODO fix flakiness with timestamp - the subtraction is a temp solution

  cy
    .wrap(null)
    .then(() => {
      startTimestamp = Date.now() - 5000
    })

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
