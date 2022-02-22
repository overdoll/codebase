package support

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"strings"
)

// ParseRsaPrivateKeyFromPemEnvFile parse PEM file from env file, which is supposed to use a specific format
func ParseRsaPrivateKeyFromPemEnvFile(privPEM string) (*rsa.PrivateKey, error) {

	pemPrivateKey := strings.ReplaceAll(privPEM, " ", "\n")

	pemPrivateKey = strings.ReplaceAll(pemPrivateKey, "_", " ")

	block, _ := pem.Decode([]byte(pemPrivateKey))
	if block == nil {
		return nil, errors.New("failed to parse PEM block containing the key")
	}

	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}

	return priv, nil
}
