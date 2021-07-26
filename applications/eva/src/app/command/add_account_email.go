package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	errFailedAddAccountEmail = errors.New("failed to add email to account")
)

const (
	validationErrEmailNotUnique = "email_not_unique"
)

type AddAccountEmailHandler struct {
	ar account.Repository
	carrier CarrierService
}

func NewAddAccountEmailHandler(ar account.Repository, carrier CarrierService) AddAccountEmailHandler {
	return AddAccountEmailHandler{ar: ar, carrier: carrier}
}

func (h AddAccountEmailHandler) Handle(ctx context.Context, userId, email string) (*account.Email, string, error) {

	acc, err := h.ar.GetAccountById(ctx, userId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, "", errFailedAddAccountEmail
	}

	confirm, err := account.NewEmailConfirmation(email)

	if err != nil {
		return nil, "", err
	}

	em, err := h.ar.AddAccountEmail(ctx, acc, confirm)

	if err != nil {
		if err == account.ErrEmailNotUnique {
			return nil, validationErrEmailNotUnique, nil
		}

		zap.S().Errorf("failed to add email: %s", err)
		return nil, "", errFailedAddAccountEmail
	}

	// TODO: send an email confirmation here

	return em, "", nil
}
