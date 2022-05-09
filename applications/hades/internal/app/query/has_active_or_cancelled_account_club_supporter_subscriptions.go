package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type HasActiveOrCancelledAccountClubSupporterSubscriptions struct {
	Principal *principal.Principal
	AccountId string
}

type HasActiveOrCancelledAccountClubSupporterSubscriptionsHandler struct {
	br billing.Repository
}

func NewHasActiveOrCancelledAccountClubSupporterSubscriptionsHandler(br billing.Repository) HasActiveOrCancelledAccountClubSupporterSubscriptionsHandler {
	return HasActiveOrCancelledAccountClubSupporterSubscriptionsHandler{br: br}
}

func (h HasActiveOrCancelledAccountClubSupporterSubscriptionsHandler) Handle(ctx context.Context, query HasActiveOrCancelledAccountClubSupporterSubscriptions) (*bool, error) {
	return h.br.HasActiveOrCancelledAccountClubSupporterSubscriptions(ctx, query.Principal, query.AccountId)
}
