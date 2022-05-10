package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountClubSupporterSubscriptionByAccountAndClubId struct {
	Principal *principal.Principal
	AccountId string
	ClubId    string
}

type AccountClubSupporterSubscriptionByAccountAndClubIdHandler struct {
	br billing.Repository
}

func NewAccountClubSupporterSubscriptionByAccountAndClubIdHandler(br billing.Repository) AccountClubSupporterSubscriptionByAccountAndClubIdHandler {
	return AccountClubSupporterSubscriptionByAccountAndClubIdHandler{br: br}
}

func (h AccountClubSupporterSubscriptionByAccountAndClubIdHandler) Handle(ctx context.Context, cmd AccountClubSupporterSubscriptionByAccountAndClubId) (*billing.AccountClubSupporterSubscription, error) {

	accountClubSupporterSubscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal, cmd.AccountId, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscription, nil
}
