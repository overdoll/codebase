package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type GetAccountEmailHandler struct {
	ar account.Repository
}

func NewGetAccountEmailHandler(ar account.Repository) GetAccountEmailHandler {
	return GetAccountEmailHandler{ar: ar}
}

var (
	ErrFailedGetEmail = errors.New("failed to get email")
)

func (h GetAccountEmailHandler) Handle(ctx context.Context, accountId, email string) (*account.Email, error) {

	realMail, err := h.ar.GetAccountEmail(ctx, accountId, email)

	if err != nil {
		zap.S().Errorf("failed to get account email: %s", err)
		return nil, ErrFailedGetEmail
	}

	return realMail, nil
}
