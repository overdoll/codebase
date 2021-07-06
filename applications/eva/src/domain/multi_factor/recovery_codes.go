package multi_factor

import (
	"os"

	"overdoll/libraries/crypt"
)

type RecoveryCode struct {
	code string
}

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
