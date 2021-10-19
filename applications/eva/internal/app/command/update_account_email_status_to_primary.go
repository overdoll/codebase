package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type UpdateAccountEmailStatusToPrimary struct {
	Principal *principal.Principal
	Email     string
}

type UpdateAccountEmailStatusToPrimaryHandler struct {
	ar account.Repository
}

func NewUpdateAccountEmailStatusToPrimaryHandler(ar account.Repository) UpdateAccountEmailStatusToPrimaryHandler {
	return UpdateAccountEmailStatusToPrimaryHandler{ar: ar}
}

func (h UpdateAccountEmailStatusToPrimaryHandler) Handle(ctx context.Context, cmd UpdateAccountEmailStatusToPrimary) (string, *account.Email, error) {

	var oldEmail string

	_, em, err := h.ar.UpdateAccountMakeEmailPrimary(ctx, cmd.Principal, cmd.Principal.AccountId(), func(a *account.Account, emails []*account.Email) error {
		oldEmail = a.Email()
		return a.UpdateEmail(emails, cmd.Email)
	})

	if err != nil {
		return oldEmail, nil, err
	}

	return oldEmail, em, nil
}
