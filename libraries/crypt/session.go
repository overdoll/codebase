package crypt

import (
	"os"
)

func DecryptSession(data string) (string, error) {
	return decrypt(data, os.Getenv("SESSION_SECRET"))
}

func EncryptSession(data string) (string, error) {
	return encrypt(data, os.Getenv("SESSION_SECRET"))
}
