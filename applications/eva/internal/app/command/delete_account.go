package command

import (
	"context"
	"errors"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/event"
	"overdoll/libraries/principal"
)

type DeleteAccount struct {
	Principal *principal.Principal
	AccountId string
}

type DeleteAccountHandler struct {
	ar     account.Repository
	event  event.Repository
	hades  HadesService
	stella StellaService
}

func NewDeleteAccountHandler(ar account.Repository, event event.Repository, hades HadesService, stella StellaService) DeleteAccountHandler {
	return DeleteAccountHandler{ar: ar, event: event, hades: hades, stella: stella}
}

func (h DeleteAccountHandler) Handle(ctx context.Context, cmd DeleteAccount) (*account.Account, error) {

	acc, err := h.ar.GetAccountById(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	ok, err := h.hades.CanDeleteAccountData(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	if !ok {
		return nil, errors.New("cannot delete account")
	}

	ok, err = h.stella.CanDeleteAccountData(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	if !ok {
		return nil, errors.New("cannot delete account")
	}

	if err := h.event.DeleteAccount(ctx, cmd.Principal, acc); err != nil {
		return nil, err
	}

	return acc, nil
}
