package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
)

type GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotp struct {
	// whether or not the code entered is a recovery code
	RecoveryCode bool
	TokenId      string
	Code         string
}

type GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler struct {
	cr token.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewGrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler(cr token.Repository, ur account.Repository, mr multi_factor.Repository) GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler {
	return GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler{cr: cr, ur: ur, mr: mr}
}

func (h GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotpHandler) Handle(ctx context.Context, cmd GrantAccountAccessWithAuthTokenAndRecoveryCodeOrTotp) (*account.Account, error) {

	ck, err := h.cr.GetAuthenticationTokenById(ctx, cmd.TokenId)

	if err != nil {
		return nil, err
	}

	// AuthenticationToken should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err != nil {
		return nil, err
	}

	// make sure that this account exists
	usr, err := h.ur.GetAccountByEmail(ctx, ck.Email())

	if err != nil {
		return nil, err
	}

	// Multi factor must be enabled for recovery codes to function
	if !usr.MultiFactorEnabled() {
		return nil, err
	}

	// get TOTP
	totp, err := h.mr.GetAccountMultiFactorTOTP(ctx, usr.ID())

	if err != nil {
		return nil, err
	}

	if cmd.RecoveryCode {
		if err := h.mr.VerifyAccountRecoveryCode(ctx, usr.ID(), multi_factor.NewRecoveryCode(cmd.Code)); err != nil {
			return nil, err
		}
	} else {
		// validate TOTP code
		if !totp.ValidateCode(cmd.Code) {
			return nil, err
		}
	}

	// Delete cookie - has been consumed
	if err := h.cr.DeleteAuthenticationTokenById(ctx, ck.Token()); err != nil {
		return nil, err
	}

	return usr, nil
}
