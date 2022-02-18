package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type ProratedRefundAmountForAccountClubSubscription struct {
	Principal                          *principal.Principal
	ClubId                             string
	AccountClubSupporterSubscriptionId string
}

type ProratedRefundAmountForAccountClubSubscriptionHandler struct {
	br billing.Repository
}

func NewProratedRefundAmountForAccountClubSubscriptionHandler(br billing.Repository) ProratedRefundAmountForAccountClubSubscriptionHandler {
	return ProratedRefundAmountForAccountClubSubscriptionHandler{br: br}
}

func (h ProratedRefundAmountForAccountClubSubscriptionHandler) Handle(ctx context.Context, cmd ProratedRefundAmountForAccountClubSubscription) (*billing.RefundAmount, error) {

	clubSupporterSubscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.ClubId, cmd.AccountClubSupporterSubscriptionId)

	if err != nil {
		return nil, err
	}

	proratedRefundAmount := ccbill.CalculateProratedRefundAmount(
		clubSupporterSubscription.BillingAmount(),
		clubSupporterSubscription.LastBillingDate(),
		clubSupporterSubscription.NextBillingDate(),
	)

	refund, err := billing.NewRefundAmount(proratedRefundAmount, clubSupporterSubscription.BillingCurrency())

	if err != nil {
		return nil, err
	}

	return refund, nil
}
