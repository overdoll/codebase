package multi_factor

import (
	"context"
)

type Repository interface {
	CreateAccountRecoveryCodes(context.Context, string, []*RecoveryCode) error
	GetAccountRecoveryCodes(context.Context, string) ([]*RecoveryCode, error)
	RedeemAccountRecoveryCode(context.Context, string, *RecoveryCode) error

	GetAccountMultiFactorTOTP(context.Context, string) (*TOTP, error)
	CreateAccountMultiFactorTOTP(context.Context, string, *TOTP) error
	UpdateAccountMultiFactorTOTP(context.Context, string, *TOTP) error
	DeleteAccountMultiFactorTOTP(context.Context, string) error
}
