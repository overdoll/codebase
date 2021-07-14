// https://gist.github.com/AndiDittrich/4629e7db04819244e843
// SPDX-License-Identifier: MPL-2.0

// AES Encryption/Decryption with AES-256-GCM using random Initialization Vector + Salt
// ----------------------------------------------------------------------------------------
// the encrypted datablock is base64 encoded for easy data exchange.
// if you have the option to store data binary save consider to remove the encoding to reduce storage size
// ----------------------------------------------------------------------------------------
// format of encrypted data - used by this example. not an official format
//
// +--------------------+-----------------------+----------------+----------------+
// | SALT               | Initialization Vector | Auth Tag       | Payload        |
// | Used to derive key | AES GCM XOR Init      | Data Integrity | Encrypted Data |
// | 64 Bytes, random   | 16 Bytes, random      | 16 Bytes       | (N-96) Bytes   |
// +--------------------+-----------------------+----------------+----------------+
//
// ----------------------------------------------------------------------------------------
// Input/Output Vars
//
// MASTERKEY: the key used for encryption/decryption.
//            it has to be cryptographic safe - this means randomBytes or derived by pbkdf2 (for example)
// TEXT:      data (utf8 string) which should be encoded. modify the code to use Buffer for binary data!
// ENCDATA:   encrypted data as base64 string (format mentioned on top)

// load the build-in crypto functions
import _crypto from 'crypto'

// encrypt/decrypt functions
export default {

  /**
   * Encrypts text by given key
   * @returns String encrypted text, base64 encoded
   * @param text
   * @param masterkey
   */
  encrypt: (text, masterkey) => {
    // random initialization vector
    const iv = _crypto.randomBytes(12)

    // AES 256 GCM Mode
    const cipher = _crypto.createCipheriv('aes-256-gcm', masterkey, iv)

    // generate output
    return Buffer.concat([iv, cipher.update(text), cipher.final(), cipher.getAuthTag()]).toString(
      'hex'
    )
  },

  /**
   * Decrypts text by given key
   * @param String base64 encoded input data
   * @param Buffer masterkey
   * @returns String decrypted (original) text
   */
  decrypt: (input, masterkey) => {
    // base64 decoding
    const inputBuffer = Buffer.from(input, 'hex')
    const iv = Buffer.allocUnsafe(12)
    const tag = Buffer.allocUnsafe(16)
    const data = Buffer.alloc(inputBuffer.length - 28, 0)

    inputBuffer.copy(iv, 0, 0, 12)
    inputBuffer.copy(tag, 0, inputBuffer.length - 16)
    inputBuffer.copy(data, 0, 12)

    // AES 256 GCM Mode
    const decipher = _crypto.createDecipheriv('aes-256-gcm', masterkey, iv)
    decipher.setAuthTag(tag)

    // encrypt the given text
    return decipher.update(data, null, 'utf8') + decipher.final('utf8')
  }
}
