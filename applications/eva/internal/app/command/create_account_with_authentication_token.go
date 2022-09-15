package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/event"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/passport"
	"overdoll/libraries/sentry_support"
)

type CreateAccountWithAuthenticationToken struct {
	Token    string
	Username string
	Passport *passport.Passport
}

type CreateAccountWithAuthenticationTokenHandler struct {
	cr    token.Repository
	ur    account.Repository
	event event.Repository
}

func NewCreateAccountWithAuthenticationTokenHandler(cr token.Repository, ur account.Repository, event event.Repository) CreateAccountWithAuthenticationTokenHandler {
	return CreateAccountWithAuthenticationTokenHandler{cr: cr, ur: ur, event: event}
}

func (h CreateAccountWithAuthenticationTokenHandler) Handle(ctx context.Context, cmd CreateAccountWithAuthenticationToken) (*account.Account, error) {

	ck, err := h.cr.GetAuthenticationToken(ctx, cmd.Passport, cmd.Token, nil)

	if err != nil {
		return nil, err
	}

	em, err := ck.ViewEmailWithPassport(cmd.Passport)

	if err != nil {
		return nil, err
	}

	// use the unique id of the token to create the account
	// this ensures our operations are idempotent
	instance, err := account.NewAccount(ck.UniqueId(), cmd.Username, em)

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		return nil, err
	}

	if err := h.cr.DeleteAuthenticationToken(ctx, cmd.Passport, cmd.Token, nil); err != nil {
		return nil, err
	}

	// we don't want to stop if an error occurs and prevent the account from registering, so we log the error and move on
	if err := h.event.NewAccountRegistration(ctx, instance); err != nil {
		sentry_support.CaptureException(ctx, err)
		return nil, nil
	}

	return instance, nil
}
