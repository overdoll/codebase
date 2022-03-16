package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type ExtendAccountClubSupporterSubscription struct {
	Principal                          *principal.Principal
	AccountClubSupporterSubscriptionId string
	Days                               int
}

type ExtendAccountClubSupporterSubscriptionHandler struct {
	br billing.Repository
	cr ccbill.Repository
}

func NewExtendAccountClubSupporterSubscription(br billing.Repository, cr ccbill.Repository) ExtendAccountClubSupporterSubscriptionHandler {
	return ExtendAccountClubSupporterSubscriptionHandler{br: br, cr: cr}
}

func (h ExtendAccountClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd ExtendAccountClubSupporterSubscription) (*billing.AccountClubSupporterSubscription, error) {

	clubSupporterSubscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.AccountClubSupporterSubscriptionId)

	if err != nil {
		return nil, err
	}

	if err := clubSupporterSubscription.RequestExtend(cmd.Principal, cmd.Days); err != nil {
		return nil, err
	}

	if err := h.cr.ExtendSubscription(ctx, *clubSupporterSubscription.CCBillSubscriptionId(), cmd.Days); err != nil {
		return nil, err
	}

	return clubSupporterSubscription, nil
}
