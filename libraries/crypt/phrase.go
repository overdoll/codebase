package crypt

func EncryptWithCustomPhrase(data, phrase string) (string, error) {
	return encrypt(data, phrase)
}

func DecryptWithCustomPhrase(data, phrase string) (string, error) {
	return decrypt(data, phrase)
}
