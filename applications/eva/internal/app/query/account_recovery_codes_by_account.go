package query

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"

	"overdoll/libraries/principal"
)

type AccountRecoveryCodesByAccount struct {
	Principal *principal.Principal

	AccountId string
}

type AccountRecoveryCodesByAccountHandler struct {
	ar account.Repository
}

func NewAccountRecoveryCodesByAccountHandler(ar account.Repository) AccountRecoveryCodesByAccountHandler {
	return AccountRecoveryCodesByAccountHandler{ar: ar}
}

func (h AccountRecoveryCodesByAccountHandler) Handle(ctx context.Context, query AccountRecoveryCodesByAccount) ([]*account.RecoveryCode, error) {

	codes, err := h.ar.GetAccountRecoveryCodes(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	return codes, nil
}
