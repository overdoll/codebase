package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/principal"
)

type GenerateAccountMultiFactorRecoveryCodes struct {
	Principal *principal.Principal
}

type GenerateAccountMultiFactorRecoveryCodesHandler struct {
	mr multi_factor.Repository
}

func NewGenerateAccountMultiFactorRecoveryCodesHandler(mr multi_factor.Repository) GenerateAccountMultiFactorRecoveryCodesHandler {
	return GenerateAccountMultiFactorRecoveryCodesHandler{mr: mr}
}

func (h GenerateAccountMultiFactorRecoveryCodesHandler) Handle(ctx context.Context, cmd GenerateAccountMultiFactorRecoveryCodes) ([]*multi_factor.RecoveryCode, error) {

	// generate a set of recovery codes for the account
	set, err := multi_factor.GenerateRecoveryCodeSet()

	if err != nil {
		return nil, err
	}

	if err := h.mr.CreateAccountRecoveryCodes(ctx, cmd.Principal.AccountId(), set); err != nil {
		return nil, err
	}

	return set, nil
}
