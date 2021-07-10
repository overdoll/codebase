package crypt

import (
	"os"
)

func Encrypt(data string) string {
	return encrypt(data, os.Getenv("APP_KEY"))
}

func Decrypt(data string) string {
	return decrypt(data, os.Getenv("APP_KEY"))
}
