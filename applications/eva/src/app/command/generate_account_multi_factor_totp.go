package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/multi_factor"
)

var (
	errFailedGenerateAccountMultiFactorTOTP = errors.New("failed to generate totp info")
)

type GenerateAccountMultiFactorTOTPHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewGenerateAccountMultiFactorTOTP(mr multi_factor.Repository, ar account.Repository) GenerateAccountMultiFactorTOTPHandler {
	return GenerateAccountMultiFactorTOTPHandler{mr: mr, ar: ar}
}

func (h GenerateAccountMultiFactorTOTPHandler) Handle(ctx context.Context, accountId string) (*multi_factor.TOTP, error) {

	usr, err := h.ar.GetAccountById(ctx, accountId)

	if err != nil {
		return nil, errFailedGenerateAccountMultiFactorTOTP
	}

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get recovery codes: %s", err)
		return nil, errFailedGenerateAccountMultiFactorTOTP
	}

	// create a new TOTP instance
	mfa, err := multi_factor.NewTOTP(codes, usr.Username())

	if err != nil {
		zap.S().Errorf("failed to generate a set of codes: %s", err)
		return nil, errFailedGenerateAccountMultiFactorTOTP
	}

	return mfa, nil
}
