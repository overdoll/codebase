package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/principal"
)

type DisableAccountMultiFactor struct {
	Principal *principal.Principal
}

type DisableAccountMultiFactorHandler struct {
	mr multi_factor.Repository
	ar account.Repository
}

func NewDisableAccountMultiFactorHandler(mr multi_factor.Repository, ar account.Repository) DisableAccountMultiFactorHandler {
	return DisableAccountMultiFactorHandler{mr: mr, ar: ar}
}

func (h DisableAccountMultiFactorHandler) Handle(ctx context.Context, cmd DisableAccountMultiFactor) (*account.Account, error) {

	acc, err := h.ar.UpdateAccount(ctx, cmd.Principal.AccountId(), func(a *account.Account) error {

		if !a.MultiFactorEnabled() {
			return nil
		}

		// if user toggled "off", delete TOTP settings
		if err := h.mr.DeleteAccountMultiFactorTOTP(ctx, cmd.Principal, a.ID()); err != nil {
			return err
		}

		return a.DisableMultiFactor()
	})

	if err != nil {
		return nil, err
	}

	return acc, nil
}
