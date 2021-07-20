package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	ErrFailedConfirmAccountEmail = errors.New("failed to confirm email")
)

const (
	ValidationErrEmailCodeInvalid = "email_code_invalid"
)

type ConfirmAccountEmailHandler struct {
	ar account.Repository
}

func NewConfirmAccountEmailHandler(ar account.Repository) ConfirmAccountEmailHandler {
	return ConfirmAccountEmailHandler{ar: ar}
}

func (h ConfirmAccountEmailHandler) Handle(ctx context.Context, userId, id string) (*account.Email, string, error) {

	acc, err := h.ar.GetAccountById(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, "", ErrFailedConfirmAccountEmail
	}

	email, err := h.ar.ConfirmAccountEmail(ctx, id, acc)

	if err != nil {
		if err == account.ErrEmailCodeInvalid {
			return nil, ValidationErrEmailCodeInvalid, nil
		}

		zap.S().Errorf("failed to confirm email: %s", err)
		return nil, "", ErrFailedConfirmAccountEmail
	}

	return email, "", nil
}
