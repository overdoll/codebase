package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	ErrFailedRemoveAccountEmail = errors.New("failed to remove email")
)

type DeleteAccountEmailHandler struct {
	ar account.Repository
}

func NewDeleteAccountEmailHandler(ar account.Repository) DeleteAccountEmailHandler {
	return DeleteAccountEmailHandler{ar: ar}
}

func (h DeleteAccountEmailHandler) Handle(ctx context.Context, accountId, email string) error {

	if err := h.ar.DeleteAccountEmail(ctx, accountId, email); err != nil {
		zap.S().Errorf("failed to remove email: %s", err)
		return ErrFailedRemoveAccountEmail
	}

	return nil
}
