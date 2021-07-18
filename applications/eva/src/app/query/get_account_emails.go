package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/paging"
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

func (h GetAccountEmailsHandler) Handle(ctx context.Context, cursor *paging.Cursor, userId string) ([]*account.Email, *paging.Info, error) {

	emails, page, err := h.ar.GetAccountEmails(ctx, cursor, userId)

	if err != nil {
		zap.S().Errorf("failed to get account emails: %s", err)
		return nil, nil, ErrFailedGetEmails
	}

	return emails, page, nil
}
