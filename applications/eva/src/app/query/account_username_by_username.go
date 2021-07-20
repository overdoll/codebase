package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type AccountUsernameByUsernameHandler struct {
	ar account.Repository
}

func NewAccountUsernameByUsernameHandler(ar account.Repository) AccountUsernameByUsernameHandler {
	return AccountUsernameByUsernameHandler{ar: ar}
}

var (
	ErrFailedAccountUsernameByUsername = errors.New("failed to get account username")
)

func (h AccountUsernameByUsernameHandler) Handle(ctx context.Context, accountId, username string) (*account.Username, error) {

	realUser, err := h.ar.GetAccountUsername(ctx, accountId, username)

	if err != nil {
		zap.S().Errorf("failed to get account email: %s", err)
		return nil, ErrFailedAccountEmailByEmail
	}

	return realUser, nil
}
