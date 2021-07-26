package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
)

var (
	errFailedDisableAccountMultiFactor = errors.New("failed to disable multi factor")
)

type DisableAccountMultiFactorHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewDisableAccountMultiFactorHandler(mr multi_factor.Repository, ar account.Repository) DisableAccountMultiFactorHandler {
	return DisableAccountMultiFactorHandler{mr: mr, ar: ar}
}

func (h DisableAccountMultiFactorHandler) Handle(ctx context.Context, accountId string) error {

	_, err := h.ar.UpdateAccount(ctx, accountId, func(a *account.Account) error {
		if !a.MultiFactorEnabled() {
			return errFailedDisableAccountMultiFactor
		}

		// if user toggled "off", delete TOTP settings
		if err := h.mr.DeleteAccountMultiFactorTOTP(ctx, accountId); err != nil {
			zap.S().Errorf("failed to delete totp: %s", err)
			return errFailedDisableAccountMultiFactor
		}

		return a.ToggleMultiFactor()
	})

	if err != nil {
		return err
	}

	return nil
}
