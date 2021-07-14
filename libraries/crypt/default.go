package crypt

import (
	"os"
)

func Encrypt(data string) (string, error) {
	return encrypt(data, os.Getenv("APP_KEY"))
}

func Decrypt(data string) (string, error) {
	return decrypt(data, os.Getenv("APP_KEY"))
}
