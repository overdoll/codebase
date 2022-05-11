package query

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"

	"overdoll/libraries/principal"
)

type AreAccountMultiFactorRecoveryCodesGenerated struct {
	Principal *principal.Principal

	AccountId string
}

type AreAccountMultiFactorRecoveryCodesGeneratedHandler struct {
	ar account.Repository
}

func NewAreAccountMultiFactorRecoveryCodesGeneratedHandler(ar account.Repository) AreAccountMultiFactorRecoveryCodesGeneratedHandler {
	return AreAccountMultiFactorRecoveryCodesGeneratedHandler{ar: ar}
}

func (h AreAccountMultiFactorRecoveryCodesGeneratedHandler) Handle(ctx context.Context, query AreAccountMultiFactorRecoveryCodesGenerated) (bool, error) {

	res, err := h.ar.HasAccountRecoveryCodes(ctx, query.Principal, query.AccountId)

	if err != nil {
		return false, err
	}

	return res, nil
}
