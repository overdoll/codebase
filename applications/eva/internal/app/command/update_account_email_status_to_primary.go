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

func (h UpdateAccountEmailStatusToPrimaryHandler) Handle(ctx context.Context, cmd UpdateAccountEmailStatusToPrimary) (*account.Email, error) {

	_, em, err := h.ar.UpdateAccountMakeEmailPrimary(ctx, cmd.Principal.AccountId(), func(a *account.Account, emails []*account.Email) error {
		return a.UpdateEmail(emails, cmd.Email)
	})

	if err != nil {
		return nil, err
	}

	return em, nil
}
