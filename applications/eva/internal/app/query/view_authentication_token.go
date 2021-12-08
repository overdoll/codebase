package query

import (
	"context"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
)

type ViewAuthenticationToken struct {
	Token    string
	Passport *passport.Passport
}

type ViewAuthenticationTokenHandler struct {
	tr token.Repository
	ar account.Repository
	mr multi_factor.Repository
}

func NewViewAuthenticationTokenHandler(tr token.Repository, ar account.Repository, mr multi_factor.Repository) ViewAuthenticationTokenHandler {
	return ViewAuthenticationTokenHandler{tr: tr, ar: ar, mr: mr}
}

func (h ViewAuthenticationTokenHandler) Handle(ctx context.Context, query ViewAuthenticationToken) (*token.AuthenticationToken, *account.Account, error) {

	// Redeem cookie
	ck, err := h.tr.GetAuthenticationToken(ctx, query.Token)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil, err
		}

		return nil, nil, err
	}

	// not on same device - don't give any other details as well
	if !ck.CanViewAccountEmail(query.Passport) {
		return ck, nil, nil
	}

	em, err := ck.Email(query.Passport)

	if err != nil {
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
