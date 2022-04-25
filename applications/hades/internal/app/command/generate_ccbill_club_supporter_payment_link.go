package command

import (
	"context"
	"errors"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/money"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type GenerateCCBillClubSupportPaymentLink struct {
	Principal           *principal.Principal
	Passport            *passport.Passport
	ClubId              string
	Currency            string
	SavePaymentForLater bool
}

type GenerateCCBillClubSupportPaymentLinkHandler struct {
	br     billing.Repository
	pr     billing.PricingRepository
	stella StellaService
	eva    EvaService
}

func NewGenerateCCBillClubSupportPaymentLinkHandler(br billing.Repository, pr billing.PricingRepository, stella StellaService, eva EvaService) GenerateCCBillClubSupportPaymentLinkHandler {
	return GenerateCCBillClubSupportPaymentLinkHandler{br: br, pr: pr, stella: stella, eva: eva}
}

func (h GenerateCCBillClubSupportPaymentLinkHandler) Handle(ctx context.Context, cmd GenerateCCBillClubSupportPaymentLink) (*ccbill.ClubSupporterPaymentLink, error) {

	allowed, err := h.stella.CanAccountBecomeClubSupporter(ctx, cmd.ClubId, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	if !allowed {
		return nil, errors.New("cannot generate a link - club not accessible")
	}

	// check to make sure an existing subscription doesn't already exist for this club + account combination
	subscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.ClubId)

	if err != nil && err != billing.ErrAccountClubSupportSubscriptionNotFound {
		return nil, err
	}

	if subscription != nil {
		return nil, errors.New("existing subscription found")
	}

	curr, err := money.CurrencyFromString(cmd.Currency)

	if err != nil {
		return nil, err
	}

	price, err := h.pr.GetClubSupporterPricingForCurrency(ctx, curr, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	paymentLink, err := ccbill.NewClubSupporterPaymentLink(cmd.Principal, cmd.ClubId, cmd.SavePaymentForLater, price)

	if err != nil {
		return nil, err
	}

	return paymentLink, nil
}
