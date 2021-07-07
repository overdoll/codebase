package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type ToggleAccountMultiFactorHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewToggleAccountMultiFactorHandler(mr multi_factor.Repository, ar account.Repository) ToggleAccountMultiFactorHandler {
	return ToggleAccountMultiFactorHandler{mr: mr, ar: ar}
}

var (
	ErrFailedToggleAccountMultiFactor = errors.New("failed to toggle multi factor")
)

func (h ToggleAccountMultiFactorHandler) Handle(ctx context.Context, accountId string) error {

	_, err := h.ar.UpdateAccount(ctx, accountId, func(a *account.Account) error {
		if !a.MultiFactorEnabled() {
			// ensure TOTP is set up first
			if _, err := h.mr.GetAccountMultiFactorTOTP(ctx, accountId); err != nil {

				// if not configured, dont log error
				if err == multi_factor.ErrTOTPNotConfigured {
					return ErrFailedToggleAccountMultiFactor
				}

				zap.S().Errorf("failed to get totp configuration: %s", err)
				return ErrFailedToggleAccountMultiFactor
			}

			return a.ToggleMultiFactor()
		}

		// if user toggled "off", delete TOTP settings
		if err := h.mr.DeleteAccountMultiFactorTOTP(ctx, accountId); err != nil {
			zap.S().Errorf("failed to delete totp: %s", err)
			return ErrFailedToggleAccountMultiFactor
		}

		return a.ToggleMultiFactor()
	})

	if err != nil {
		return err
	}

	return nil
}
