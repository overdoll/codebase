package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type AuthenticateRecoveryCodeHandler struct {
	cr cookie.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewAuthenticateRecoveryCodeHandler(cr cookie.Repository, ur account.Repository, mr multi_factor.Repository) AuthenticateRecoveryCodeHandler {
	return AuthenticateRecoveryCodeHandler{cr: cr, ur: ur, mr: mr}
}

var (
	ErrFailedAuthenticateRecoveryCode           = errors.New("failed to authenticate with recovery codes")
	ErrFailedAuthenticateRecoveryCodeNotEnabled = errors.New("failed to authenticate with recovery codes - not enabled")
)

const (
	ValidationErrRecoveryCodeInvalid = "recovery_code_invalid"
)

func (h AuthenticateRecoveryCodeHandler) Handle(ctx context.Context, cookieId, recoveryCode string) (*account.Account, string, error) {

	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, "", ErrFailedAuthenticateRecoveryCode
	}

	// Cookie should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err != nil {
		return nil, "", err
	}

	// make sure that this account exists
	usr, err := h.ur.GetAccountByEmail(ctx, ck.Email())

	if err != nil {
		if err == account.ErrAccountNotFound {
			return nil, "", ErrFailedAuthenticateTOTP
		}

		zap.S().Errorf("failed get account: %s", err)
		return nil, "", ErrFailedAuthenticateRecoveryCode
	}

	// Multi factor must be enabled for recovery codes to function
	if !usr.MultiFactorEnabled() {
		return nil, "", ErrFailedAuthenticateRecoveryCodeNotEnabled
	}

	if err := h.mr.RedeemAccountRecoveryCode(ctx, usr.ID(), multi_factor.NewRecoveryCode(recoveryCode)); err != nil {

		// recovery codes must be valid
		if err == multi_factor.ErrRecoveryCodeInvalid {
			return nil, ValidationErrRecoveryCodeInvalid, nil
		}

		zap.S().Errorf("failed redeem recovery code: %s", err)
		return nil, "", ErrFailedAuthenticateRecoveryCode
	}

	// Delete cookie - has been consumed
	if err := h.cr.DeleteCookieById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, "", ErrFailedCookieRedeem
	}

	return usr, "", nil
}
