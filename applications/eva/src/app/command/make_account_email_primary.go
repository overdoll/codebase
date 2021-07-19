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

func (h MakeAccountEmailPrimaryHandler) Handle(ctx context.Context, accountId, email string) (*account.Email, string, error) {

	_, em, err := h.ar.UpdateAccountMakeEmailPrimary(ctx, accountId, func(a *account.Account, emails []*account.Email) error {
		return a.UpdateEmail(emails, email)
	})

	if err != nil {
		if err == account.ErrEmailNotConfirmed {
			return nil, ValidationErrEmailNotConfirmed, nil
		}

		zap.S().Errorf("failed to make email primary: %s", err)
		return nil, "", ErrFailedMakeEmailPrimary
	}

	return em, "", nil
}
