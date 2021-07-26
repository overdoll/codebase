package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
)

var (
	errFailedAuthenticateMultiFactor           = errors.New("failed to authenticate with multi factor")
	errFailedAuthenticateMultiFactorNotEnabled = errors.New("failed to authenticate with multi factor - not enabled")
)

const (
	validationErrMultiFactorCodeInvalid = "multi_factor_code_invalid"
)

type GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler struct {
	cr token.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewGrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler(cr token.Repository, ur account.Repository, mr multi_factor.Repository) GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler {
	return GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler{cr: cr, ur: ur, mr: mr}
}

func (h GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler) Handle(ctx context.Context, recoveryCode bool, cookieId, code string) (*account.Account, string, error) {

	ck, err := h.cr.GetAuthenticationTokenById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, "", errFailedAuthenticateMultiFactor
	}

	// AuthenticationToken should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err != nil {
		return nil, "", err
	}

	// make sure that this account exists
	usr, err := h.ur.GetAccountByEmail(ctx, ck.Email())

	if err != nil {
		if err == account.ErrAccountNotFound {
			return nil, "", errFailedAuthenticateMultiFactor
		}

		zap.S().Errorf("failed get account: %s", err)
		return nil, "", errFailedAuthenticateMultiFactor
	}

	// Multi factor must be enabled for recovery codes to function
	if !usr.MultiFactorEnabled() {
		return nil, "", errFailedAuthenticateMultiFactor
	}

	// get TOTP
	totp, err := h.mr.GetAccountMultiFactorTOTP(ctx, usr.ID())

	if err != nil {

		// totp must be configured
		if err == multi_factor.ErrTOTPNotConfigured {
			return nil, "", errFailedAuthenticateMultiFactorNotEnabled
		}

		zap.S().Errorf("failed get otp for account: %s", err)
		return nil, "", errFailedAuthenticateMultiFactor
	}

	if recoveryCode {
		if err := h.mr.VerifyAccountRecoveryCode(ctx, usr.ID(), multi_factor.NewRecoveryCode(code)); err != nil {

			// recovery codes must be valid
			if err == multi_factor.ErrRecoveryCodeInvalid {
				return nil, validationErrMultiFactorCodeInvalid, nil
			}

			zap.S().Errorf("failed redeem recovery code: %s", err)
			return nil, "", errFailedAuthenticateMultiFactor
		}
	} else {
		// validate TOTP code
		if !totp.ValidateCode(code) {
			return nil, validationErrMultiFactorCodeInvalid, nil
		}
	}

	// Delete cookie - has been consumed
	if err := h.cr.DeleteAuthenticationTokenById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, "", errFailedAuthenticateMultiFactor
	}

	return usr, "", nil
}
