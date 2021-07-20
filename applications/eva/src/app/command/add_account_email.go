package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	ErrFailedAddAccountEmail = errors.New("failed to add email to account")
)

const (
	ValidationErrEmailNotUnique = "email_not_unique"
)

type AddAccountEmailHandler struct {
	ar account.Repository
}

func NewAddAccountEmailHandler(ar account.Repository) AddAccountEmailHandler {
	return AddAccountEmailHandler{ar: ar}
}

func (h AddAccountEmailHandler) Handle(ctx context.Context, userId, email string) (*account.Email, string, error) {

	acc, err := h.ar.GetAccountById(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, "", ErrFailedAddAccountEmail
	}

	confirm, err := account.NewEmailConfirmation(email)

	if err != nil {
		return nil, "", err
	}

	em, err := h.ar.AddAccountEmail(ctx, acc, confirm)

	if err != nil {
		if err == account.ErrEmailNotUnique {
			return nil, ValidationErrEmailNotUnique, nil
		}

		zap.S().Errorf("failed to add email: %s", err)
		return nil, "", ErrFailedAddAccountEmail
	}

	// TODO: send an email confirmation here

	return em, "", nil
}
