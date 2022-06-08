package crypt

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"io"
	"overdoll/libraries/errors"
)

func encrypt(data, passphrase string) (string, error) {
	block, err := aes.NewCipher([]byte(passphrase))
	if err != nil {
		return "", errors.Wrap(err, "failed to create new cipher")
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", errors.Wrap(err, "failed to create new gcm block")
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return "", errors.Wrap(err, "failed to create new gcm block")
	}
	ciphertext := gcm.Seal(nonce, nonce, []byte(data), nil)
	return hex.EncodeToString(ciphertext), nil
}

func decrypt(data, passphrase string) (string, error) {
	newData, err := hex.DecodeString(data)
	if err != nil {
		return "", errors.Wrap(err, "failed to decode hex string")
	}
	block, err := aes.NewCipher([]byte(passphrase))
	if err != nil {
		return "", errors.Wrap(err, "failed to create new cipher")
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", errors.Wrap(err, "failed to create new gcm block")
	}
	nonceSize := gcm.NonceSize()
	nonce, ciphertext := newData[:nonceSize], newData[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", errors.Wrap(err, "failed to decrypt aes-gcm")
	}
	return string(plaintext), nil
}
