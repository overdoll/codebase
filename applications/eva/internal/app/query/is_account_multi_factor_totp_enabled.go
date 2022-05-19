package query

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"

	"overdoll/libraries/principal"
)

type IsAccountMultiFactorTOTPEnabled struct {
	Principal *principal.Principal

	AccountId string
}

type IsAccountMultiFactorTOTPEnabledHandler struct {
	ar account.Repository
}

func NewIsAccountMultiFactorTOTPEnabledHandler(ar account.Repository) IsAccountMultiFactorTOTPEnabledHandler {
	return IsAccountMultiFactorTOTPEnabledHandler{ar: ar}
}

func (h IsAccountMultiFactorTOTPEnabledHandler) Handle(ctx context.Context, query IsAccountMultiFactorTOTPEnabled) (bool, error) {
	if _, err := h.ar.GetAccountMultiFactorTOTP(ctx, query.AccountId); err != nil {

		if err == account.ErrTOTPNotConfigured {
			return false, nil
		}

		return false, err
	}

	return true, nil
}
