package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/paging"
)

var (
	ErrFailedAccountEmailsByAccount = errors.New("failed to get emails")
)

type AccountEmailsByAccountHandler struct {
	ar account.Repository
}

func NewGetAccountEmailsHandler(ar account.Repository) AccountEmailsByAccountHandler {
	return AccountEmailsByAccountHandler{ar: ar}
}

func (h AccountEmailsByAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, userId string) ([]*account.Email, *paging.Info, error) {

	emails, page, err := h.ar.GetAccountEmails(ctx, cursor, userId)

	if err != nil {
		zap.S().Errorf("failed to get account emails: %s", err)
		return nil, nil, ErrFailedAccountEmailsByAccount
	}

	return emails, page, nil
}
