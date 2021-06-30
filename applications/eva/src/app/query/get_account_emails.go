package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type GetAccountEmailsHandler struct {
	ar account.Repository
}

func NewGetAccountEmailsHandler(ar account.Repository) GetAccountEmailsHandler {
	return GetAccountEmailsHandler{ar: ar}
}

var (
	ErrFailedGetEmails = errors.New("failed to get emails")
)

func (h GetAccountEmailsHandler) Handle(ctx context.Context, userId string) ([]*account.Email, error) {

	emails, err := h.ar.GetAccountEmails(ctx, userId)

	if err != nil {

		zap.S().Errorf("failed to get account emails: %s", err)
		return nil, ErrFailedGetEmails
	}

	return emails, nil
}
