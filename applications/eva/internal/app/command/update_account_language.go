package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type UpdateAccountLanguage struct {
	// the account that is requesting this action
	Principal *principal.Principal
	Locale    string
}

type UpdateAccountLanguageHandler struct {
	ar account.Repository
}

func NewUpdateAccountLanguageHandler(ar account.Repository) UpdateAccountLanguageHandler {
	return UpdateAccountLanguageHandler{ar: ar}
}

func (h UpdateAccountLanguageHandler) Handle(ctx context.Context, cmd UpdateAccountLanguage) (*account.Account, error) {

	usr, err := h.ar.UpdateAccount(ctx, cmd.Principal.AccountId(), func(u *account.Account) error {
		return u.UpdateLanguage(cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
