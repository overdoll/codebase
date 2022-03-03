package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountClubSupporterSubscriptions struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type AccountClubSupporterSubscriptionsHandler struct {
	br billing.Repository
}

func NewAccountClubSupporterSubscriptionsHandler(br billing.Repository) AccountClubSupporterSubscriptionsHandler {
	return AccountClubSupporterSubscriptionsHandler{br: br}
}

func (h AccountClubSupporterSubscriptionsHandler) Handle(ctx context.Context, cmd AccountClubSupporterSubscriptions) ([]*billing.AccountClubSupporterSubscription, error) {

	accountClubSupporterSubscriptions, err := h.br.GetAccountClubSupporterSubscriptions(ctx, cmd.Principal, cmd.Cursor, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscriptions, nil
}
