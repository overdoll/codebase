package support

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"errors"
)

// ParseRsaPrivateKeyFromPemEnvFile parse PEM file from env file, which is supposed to use a specific format
func ParseRsaPrivateKeyFromPemEnvFile(privPEM string) (*rsa.PrivateKey, error) {

	res, err := base64.StdEncoding.DecodeString(privPEM)

	if err != nil {
		return nil, err
	}

	block, _ := pem.Decode(res)
	if block == nil {
		return nil, errors.New("failed to parse PEM block containing the key")
	}

	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}

	return priv, nil
}
