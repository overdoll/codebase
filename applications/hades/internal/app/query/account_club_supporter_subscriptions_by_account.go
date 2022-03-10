package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountClubSupporterSubscriptionsByAccount struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type AccountClubSupporterSubscriptionsByAccountHandler struct {
	br billing.Repository
}

func NewAccountClubSupporterSubscriptionsByAccountHandler(br billing.Repository) AccountClubSupporterSubscriptionsByAccountHandler {
	return AccountClubSupporterSubscriptionsByAccountHandler{br: br}
}

func (h AccountClubSupporterSubscriptionsByAccountHandler) Handle(ctx context.Context, cmd AccountClubSupporterSubscriptionsByAccount) ([]*billing.AccountClubSupporterSubscription, error) {

	accountClubSupporterSubscriptions, err := h.br.GetAccountClubSupporterSubscriptionsByAccount(ctx, cmd.Principal, cmd.Cursor, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscriptions, nil
}
