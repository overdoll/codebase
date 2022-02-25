package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type CancelAccountClubSupporterSubscription struct {
	Principal                          *principal.Principal
	AccountId                          string
	ClubId                             string
	CancellationReasonId               string
	AccountClubSupporterSubscriptionId string
}

type CancelAccountClubSupporterSubscriptionHandler struct {
	br  billing.Repository
	cr  ccbill.Repository
	car cancellation.Repository
}

func NewCancelAccountClubSupporterSubscriptionHandler(br billing.Repository, cr ccbill.Repository, car cancellation.Repository) CancelAccountClubSupporterSubscriptionHandler {
	return CancelAccountClubSupporterSubscriptionHandler{br: br, cr: cr, car: car}
}

func (h CancelAccountClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd CancelAccountClubSupporterSubscription) (*billing.AccountClubSupporterSubscription, error) {

	cancellationReason, err := h.car.GetReasonById(ctx, cmd.CancellationReasonId)

	if err != nil {
		return nil, err
	}

	clubSupporterSubscription, err := h.br.UpdateAccountClubSupporterCancel(ctx, cmd.Principal, cmd.AccountId, cmd.ClubId, cmd.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {

		if err := h.cr.CancelSubscription(ctx, subscription.CCBillSubscriptionId()); err != nil {
			return err
		}

		return subscription.RequestCancel(cmd.Principal, cancellationReason)
	})

	return clubSupporterSubscription, nil
}
