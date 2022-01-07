import ChanceJS from 'chance'

const chance = new ChanceJS()

export const generateUsername = (): string => {
  return chance.string({
    length: 12,
    pool: 'abcdefghijklmnopqrstuvwxyz0123456789'
  })
}

export const generateEmailFromExistingUsername = (username: string): string => {
  return getEmail(username)
}

export const generateEmail = (): string => {
  return getEmail(generateUsername())
}

export const generateUsernameAndEmail = (): [string, string] => {
  const name = generateUsername()

  const email = getEmail(name)

  return [name, email]
}

const getEmail = (name: string): string => {
  const testmailNamespace = Cypress.env('TESTMAIL_NAMESPACE') as string

  let email: string

  if (testmailNamespace === '') {
    email = `${name}@inbox.testmail.app`
  } else {
    email = `${Cypress.env('TESTMAIL_NAMESPACE') as string}.${name}@inbox.testmail.app`
  }

  return email
}
