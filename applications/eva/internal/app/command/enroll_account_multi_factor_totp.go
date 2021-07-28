package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/principal"
)

type EnrollAccountMultiFactorTOTP struct {
	// the account that is making this request
	Principal *principal.Principal
	Secret    string
	Code      string
}

type EnrollAccountMultiFactorTOTPHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewEnrollAccountMultiFactorTOTPHandler(mr multi_factor.Repository, ar account.Repository) EnrollAccountMultiFactorTOTPHandler {
	return EnrollAccountMultiFactorTOTPHandler{mr: mr, ar: ar}
}

func (h EnrollAccountMultiFactorTOTPHandler) Handle(ctx context.Context, cmd EnrollAccountMultiFactorTOTP) error {

	acc, err := h.ar.GetAccountById(ctx, cmd.Principal.AccountId())

	if err != nil {
		return err
	}

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, acc.ID())

	if err != nil {
		return err
	}

	// enroll TOTP
	mfa, err := multi_factor.EnrollTOTP(codes, cmd.Secret, cmd.Code)

	if err != nil {
		return err
	}

	// create the TOTP
	if err := h.mr.CreateAccountMultiFactorTOTP(ctx, acc.ID(), mfa); err != nil {
		return err
	}

	// if user doesn't have 2FA enabled, enable it
	if !acc.MultiFactorEnabled() {
		if _, err := h.ar.UpdateAccount(ctx, acc.ID(), func(a *account.Account) error {
			return a.ToggleMultiFactor()
		}); err != nil {
			return err
		}
	}

	return nil
}
