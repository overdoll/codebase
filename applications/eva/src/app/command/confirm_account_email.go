package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type ConfirmAccountEmailHandler struct {
	ar account.Repository
}

func NewConfirmAccountEmailHandler(ar account.Repository) ConfirmAccountEmailHandler {
	return ConfirmAccountEmailHandler{ar: ar}
}

var (
	ErrFailedConfirmAccountEmail = errors.New("failed to confirm email")
)

const (
	ValidationErrEmailCodeInvalid = "email_code_invalid"
)

func (h ConfirmAccountEmailHandler) Handle(ctx context.Context, userId, id string) (string, error) {

	acc, err := h.ar.GetAccountById(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return "", ErrFailedConfirmAccountEmail
	}

	err = h.ar.ConfirmAccountEmail(ctx, id, acc)

	if err != nil {
		if err == account.ErrEmailCodeInvalid {
			return ValidationErrEmailCodeInvalid, nil
		}
	}

	return "", nil
}
