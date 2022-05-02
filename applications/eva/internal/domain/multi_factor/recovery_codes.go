package multi_factor

import (
	"crypto/rand"

	"overdoll/libraries/principal"
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
	return c.code
}

func UnmarshalRecoveryCodeFromDatabase(code string) *RecoveryCode {
	return &RecoveryCode{
		code: code,
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

func CanCreateRecoveryCodesForAccount(requester *principal.Principal, accountId string) error {

	if requester.IsDeleting() {
		return principal.ErrNotAuthorized
	}

	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}

func CanViewRecoveryCodesForAccount(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
