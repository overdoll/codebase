package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type VoidOrRefundAccountClubSupporterSubscription struct {
	Principal                          *principal.Principal
	ClubId                             string
	AccountClubSupporterSubscriptionId string
	Amount                             *float64
}

type VoidOrRefundAccountClubSupporterSubscriptionHandler struct {
	br billing.Repository
	cr ccbill.Repository
}

func NewVoidOrRefundAccountClubSupporterSubscriptionHandler(br billing.Repository, cr ccbill.Repository) VoidOrRefundAccountClubSupporterSubscriptionHandler {
	return VoidOrRefundAccountClubSupporterSubscriptionHandler{br: br, cr: cr}
}

func (h VoidOrRefundAccountClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd VoidOrRefundAccountClubSupporterSubscription) (*billing.AccountClubSupporterSubscription, error) {

	clubSupporterSubscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.ClubId, cmd.AccountClubSupporterSubscriptionId)

	if err != nil {
		return nil, err
	}

	if err := clubSupporterSubscription.RequestVoidOrRefund(cmd.Principal); err != nil {
		return nil, err
	}

	var voidOrRefund *ccbill.VoidOrRefund

	if cmd.Amount != nil {
		// create a voidOrRefund object which will calculate the correct amount, if one was passed in
		voidOrRefund, err = ccbill.NewVoidOrRefundWithCustomAmount(
			clubSupporterSubscription.CCBillSubscriptionId(),
			*cmd.Amount,
			clubSupporterSubscription.BillingAmount(),
		)
	} else {
		voidOrRefund, err = ccbill.NewVoidOrRefundWithoutAmount(
			clubSupporterSubscription.CCBillSubscriptionId(),
		)
	}

	if err != nil {
		return nil, err
	}

	if err := h.cr.VoidOrRefundSubscription(ctx, voidOrRefund); err != nil {
		return nil, err
	}

	return clubSupporterSubscription, nil
}
