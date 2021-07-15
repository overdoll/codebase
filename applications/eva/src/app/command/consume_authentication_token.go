package command

import (
	"context"
	"errors"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/multi_factor"
	"overdoll/applications/eva/src/domain/token"
)

type ConsumeAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewConsumeAuthenticationTokenHandler(cr token.Repository, ur account.Repository, mr multi_factor.Repository) ConsumeAuthenticationTokenHandler {
	return ConsumeAuthenticationTokenHandler{cr: cr, ur: ur, mr: mr}
}

var (
	ErrFailedTokenConsume = errors.New("failed to consume cookie")
)

func (h ConsumeAuthenticationTokenHandler) Handle(ctx context.Context, cookieId string) error {

	// Redeem cookie
	ck, err := h.cr.GetAuthenticationTokenById(ctx, cookieId)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil
		}

		zap.S().Errorf("failed to get cookie: %s", err == gocql.ErrNotFound)
		return ErrFailedTokenConsume
	}

	if err := ck.MakeConsumed(); err != nil {
		return err
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	if err := h.cr.DeleteAuthenticationTokenById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return ErrFailedTokenConsume
	}

	return err
}
