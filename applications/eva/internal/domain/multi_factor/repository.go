package multi_factor

import (
	"context"
)

type Repository interface {
	CreateAccountRecoveryCodes(ctx context.Context, accountId string, recoveryCodes []*RecoveryCode) error
	GetAccountRecoveryCodes(ctx context.Context, accountId string) ([]*RecoveryCode, error)
	VerifyAccountRecoveryCode(ctx context.Context, accountId string, recoveryCode *RecoveryCode) error

	GetAccountMultiFactorTOTP(ctx context.Context, accountId string) (*TOTP, error)
	CreateAccountMultiFactorTOTP(ctx context.Context, accountId string, totp *TOTP) error
	DeleteAccountMultiFactorTOTP(ctx context.Context, accountId string) error
}
