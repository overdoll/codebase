package crypt

func DecryptWithCustomPassphrase(data, passphrase string) (string, error) {
	return decrypt(data, passphrase)
}
