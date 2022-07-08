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

    const buf = new Uint8Array(encrypted.byteLength)
    const view = new Uint8Array(encrypted)
    for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i]
    }

    return bytesToHex(new Uint8Array([...iv, ...buf]))
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

    const inputBuffer = hexToBytes(input)

    const iv = new Uint8Array(12)
    const tag = new Uint8Array(16)
    const data = (new Uint8Array(inputBuffer.length - 28)).fill(0)

    Uint8Array.prototype.set.call(
      iv,
      inputBuffer.subarray(0, 12),
      0
    )

    Uint8Array.prototype.set.call(
      tag,
      inputBuffer.subarray(inputBuffer.length - 16, inputBuffer.length),
      0
    )

    Uint8Array.prototype.set.call(
      data,
      inputBuffer.subarray(12, inputBuffer.length - 16),
      0
    )

    const pwUtf8 = new TextEncoder().encode(masterKey)

    const key = await cryptLib.subtle.importKey('raw', pwUtf8, 'AES-GCM', false, ['encrypt', 'decrypt'])

    const decrypted = await cryptLib.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      new Uint8Array([...data, ...tag])
    )

    return new TextDecoder('utf8').decode(decrypted)
  }
}

const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(
    bytes,
    byte => byte.toString(16).padStart(2, '0')
  ).join('')
}

const hexToBytes = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i !== bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16)
  }
  return bytes
}
