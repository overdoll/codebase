package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/libraries/principal"
)

type IsAccountMultiFactorTOTPEnabled struct {
	Principal *principal.Principal

	AccountId string
}

type IsAccountMultiFactorTOTPEnabledHandler struct {
	mr multi_factor.Repository
}

func NewIsAccountMultiFactorTOTPEnabledHandler(mr multi_factor.Repository) IsAccountMultiFactorTOTPEnabledHandler {
	return IsAccountMultiFactorTOTPEnabledHandler{mr: mr}
}

func (h IsAccountMultiFactorTOTPEnabledHandler) Handle(ctx context.Context, query IsAccountMultiFactorTOTPEnabled) (bool, error) {
	if _, err := h.mr.GetAccountMultiFactorTOTP(ctx, query.AccountId); err != nil {

		if err == multi_factor.ErrTOTPNotConfigured {
			return false, nil
		}

		return false, err
	}

	return true, nil
}
