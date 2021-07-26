package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
)

var (
	errFailedEnrollAccountMultiFactorTOTP = errors.New("failed to enroll TOTP")
)

const (
	validationErrCodeNotValid = "code_not_valid"
)

type EnrollAccountMultiFactorTOTPHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewEnrollAccountMultiFactorTOTPHandler(mr multi_factor.Repository, ar account.Repository) EnrollAccountMultiFactorTOTPHandler {
	return EnrollAccountMultiFactorTOTPHandler{mr: mr, ar: ar}
}

func (h EnrollAccountMultiFactorTOTPHandler) Handle(ctx context.Context, accountId, secret, code string) (string, error) {

	acc, err := h.ar.GetAccountById(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get account: %s", err)
		return "", errFailedEnrollAccountMultiFactorTOTP
	}

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get recovery codes: %s", err)
		return "", errFailedEnrollAccountMultiFactorTOTP
	}

	// enroll TOTP
	mfa, err := multi_factor.EnrollTOTP(codes, secret, code)

	if err != nil {

		if err == multi_factor.ErrTOTPCodeInvalid {
			return validationErrCodeNotValid, nil
		}

		zap.S().Errorf("failed to enroll totp: %s", err)
		return "", errFailedEnrollAccountMultiFactorTOTP
	}

	// create the TOTP
	if err := h.mr.CreateAccountMultiFactorTOTP(ctx, accountId, mfa); err != nil {
		zap.S().Errorf("failed to enroll totp: %s", err)
		return "", errFailedEnrollAccountMultiFactorTOTP
	}

	// if user doesn't have 2FA enabled, enable it
	if !acc.MultiFactorEnabled() {
		if _, err := h.ar.UpdateAccount(ctx, accountId, func(a *account.Account) error {
			return a.ToggleMultiFactor()
		}); err != nil {
			zap.S().Errorf("failed to update account: %s", err)
			return "", errFailedEnrollAccountMultiFactorTOTP
		}
	}

	return "", nil
}
