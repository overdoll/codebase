package query

import (
	"context"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
)

type ViewAuthenticationToken struct {
	Token string

	// optional - if passports don't match
	Secret   *string
	Passport *passport.Passport
}

type ViewAuthenticationTokenHandler struct {
	tr token.Repository
	ar account.Repository
}

func NewViewAuthenticationTokenHandler(tr token.Repository, ar account.Repository) ViewAuthenticationTokenHandler {
	return ViewAuthenticationTokenHandler{tr: tr, ar: ar}
}

func (h ViewAuthenticationTokenHandler) Handle(ctx context.Context, query ViewAuthenticationToken) (*token.AuthenticationToken, *account.Account, error) {

	// Redeem cookie
	ck, err := h.tr.GetAuthenticationToken(ctx, query.Passport, query.Token, query.Secret)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil, err
		}

		return nil, nil, err
	}

	em, err := ck.ViewEmailWithPassport(query.Passport)

	if err != nil {

		// not yet verified, can't show
		if err == token.ErrNotVerified {
			return ck, nil, nil
		}

		// viewed on wrong device, don't show account info
		if err == token.ErrInvalidDevice {
			return ck, nil, nil
		}

		return nil, nil, err
	}

	// Verified - check if user exists with this email
	acc, err := h.ar.GetAccountByEmail(ctx, em)

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {

		if err == account.ErrAccountNotFound {
			return ck, nil, nil
		}

		return nil, nil, err
	}

	return ck, acc, err
}
