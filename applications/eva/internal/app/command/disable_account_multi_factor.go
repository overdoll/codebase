package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type DisableAccountMultiFactor struct {
	Principal *principal.Principal
}

type DisableAccountMultiFactorHandler struct {
	ar account.Repository
}

func NewDisableAccountMultiFactorHandler(ar account.Repository) DisableAccountMultiFactorHandler {
	return DisableAccountMultiFactorHandler{ar: ar}
}

func (h DisableAccountMultiFactorHandler) Handle(ctx context.Context, cmd DisableAccountMultiFactor) (*account.Account, error) {

	acc, err := h.ar.GetAccountById(ctx, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	if err := h.ar.DeleteAccountMultiFactorTOTP(ctx, cmd.Principal, acc); err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	return acc, nil
}
