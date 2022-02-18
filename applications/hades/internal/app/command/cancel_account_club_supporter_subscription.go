package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type CancelAccountClubSupporterSubscription struct {
	Principal                          *principal.Principal
	ClubId                             string
	AccountClubSupporterSubscriptionId string
}

type CancelAccountClubSupporterSubscriptionHandler struct {
	br billing.Repository
	cr ccbill.Repository
}

func NewCancelAccountClubSupporterSubscriptionHandler(br billing.Repository, cr ccbill.Repository) CancelAccountClubSupporterSubscriptionHandler {
	return CancelAccountClubSupporterSubscriptionHandler{br: br, cr: cr}
}

func (h CancelAccountClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd CancelAccountClubSupporterSubscription) (*billing.AccountClubSupporterSubscription, error) {

	clubSupporterSubscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.ClubId, cmd.AccountClubSupporterSubscriptionId)

	if err != nil {
		return nil, err
	}

	if err := clubSupporterSubscription.RequestCancel(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.cr.CancelSubscription(ctx, clubSupporterSubscription.CCBillSubscriptionId()); err != nil {
		return nil, err
	}

	return clubSupporterSubscription, nil
}
