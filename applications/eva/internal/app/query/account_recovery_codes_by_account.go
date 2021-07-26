package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/multi_factor"
)

var (
	errFailedAccountRecoveryCodesByAccount = errors.New("failed to get recovery codes")
)

type AccountRecoveryCodesByAccountHandler struct {
	mr multi_factor.Repository
}

func NewAccountRecoveryCodesByAccountHandler(mr multi_factor.Repository) AccountRecoveryCodesByAccountHandler {
	return AccountRecoveryCodesByAccountHandler{mr: mr}
}

func (h AccountRecoveryCodesByAccountHandler) Handle(ctx context.Context, accountId string) ([]*multi_factor.RecoveryCode, error) {

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get recovery codes: %s", err)
		return nil, errFailedAccountRecoveryCodesByAccount
	}

	return codes, nil
}
