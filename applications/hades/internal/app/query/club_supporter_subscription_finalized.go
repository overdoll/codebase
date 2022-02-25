package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type ClubSupporterSubscriptionFinalized struct {
	Principal *principal.Principal
	Locker    string
}

type ClubSupporterSubscriptionFinalizedHandler struct {
	br billing.Repository
}

func NewClubSupporterSubscriptionFinalized(br billing.Repository) ClubSupporterSubscriptionFinalizedHandler {
	return ClubSupporterSubscriptionFinalizedHandler{br: br}
}

func (h ClubSupporterSubscriptionFinalizedHandler) Handle(ctx context.Context, cmd ClubSupporterSubscriptionFinalized) (*billing.AccountClubSupporterSubscription, error) {

	locker, err := ccbill.DecryptCCBillPayment(cmd.Locker)

	if err != nil {
		return nil, err
	}

	accountClubSupporterSubscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal, locker.AccountInitiator.AccountId, locker.CcbillClubSupporter.ClubId)

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscription, nil
}
