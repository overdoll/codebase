package command

import (
	"context"
	"errors"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type BecomeClubSupporterWithAccountSavedPaymentMethod struct {
	Principal                   *principal.Principal
	ClubId                      string
	AccountSavedPaymentMethodId string
}

type BecomeClubSupporterWithAccountSavedPaymentMethodHandler struct {
	br     billing.Repository
	cr     ccbill.Repository
	stella StellaService
}

func NewBecomeClubSupporterWithAccountSavedPaymentMethodHandler(br billing.Repository, cr ccbill.Repository, stella StellaService) BecomeClubSupporterWithAccountSavedPaymentMethodHandler {
	return BecomeClubSupporterWithAccountSavedPaymentMethodHandler{br: br, cr: cr, stella: stella}
}

func (h BecomeClubSupporterWithAccountSavedPaymentMethodHandler) Handle(ctx context.Context, cmd BecomeClubSupporterWithAccountSavedPaymentMethod) error {

	allowed, err := h.stella.CanAccountBecomeClubSupporter(ctx, cmd.ClubId, cmd.Principal.AccountId())

	if err != nil {
		return err
	}

	if !allowed {
		return errors.New("cannot generate a link - club not accessible")
	}

	// check to make sure an existing subscription doesn't already exist for this club + account combination
	subscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal.AccountId(), cmd.ClubId)

	if err != nil {
		return err
	}

	if subscription {
		return errors.New("existing subscription found")
	}

	savedPaymentMethod, err := h.br.GetAccountSavedPaymentMethodById(ctx, cmd.Principal.AccountId(), cmd.AccountSavedPaymentMethodId)

	if err != nil {
		return err
	}

	paymentUrl, err := ccbill.NewChargeByPreviousClubSupporterPaymentUrl(cmd.Principal, cmd.ClubId, savedPaymentMethod.CCBillSubscriptionId())

	if err != nil {
		return err
	}

	// charge by previous transaction
	if err := h.cr.ChargeByPreviousTransactionId(ctx, paymentUrl); err != nil {
		return err
	}

	return nil
}
