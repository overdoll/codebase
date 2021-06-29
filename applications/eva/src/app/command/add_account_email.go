package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type AddAccountEmailHandler struct {
	ar account.Repository
}

func NewAddAccountEmailHandler(ar account.Repository) AddAccountEmailHandler {
	return AddAccountEmailHandler{ar: ar}
}

var (
	ErrFailedAddEmail = errors.New("failed to add email to account")
)

const (
	ValidationErrEmailNotUnique = "email_not_unique"
)

func (h AddAccountEmailHandler) Handle(ctx context.Context, userId, email string) (string, error) {

	acc, err := h.ar.GetAccountById(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return "", ErrFailedAddEmail
	}

	confirm, err := account.NewEmailConfirmation(email)

	if err != nil {
		return "", err
	}

	err = h.ar.AddAccountEmail(ctx, acc, confirm)

	if err != nil {
		if err == account.ErrEmailNotUnique {
			return ValidationErrEmailNotUnique, nil
		}
	}

	// TODO: send an email confirmation here

	return "", nil
}
