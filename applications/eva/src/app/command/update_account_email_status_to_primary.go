package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	errFailedMakeEmailPrimary = errors.New("failed to make email primary")
)

const (
	validationErrEmailNotConfirmed = "email_not_confirmed"
)

type UpdateAccountEmailStatusToPrimaryHandler struct {
	ar account.Repository
}

func NewUpdateAccountEmailStatusToPrimaryHandler(ar account.Repository) UpdateAccountEmailStatusToPrimaryHandler {
	return UpdateAccountEmailStatusToPrimaryHandler{ar: ar}
}

func (h UpdateAccountEmailStatusToPrimaryHandler) Handle(ctx context.Context, accountId, email string) (*account.Email, string, error) {

	_, em, err := h.ar.UpdateAccountMakeEmailPrimary(ctx, accountId, func(a *account.Account, emails []*account.Email) error {
		return a.UpdateEmail(emails, email)
	})

	if err != nil {
		if err == account.ErrEmailNotConfirmed {
			return nil, validationErrEmailNotConfirmed, nil
		}

		zap.S().Errorf("failed to make email primary: %s", err)
		return nil, "", errFailedMakeEmailPrimary
	}

	return em, "", nil
}
