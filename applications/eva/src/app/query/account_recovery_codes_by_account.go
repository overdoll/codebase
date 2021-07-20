package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type AccountRecoveryCodesByAccountHandler struct {
	mr multi_factor.Repository
}

func NewAccountRecoveryCodesByAccountHandler(mr multi_factor.Repository) AccountRecoveryCodesByAccountHandler {
	return AccountRecoveryCodesByAccountHandler{mr: mr}
}

var (
	ErrFailedAccountRecoveryCodesByAccount = errors.New("failed to get recovery codes")
)

func (h AccountRecoveryCodesByAccountHandler) Handle(ctx context.Context, accountId string) ([]*multi_factor.RecoveryCode, error) {

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get recovery codes: %s", err)
		return nil, ErrFailedAccountRecoveryCodesByAccount
	}

	return codes, nil
}
