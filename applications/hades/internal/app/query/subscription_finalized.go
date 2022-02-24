package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type SubscriptionFinalized struct {
	Principal *principal.Principal
	ClubId    string
	Locker    string
}

type SubscriptionFinalizedHandler struct {
	br billing.Repository
}

func NewSubscriptionFinalized(br billing.Repository) SubscriptionFinalizedHandler {
	return SubscriptionFinalizedHandler{br: br}
}

func (h SubscriptionFinalizedHandler) Handle(ctx context.Context, cmd SubscriptionFinalized) (*billing.AccountClubSupporterSubscription, error) {

	clubId := cmd.ClubId

	if clubId == "" {

		locker, err := ccbill.DecryptCCBillPayment(cmd.Locker)

		if err != nil {
			return nil, err
		}

		clubId = locker.CcbillClubSupporter.ClubId
	}

	accountClubSupporterSubscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal, cmd.Principal.AccountId(), clubId)

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscription, nil
}
