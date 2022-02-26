package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type ClubSupporterSubscriptionFinalized struct {
	ClubId    string
	AccountId string
}

type ClubSupporterSubscriptionFinalizedHandler struct {
	br billing.Repository
}

func NewClubSupporterSubscriptionFinalized(br billing.Repository) ClubSupporterSubscriptionFinalizedHandler {
	return ClubSupporterSubscriptionFinalizedHandler{br: br}
}

func (h ClubSupporterSubscriptionFinalizedHandler) Handle(ctx context.Context, cmd ClubSupporterSubscriptionFinalized) (*billing.AccountClubSupporterSubscription, error) {

	accountClubSupporterSubscription, err := h.br.HasExistingAccountClubSupporterSubscriptionOperator(ctx, cmd.AccountId, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscription, nil
}
