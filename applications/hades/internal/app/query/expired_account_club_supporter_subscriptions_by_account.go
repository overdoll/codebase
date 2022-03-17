package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ExpiredAccountClubSupporterSubscriptionsByAccount struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type ExpiredAccountClubSupporterSubscriptionsByAccountHandler struct {
	br billing.Repository
}

func NewExpiredAccountClubSupporterSubscriptionsByAccountHandler(br billing.Repository) ExpiredAccountClubSupporterSubscriptionsByAccountHandler {
	return ExpiredAccountClubSupporterSubscriptionsByAccountHandler{br: br}
}

func (h ExpiredAccountClubSupporterSubscriptionsByAccountHandler) Handle(ctx context.Context, cmd ExpiredAccountClubSupporterSubscriptionsByAccount) ([]*billing.ExpiredAccountClubSupporterSubscription, error) {

	expiredAccountClubSupporterSubscriptions, err := h.br.GetExpiredAccountClubSupporterSubscriptionsByAccount(ctx, cmd.Principal, cmd.Cursor, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	return expiredAccountClubSupporterSubscriptions, nil
}
