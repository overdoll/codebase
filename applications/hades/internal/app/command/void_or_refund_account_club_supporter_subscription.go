package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type VoidOrRefundAccountClubSupporterSubscription struct {
	Principal                          *principal.Principal
	AccountId                          string
	ClubId                             string
	AccountClubSupporterSubscriptionId string
	Amount                             int64
}

type VoidOrRefundAccountClubSupporterSubscriptionHandler struct {
	br billing.Repository
	cr ccbill.Repository
}

func NewVoidOrRefundAccountClubSupporterSubscriptionHandler(br billing.Repository, cr ccbill.Repository) VoidOrRefundAccountClubSupporterSubscriptionHandler {
	return VoidOrRefundAccountClubSupporterSubscriptionHandler{br: br, cr: cr}
}

func (h VoidOrRefundAccountClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd VoidOrRefundAccountClubSupporterSubscription) error {

	clubSupporterSubscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.AccountId, cmd.ClubId, cmd.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	if err := clubSupporterSubscription.RequestVoidOrRefund(cmd.Principal); err != nil {
		return err
	}

	voidOrRefund, err := ccbill.NewVoidOrRefundWithCustomAmount(
		*clubSupporterSubscription.CCBillSubscriptionId(),
		cmd.Amount,
		clubSupporterSubscription.BillingAmount(),
		clubSupporterSubscription.BillingCurrency().String(),
	)

	if err != nil {
		return err
	}

	if err := h.cr.VoidOrRefundSubscription(ctx, voidOrRefund); err != nil {
		return err
	}

	return nil
}
