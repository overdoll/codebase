package multi_factor

import (
	"context"

	"overdoll/libraries/principal"
)

type Repository interface {
	CreateAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string, recoveryCodes []*RecoveryCode) error
	GetAccountRecoveryCodes(ctx context.Context, requester *principal.Principal, accountId string) ([]*RecoveryCode, error)
	VerifyAccountRecoveryCode(ctx context.Context, requester *principal.Principal, accountId string, recoveryCode *RecoveryCode) error

	GetAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, accountId string) (*TOTP, error)
	CreateAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, accountId string, totp *TOTP) error
	DeleteAccountMultiFactorTOTP(ctx context.Context, requester *principal.Principal, accountId string) error
}
