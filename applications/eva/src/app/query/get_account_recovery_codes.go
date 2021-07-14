package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type GetAccountRecoveryCodesHandler struct {
	mr multi_factor.Repository
}

func NewGetAccountRecoveryCodesHandler(mr multi_factor.Repository) GetAccountRecoveryCodesHandler {
	return GetAccountRecoveryCodesHandler{mr: mr}
}

var (
	ErrFailedGetAccountRecoveryCodes = errors.New("failed to get usernames")
)

func (h GetAccountRecoveryCodesHandler) Handle(ctx context.Context, accountId string) ([]*multi_factor.RecoveryCode, error) {

	codes, err := h.mr.GetAccountRecoveryCodes(ctx, accountId)

	if err != nil {
		zap.S().Errorf("failed to get recovery codes: %s", err)
		return nil, ErrFailedGetAccountRecoveryCodes
	}

	return codes, nil
}
