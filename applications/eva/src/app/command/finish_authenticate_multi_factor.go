package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type FinishAuthenticateMultiFactorHandler struct {
	cr token.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewFinishAuthenticateMultiFactorHandler(cr token.Repository, ur account.Repository, mr multi_factor.Repository) FinishAuthenticateMultiFactorHandler {
	return FinishAuthenticateMultiFactorHandler{cr: cr, ur: ur, mr: mr}
}

var (
	ErrFailedAuthenticateMultiFactor           = errors.New("failed to authenticate with multi factor")
	ErrFailedAuthenticateMultiFactorNotEnabled = errors.New("failed to authenticate with multi factor - not enabled")
)

const (
	ValidationErrMultiFactorCodeInvalid = "multi_factor_code_invalid"
)

func (h FinishAuthenticateMultiFactorHandler) Handle(ctx context.Context, recoveryCode bool, cookieId, code string) (*account.Account, string, error) {

	ck, err := h.cr.GetAuthenticationTokenById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, "", ErrFailedAuthenticateMultiFactor
	}

	// AuthenticationToken should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err != nil {
		return nil, "", err
	}

	// make sure that this account exists
	usr, err := h.ur.GetAccountByEmail(ctx, ck.Email())

	if err != nil {
		if err == account.ErrAccountNotFound {
			return nil, "", ErrFailedAuthenticateMultiFactor
		}

		zap.S().Errorf("failed get account: %s", err)
		return nil, "", ErrFailedAuthenticateMultiFactor
	}

	// Multi factor must be enabled for recovery codes to function
	if !usr.MultiFactorEnabled() {
		return nil, "", ErrFailedAuthenticateMultiFactor
	}

	// get TOTP
	totp, err := h.mr.GetAccountMultiFactorTOTP(ctx, usr.ID())

	if err != nil {

		// totp must be configured
		if err == multi_factor.ErrTOTPNotConfigured {
			return nil, "", ErrFailedAuthenticateMultiFactorNotEnabled
		}

		zap.S().Errorf("failed get otp for account: %s", err)
		return nil, "", ErrFailedAuthenticateMultiFactor
	}

	if recoveryCode {
		if err := h.mr.RedeemAccountRecoveryCode(ctx, usr.ID(), multi_factor.NewRecoveryCode(code)); err != nil {

			// recovery codes must be valid
			if err == multi_factor.ErrRecoveryCodeInvalid {
				return nil, ValidationErrMultiFactorCodeInvalid, nil
			}

			zap.S().Errorf("failed redeem recovery code: %s", err)
			return nil, "", ErrFailedAuthenticateMultiFactor
		}
	} else {
		// validate TOTP code
		if !totp.ValidateCode(code) {
			return nil, ValidationErrMultiFactorCodeInvalid, nil
		}
	}

	// Delete cookie - has been consumed
	if err := h.cr.DeleteAuthenticationTokenById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, "", ErrFailedAuthenticateMultiFactor
	}

	return usr, "", nil
}
