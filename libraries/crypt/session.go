package crypt

import (
	"os"
)

func DecryptSession(data string) string {
	return decrypt(data, os.Getenv("SESSION_SECRET"))
}

func EncryptSession(data string) string {
	return encrypt(data, os.Getenv("SESSION_SECRET"))
}
