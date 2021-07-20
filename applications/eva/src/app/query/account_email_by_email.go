package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	errFailedAccountEmailByEmail = errors.New("failed to get email")
)

type AccountEmailByEmailHandler struct {
	ar account.Repository
}

func NewAccountEmailByEmailHandler(ar account.Repository) AccountEmailByEmailHandler {
	return AccountEmailByEmailHandler{ar: ar}
}

func (h AccountEmailByEmailHandler) Handle(ctx context.Context, accountId, email string) (*account.Email, error) {

	mail, err := h.ar.GetAccountEmail(ctx, accountId, email)

	if err != nil {
		zap.S().Errorf("failed to get account email: %s", err)
		return nil, errFailedAccountEmailByEmail
	}

	return mail, nil
}
