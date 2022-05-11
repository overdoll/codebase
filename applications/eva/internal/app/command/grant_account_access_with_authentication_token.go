package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/passport"
)

type GrantAccountAccessWithAuthenticationToken struct {
	Passport *passport.Passport
	Token    string
	// optional parameters
	// if the account linked to the token is MFA, these fields are required
	RecoveryCode *string
	Code         *string
}

type GrantAccountAccessWithAuthenticationTokenHandler struct {
	cr token.Repository
	ar account.Repository
}

func NewGrantAccountAccessWithAuthenticationTokenHandler(cr token.Repository, ar account.Repository) GrantAccountAccessWithAuthenticationTokenHandler {
	return GrantAccountAccessWithAuthenticationTokenHandler{cr: cr, ar: ar}
}

// Handle consume authentication token and return the account assigned to this token
// this will only work if the current account is registered
// if not registered, use other methods
func (h GrantAccountAccessWithAuthenticationTokenHandler) Handle(ctx context.Context, cmd GrantAccountAccessWithAuthenticationToken) (*account.Account, error) {

	// Redeem cookie
	ck, err := h.cr.GetAuthenticationToken(ctx, cmd.Passport, cmd.Token, nil)

	if err != nil {
		return nil, err
	}

	em, err := ck.ViewEmailWithPassport(cmd.Passport)

	if err != nil {
		return nil, err
	}

	// make sure that this account exists
	acc, err := h.ar.GetAccountByEmail(ctx, em)

	if err != nil {
		return nil, err
	}

	// authenticating with a recovery code
	if cmd.RecoveryCode != nil || cmd.Code != nil {

		// not configured
		if !acc.MultiFactorEnabled() {
			return nil, account.ErrTOTPNotConfigured
		}

		// get TOTP
		totp, err := h.ar.GetAccountMultiFactorTOTP(ctx, acc.ID())

		if err != nil {
			return nil, err
		}

		if cmd.RecoveryCode != nil {
			if err := h.ar.VerifyAccountRecoveryCode(ctx, acc.ID(), account.NewRecoveryCode(*cmd.RecoveryCode)); err != nil {
				return nil, err
			}
		} else {
			// validate TOTP code
			if !totp.ValidateCode(*cmd.Code) {
				return nil, err
			}
		}
	} else {
		// authenticating regularly - just make sure MFA is not enabled
		if acc.MultiFactorEnabled() {
			return nil, account.ErrMultiFactorRequired
		}
	}

	// Delete cookie - account is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	if err := h.cr.DeleteAuthenticationToken(ctx, cmd.Passport, ck.Token(), nil); err != nil {
		return nil, err
	}

	return acc, nil
}
