package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/token"
)

type ConsumeAuthenticationToken struct {
	TokenId string
}

type ConsumeAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewConsumeAuthenticationTokenHandler(cr token.Repository, ur account.Repository, mr multi_factor.Repository) ConsumeAuthenticationTokenHandler {
	return ConsumeAuthenticationTokenHandler{cr: cr, ur: ur, mr: mr}
}

func (h ConsumeAuthenticationTokenHandler) Handle(ctx context.Context, cmd ConsumeAuthenticationToken) error {

	// Redeem cookie
	ck, err := h.cr.GetAuthenticationTokenById(ctx, cmd.TokenId)

	if err != nil {
		return err
	}

	if err := ck.MakeConsumed(); err != nil {
		return err
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	if err := h.cr.DeleteAuthenticationTokenById(ctx, ck.Token()); err != nil {
		return err
	}

	return err
}
