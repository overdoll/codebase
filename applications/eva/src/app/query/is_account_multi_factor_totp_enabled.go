package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/multi_factor"
)

var (
	errFailedIsAccountTOTPMultiFactorEnabled = errors.New("failed to get totp status")
)

type IsAccountMultiFactorTOTPEnabledHandler struct {
	mr multi_factor.Repository
}

func NewIsAccountMultiFactorTOTPEnabledHandler(mr multi_factor.Repository) IsAccountMultiFactorTOTPEnabledHandler {
	return IsAccountMultiFactorTOTPEnabledHandler{mr: mr}
}

func (h IsAccountMultiFactorTOTPEnabledHandler) Handle(ctx context.Context, accountId string) (bool, error) {
	if _, err := h.mr.GetAccountMultiFactorTOTP(ctx, accountId); err != nil {

		if err == multi_factor.ErrTOTPNotConfigured {
			return false, nil
		}

		zap.S().Errorf("failed to get totp configuration: %s", err)
		return false, errFailedIsAccountTOTPMultiFactorEnabled
	}

	return true, nil
}
