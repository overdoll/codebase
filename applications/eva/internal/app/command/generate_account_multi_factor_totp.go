package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/principal"
)

type GenerateAccountMultiFactorTOTP struct {
	// the account that is making this request
	Principal *principal.Principal
}

type GenerateAccountMultiFactorTOTPHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewGenerateAccountMultiFactorTOTP(mr multi_factor.Repository, ar account.Repository) GenerateAccountMultiFactorTOTPHandler {
	return GenerateAccountMultiFactorTOTPHandler{mr: mr, ar: ar}
}

func (h GenerateAccountMultiFactorTOTPHandler) Handle(ctx context.Context, cmd GenerateAccountMultiFactorTOTP) (*multi_factor.TOTP, error) {

	usr, err := h.ar.GetAccountById(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, usr.ID())

	if err != nil {
		return nil, err
	}

	// create a new TOTP instance
	mfa, err := multi_factor.NewTOTP(codes, usr.Username())

	if err != nil {
		return nil, err
	}

	return mfa, nil
}
