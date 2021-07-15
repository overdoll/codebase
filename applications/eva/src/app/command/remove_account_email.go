package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type RemoveAccountEmailHandler struct {
	ar account.Repository
}

func NewRemoveAccountEmailHandler(ar account.Repository) RemoveAccountEmailHandler {
	return RemoveAccountEmailHandler{ar: ar}
}

var (
	ErrFailedRemoveAccountEmail = errors.New("failed to remove email")
)

func (h RemoveAccountEmailHandler) Handle(ctx context.Context, accountId, email string) error {

	if err := h.ar.DeleteAccountEmail(ctx, accountId, email); err != nil {
		zap.S().Errorf("failed to remove email: %s", err)
		return ErrFailedRemoveAccountEmail
	}

	return nil
}
