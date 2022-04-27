// encrypt/decrypt functions - implemented with subtle

export default {

  /**
   * Encrypts text by given key
   * @returns String encrypted text, base64 encoded
   * @param text
   * @param masterKey
   * @param native
   */
  encrypt: async (text, masterKey, native = false): Promise<string> => {
    let cryptLib

    if (native) {
      cryptLib = crypto
    } else {
      cryptLib = require('crypto').webcrypto
    }

    const iv = cryptLib.getRandomValues(new Uint8Array(12))

    const pwUtf8 = new TextEncoder().encode(masterKey)

    const key = await cryptLib.subtle.importKey('raw', pwUtf8, 'AES-GCM', false, ['encrypt', 'decrypt'])

    const textUtf8 = new TextEncoder().encode(text)
    const encrypted = await cryptLib.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      textUtf8
    )

    const buf = Buffer.alloc(encrypted.byteLength)
    const view = new Uint8Array(encrypted)
    for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i]
    }

    return Buffer.concat([iv, buf]).toString(
      'hex'
    )
  },

  /**
   * Decrypts text by given key
   * @returns String decrypted (original) text
   * @param input
   * @param masterKey
   * @param native
   */
  decrypt: async (input, masterKey, native = false): Promise<string> => {
    let cryptLib

    if (native) {
      cryptLib = crypto
    } else {
      cryptLib = require('crypto').webcrypto
    }

    const inputBuffer = Buffer.from(input, 'hex')

    const iv = Buffer.allocUnsafe(12)
    const tag = Buffer.allocUnsafe(16)
    const data = Buffer.alloc(inputBuffer.length - 28, 0)

    inputBuffer.copy(iv, 0, 0, 12)
    inputBuffer.copy(tag, 0, inputBuffer.length - 16)
    inputBuffer.copy(data, 0, 12)

    const pwUtf8 = new TextEncoder().encode(masterKey)

    const key = await cryptLib.subtle.importKey('raw', pwUtf8, 'AES-GCM', false, ['encrypt', 'decrypt'])

    const decrypted = await cryptLib.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      Buffer.concat([data, tag])
    )

    return new TextDecoder('utf8').decode(decrypted)
  }
}
