package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/event"

	"overdoll/applications/eva/internal/domain/account"
)

type NewAccountRegistration struct {
	AccountId string
}

type NewAccountRegistrationHandler struct {
	ur    account.Repository
	event event.Repository
}

func NewNewAccountRegistrationHandler(ur account.Repository, event event.Repository) NewAccountRegistrationHandler {
	return NewAccountRegistrationHandler{ur: ur, event: event}
}

func (h NewAccountRegistrationHandler) Handle(ctx context.Context, cmd NewAccountRegistration) error {

	acc, err := h.ur.GetAccountById(ctx, cmd.AccountId)

	if err != nil {
		return err
	}

	return h.event.NewAccountRegistration(ctx, acc)
}
