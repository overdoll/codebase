package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type EnrollAccountMultiFactorTOTP struct {
	// the account that is making this request
	Principal *principal.Principal
	ID        string
	Code      string
}

type EnrollAccountMultiFactorTOTPHandler struct {
	ar account.Repository
}

func NewEnrollAccountMultiFactorTOTPHandler(ar account.Repository) EnrollAccountMultiFactorTOTPHandler {
	return EnrollAccountMultiFactorTOTPHandler{ar: ar}
}

func (h EnrollAccountMultiFactorTOTPHandler) Handle(ctx context.Context, cmd EnrollAccountMultiFactorTOTP) (*account.Account, error) {

	acc, err := h.ar.GetAccountById(ctx, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	codes, err := h.ar.GetAccountRecoveryCodes(ctx, cmd.Principal, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	// enroll TOTP
	mfa, err := account.EnrollTOTP(codes, cmd.ID, cmd.Code)

	if err != nil {
		return nil, err
	}

	// create the TOTP
	if err := h.ar.CreateAccountMultiFactorTOTP(ctx, cmd.Principal, acc, mfa); err != nil {
		return nil, err
	}

	return acc, nil
}
