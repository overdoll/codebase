package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type GenerateAccountRecoveryCodesHandler struct {
	mr multi_factor.Repository
}

func NewGenerateAccountRecoveryCodesHandler(mr multi_factor.Repository) GenerateAccountRecoveryCodesHandler {
	return GenerateAccountRecoveryCodesHandler{mr: mr}
}

var (
	ErrFailedGenerateAccountRecoveryCodes = errors.New("failed to generate recovery codes")
)

func (h GenerateAccountRecoveryCodesHandler) Handle(ctx context.Context, accountId string) ([]*multi_factor.RecoveryCode, error) {

	// generate a set of recovery codes for the account
	set, err := multi_factor.GenerateRecoveryCodeSet()

	if err != nil {
		zap.S().Errorf("failed to generate a set of codes: %s", err)
		return nil, ErrFailedGenerateAccountRecoveryCodes
	}

	if err := h.mr.CreateAccountRecoveryCodes(ctx, accountId, set); err != nil {
		zap.S().Errorf("failed to create recovery codes: %s", err)
		return nil, ErrFailedGenerateAccountRecoveryCodes
	}

	return set, nil
}
