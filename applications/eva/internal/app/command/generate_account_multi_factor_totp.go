package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type GenerateAccountMultiFactorTOTP struct {
	// the account that is making this request
	Principal *principal.Principal
}

type GenerateAccountMultiFactorTOTPHandler struct {
	ar account.Repository
}

func NewGenerateAccountMultiFactorTOTP(ar account.Repository) GenerateAccountMultiFactorTOTPHandler {
	return GenerateAccountMultiFactorTOTPHandler{ar: ar}
}

func (h GenerateAccountMultiFactorTOTPHandler) Handle(ctx context.Context, cmd GenerateAccountMultiFactorTOTP) (*account.TOTP, error) {

	usr, err := h.ar.GetAccountById(ctx, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	codes, err := h.ar.GetAccountRecoveryCodes(ctx, cmd.Principal, usr.ID())

	if err != nil {
		return nil, err
	}

	// create a new TOTP instance
	mfa, err := account.NewTOTP(codes, usr.Username())

	if err != nil {
		return nil, err
	}

	return mfa, nil
}
