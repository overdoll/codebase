package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/principal"
)

type AreAccountMultiFactorRecoveryCodesGenerated struct {
	Principal *principal.Principal

	AccountId string
}

type AreAccountMultiFactorRecoveryCodesGeneratedHandler struct {
	mr multi_factor.Repository
}

func NewAreAccountMultiFactorRecoveryCodesGeneratedHandler(mr multi_factor.Repository) AreAccountMultiFactorRecoveryCodesGeneratedHandler {
	return AreAccountMultiFactorRecoveryCodesGeneratedHandler{mr: mr}
}

func (h AreAccountMultiFactorRecoveryCodesGeneratedHandler) Handle(ctx context.Context, query AreAccountMultiFactorRecoveryCodesGenerated) (bool, error) {

	res, err := h.mr.HasAccountRecoveryCodes(ctx, query.Principal, query.AccountId)

	if err != nil {
		return false, err
	}

	return res, nil
}
