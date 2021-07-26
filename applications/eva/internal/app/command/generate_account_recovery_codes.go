package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/multi_factor"
)

var (
	errFailedGenerateAccountRecoveryCodes = errors.New("failed to generate recovery codes")
)

type GenerateAccountMultiFactorRecoveryCodesHandler struct {
	mr multi_factor.Repository
}

func NewGenerateAccountMultiFactorRecoveryCodesHandler(mr multi_factor.Repository) GenerateAccountMultiFactorRecoveryCodesHandler {
	return GenerateAccountMultiFactorRecoveryCodesHandler{mr: mr}
}

func (h GenerateAccountMultiFactorRecoveryCodesHandler) Handle(ctx context.Context, accountId string) ([]*multi_factor.RecoveryCode, error) {

	// generate a set of recovery codes for the account
	set, err := multi_factor.GenerateRecoveryCodeSet()

	if err != nil {
		zap.S().Errorf("failed to generate a set of codes: %s", err)
		return nil, errFailedGenerateAccountRecoveryCodes
	}

	if err := h.mr.CreateAccountRecoveryCodes(ctx, accountId, set); err != nil {
		zap.S().Errorf("failed to create recovery codes: %s", err)
		return nil, errFailedGenerateAccountRecoveryCodes
	}

	return set, nil
}
