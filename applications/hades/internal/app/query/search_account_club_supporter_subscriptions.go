package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchAccountClubSupporterSubscriptions struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
	Status    []string
}

type SearchAccountClubSupporterSubscriptionsHandler struct {
	br billing.Repository
}

func NewSearchAccountClubSupporterSubscriptionsHandler(br billing.Repository) SearchAccountClubSupporterSubscriptionsHandler {
	return SearchAccountClubSupporterSubscriptionsHandler{br: br}
}

func (h SearchAccountClubSupporterSubscriptionsHandler) Handle(ctx context.Context, query SearchAccountClubSupporterSubscriptions) ([]*billing.AccountClubSupporterSubscription, error) {

	filters, err := billing.NewAccountClubSupporterSubscriptionFilters(query.AccountId, query.Status)

	if err != nil {
		return nil, err
	}

	accountClubSupporterSubscriptions, err := h.br.SearchAccountClubSupporterSubscriptions(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscriptions, nil
}
