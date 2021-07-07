package multi_factor

import (
	"math/rand"
	"os"

	"overdoll/libraries/crypt"
)

type RecoveryCode struct {
	code string
}

// Characters that are allowed to show up in our random string
const allowedCharacters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// how long is each code
const codeLength = 8

// how many we generate initially as our "set"
const setLength = 16

func NewRecoveryCode(code string) *RecoveryCode {
	return &RecoveryCode{code: code}
}

func (c *RecoveryCode) Code() string {
	return string(crypt.Encrypt([]byte(c.code), os.Getenv("APP_KEY")))
}

func (c *RecoveryCode) RawCode() string {
	return c.code
}

func UnmarshalRecoveryCodeFromDatabase(code string) *RecoveryCode {
	return &RecoveryCode{
		code: string(crypt.Decrypt([]byte(code), os.Getenv("APP_KEY"))),
	}
}

// Random string is used as our seed for recovery codes
func randomString() (string, error) {
	bytes := make([]byte, codeLength)

	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}

	for i, b := range bytes {
		bytes[i] = allowedCharacters[b%byte(len(allowedCharacters))]
	}

	return string(bytes), nil
}

// generate a set of recovery codes (for initial setups and generating new pairs)
func GenerateRecoveryCodeSet() ([]*RecoveryCode, error) {
	var recoveryCodes []*RecoveryCode

	for i := 0; i < setLength; i++ {
		code, err := randomString()

		if err != nil {
			return nil, err
		}

		recoveryCodes = append(recoveryCodes, NewRecoveryCode(code))
	}

	return recoveryCodes, nil
}
