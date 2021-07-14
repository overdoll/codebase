package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type MakeAccountEmailPrimaryHandler struct {
	ar account.Repository
}

func NewMakeAccountEmailPrimaryHandler(ar account.Repository) MakeAccountEmailPrimaryHandler {
	return MakeAccountEmailPrimaryHandler{ar: ar}
}

var (
	ErrFailedMakeEmailPrimary = errors.New("failed to make email primary")
)

const (
	ValidationErrEmailNotConfirmed = "email_not_confirmed"
)

func (h MakeAccountEmailPrimaryHandler) Handle(ctx context.Context, accountId, email string) (string, error) {

	_, err := h.ar.UpdateAccount(ctx, accountId, func(a *account.Account) error {
		emails, err := h.ar.GetAccountEmails(ctx, accountId)

		if err != nil {
			return err
		}

		return a.UpdateEmail(emails, email)
	})

	if err != nil {
		if err == account.ErrEmailNotConfirmed {
			return ValidationErrEmailNotConfirmed, nil
		}

		zap.S().Errorf("failed to make email primary: %s", err)
		return "", ErrFailedMakeEmailPrimary
	}

	return "", nil
}
