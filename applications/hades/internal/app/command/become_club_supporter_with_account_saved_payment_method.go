package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/money"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type BecomeClubSupporterWithAccountSavedPaymentMethod struct {
	Principal                   *principal.Principal
	Passport                    *passport.Passport
	Currency                    string
	ClubId                      string
	AccountSavedPaymentMethodId string
}

type BecomeClubSupporterWithAccountSavedPaymentMethodHandler struct {
	br     billing.Repository
	pr     billing.PricingRepository
	cr     ccbill.Repository
	stella StellaService
}

func NewBecomeClubSupporterWithAccountSavedPaymentMethodHandler(br billing.Repository, pr billing.PricingRepository, cr ccbill.Repository, stella StellaService) BecomeClubSupporterWithAccountSavedPaymentMethodHandler {
	return BecomeClubSupporterWithAccountSavedPaymentMethodHandler{br: br, pr: pr, cr: cr, stella: stella}
}

func (h BecomeClubSupporterWithAccountSavedPaymentMethodHandler) Handle(ctx context.Context, cmd BecomeClubSupporterWithAccountSavedPaymentMethod) (*string, error) {

	club, err := h.stella.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	// check to make sure an existing subscription doesn't already exist for this club + account combination
	subscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.ClubId)

	if err != nil && !domainerror.IsNotFoundError(err) {
		return nil, err
	}

	if subscription != nil {
		return nil, domainerror.NewValidation("existing subscription found")
	}

	savedPaymentMethod, err := h.br.GetAccountSavedPaymentMethodByIdOperator(ctx, cmd.Principal.AccountId(), cmd.AccountSavedPaymentMethodId)

	if err != nil {
		return nil, err
	}

	curr, err := money.CurrencyFromString(cmd.Currency)

	if err != nil {
		return nil, err
	}

	price, err := h.pr.GetClubSupporterPricingForCurrency(ctx, curr, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	paymentUrl, err := ccbill.NewChargeByPreviousClubSupporterPaymentUrl(cmd.Principal, club, *savedPaymentMethod.CCBillSubscriptionId(), price)

	if err != nil {
		return nil, err
	}

	// charge by previous transaction
	ccbillTransactionToken, err := h.cr.ChargeByPreviousTransactionId(ctx, paymentUrl)

	if err != nil {
		return nil, err
	}

	return ccbillTransactionToken, nil
}
