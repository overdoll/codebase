package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
)

type DisableAccountMultiFactor struct {
	AccountId string
}

type DisableAccountMultiFactorHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewDisableAccountMultiFactorHandler(mr multi_factor.Repository, ar account.Repository) DisableAccountMultiFactorHandler {
	return DisableAccountMultiFactorHandler{mr: mr, ar: ar}
}

func (h DisableAccountMultiFactorHandler) Handle(ctx context.Context, cmd DisableAccountMultiFactor) error {

	_, err := h.ar.UpdateAccount(ctx, cmd.AccountId, func(a *account.Account) error {
		if !a.MultiFactorEnabled() {
			return nil
		}

		// if user toggled "off", delete TOTP settings
		if err := h.mr.DeleteAccountMultiFactorTOTP(ctx, a.ID()); err != nil {
			return err
		}

		return a.ToggleMultiFactor()
	})

	if err != nil {
		return err
	}

	return nil
}
