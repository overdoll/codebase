package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/event"
	"overdoll/libraries/principal"
)

type CancelAccountClubSupporterSubscription struct {
	Principal                          *principal.Principal
	CancellationReasonId               string
	AccountClubSupporterSubscriptionId string
}

type CancelAccountClubSupporterSubscriptionHandler struct {
	br    billing.Repository
	event event.Repository
}

func NewCancelAccountClubSupporterSubscriptionHandler(br billing.Repository, event event.Repository) CancelAccountClubSupporterSubscriptionHandler {
	return CancelAccountClubSupporterSubscriptionHandler{br: br, event: event}
}

func (h CancelAccountClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd CancelAccountClubSupporterSubscription) (*billing.AccountClubSupporterSubscription, error) {

	cancellationReason, err := h.br.GetCancellationReasonById(ctx, cmd.CancellationReasonId)

	if err != nil {
		return nil, err
	}

	subscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.AccountClubSupporterSubscriptionId)

	if err != nil {
		return nil, err
	}

	if err := h.event.CancelAccountClubSupporterSubscription(ctx, cmd.Principal, subscription, cancellationReason); err != nil {
		return nil, err
	}

	return subscription, nil
}
