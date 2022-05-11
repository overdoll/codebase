package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"

	"overdoll/libraries/principal"
)

type GenerateAccountMultiFactorRecoveryCodes struct {
	Principal *principal.Principal
}

type GenerateAccountMultiFactorRecoveryCodesHandler struct {
	ar account.Repository
}

func NewGenerateAccountMultiFactorRecoveryCodesHandler(ar account.Repository) GenerateAccountMultiFactorRecoveryCodesHandler {
	return GenerateAccountMultiFactorRecoveryCodesHandler{ar: ar}
}

func (h GenerateAccountMultiFactorRecoveryCodesHandler) Handle(ctx context.Context, cmd GenerateAccountMultiFactorRecoveryCodes) ([]*account.RecoveryCode, error) {

	// generate a set of recovery codes for the account
	set, err := account.GenerateRecoveryCodeSet()

	if err != nil {
		return nil, err
	}

	if err := h.ar.CreateAccountRecoveryCodes(ctx, cmd.Principal, cmd.Principal.AccountId(), set); err != nil {
		return nil, err
	}

	return set, nil
}
