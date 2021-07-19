package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type DisableAccountMultiFactorHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewDisableAccountMultiFactorHandler(mr multi_factor.Repository, ar account.Repository) DisableAccountMultiFactorHandler {
	return DisableAccountMultiFactorHandler{mr: mr, ar: ar}
}

var (
	ErrFailedDisableAccountMultiFactor = errors.New("failed to disable multi factor")
)

func (h DisableAccountMultiFactorHandler) Handle(ctx context.Context, accountId string) error {

	_, err := h.ar.UpdateAccount(ctx, accountId, func(a *account.Account) error {
		if !a.MultiFactorEnabled() {
			return ErrFailedDisableAccountMultiFactor
		}

		// if user toggled "off", delete TOTP settings
		if err := h.mr.DeleteAccountMultiFactorTOTP(ctx, accountId); err != nil {
			zap.S().Errorf("failed to delete totp: %s", err)
			return ErrFailedDisableAccountMultiFactor
		}

		return a.ToggleMultiFactor()
	})

	if err != nil {
		return err
	}

	return nil
}
