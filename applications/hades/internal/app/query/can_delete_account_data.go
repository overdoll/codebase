package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type CanDeleteAccountData struct {
	AccountId string
}

type CanDeleteAccountDataHandler struct {
	br billing.Repository
}

func NewCanDeleteAccountDataHandler(br billing.Repository) CanDeleteAccountDataHandler {
	return CanDeleteAccountDataHandler{br: br}
}

func (h CanDeleteAccountDataHandler) Handle(ctx context.Context, query CanDeleteAccountData) (*bool, error) {

	hasActive, err := h.br.HasActiveOrCancelledAccountClubSupporterSubscriptions(ctx, nil, query.AccountId)

	if err != nil {
		return nil, err
	}

	canDelete := !*hasActive

	return &canDelete, nil
}
