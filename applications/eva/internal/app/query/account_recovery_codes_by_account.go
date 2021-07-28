package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/principal"
)

type AccountRecoveryCodesByAccount struct {
	Principal *principal.Principal

	AccountId string
}

type AccountRecoveryCodesByAccountHandler struct {
	mr multi_factor.Repository
}

func NewAccountRecoveryCodesByAccountHandler(mr multi_factor.Repository) AccountRecoveryCodesByAccountHandler {
	return AccountRecoveryCodesByAccountHandler{mr: mr}
}

func (h AccountRecoveryCodesByAccountHandler) Handle(ctx context.Context, query AccountRecoveryCodesByAccount) ([]*multi_factor.RecoveryCode, error) {

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, query.AccountId)

	if err != nil {
		return nil, err
	}

	return codes, nil
}
