package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type GenerateProratedRefundAmountForAccountClubSubscription struct {
	Principal                          *principal.Principal
	ClubId                             string
	AccountClubSupporterSubscriptionId string
}

type GenerateProratedRefundAmountForAccountClubSubscriptionHandler struct {
	br billing.Repository
}

func NewGenerateProratedRefundAmountForAccountClubSubscriptionHandler(br billing.Repository) GenerateProratedRefundAmountForAccountClubSubscriptionHandler {
	return GenerateProratedRefundAmountForAccountClubSubscriptionHandler{br: br}
}

func (h GenerateProratedRefundAmountForAccountClubSubscriptionHandler) Handle(ctx context.Context, cmd GenerateProratedRefundAmountForAccountClubSubscription) (*billing.RefundAmount, error) {

	clubSupporterSubscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.ClubId, cmd.AccountClubSupporterSubscriptionId)

	if err != nil {
		return nil, err
	}

	refund, err := billing.NewRefundAmountWithProrated(clubSupporterSubscription.BillingAmount(),
		clubSupporterSubscription.BillingCurrency(),
		clubSupporterSubscription.LastBillingDate(),
		clubSupporterSubscription.NextBillingDate(),
	)

	if err != nil {
		return nil, err
	}

	return refund, nil
}
