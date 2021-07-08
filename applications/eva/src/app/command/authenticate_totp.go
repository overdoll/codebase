package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type AuthenticateTotpHandler struct {
	cr cookie.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewAuthenticateTotpHandler(cr cookie.Repository, ur account.Repository, mr multi_factor.Repository) AuthenticateTotpHandler {
	return AuthenticateTotpHandler{cr: cr, ur: ur, mr: mr}
}

var (
	ErrFailedAuthenticateTOTP          = errors.New("failed to authenticate with TOTP")
	ErrFailedAuthenticateOTPNotEnabled = errors.New("failed to authenticate with TOTP - not enabled")
)

const (
	ValidationErrTOTPCodeInvalid = "totp_code_invalid"
)

func (h AuthenticateTotpHandler) Handle(ctx context.Context, cookieId, code string) (*account.Account, string, error) {

	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, "", ErrFailedAuthenticateTOTP
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
		return nil, "", ErrFailedAuthenticateTOTP
	}

	// Multi factor must be enabled
	if !usr.MultiFactorEnabled() {
		return nil, "", ErrFailedAuthenticateOTPNotEnabled
	}

	// get TOTP
	totp, err := h.mr.GetAccountMultiFactorTOTP(ctx, usr.ID())

	if err != nil {

		// totp must be configured
		if err == multi_factor.ErrTOTPNotConfigured {
			return nil, "", ErrFailedAuthenticateTOTP
		}

		zap.S().Errorf("failed get otp for account: %s", err)
		return nil, "", ErrFailedAuthenticateTOTP
	}

	// validate TOTP code
	if !totp.ValidateCode(code) {
		return nil, ValidationErrTOTPCodeInvalid, nil
	}

	// Delete cookie - has been consumed
	if err := h.cr.DeleteCookieById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, "", ErrFailedCookieRedeem
	}

	return usr, "", nil
}
