package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
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
	stella StingService
}

func NewGenerateCCBillClubSupportPaymentLinkHandler(br billing.Repository, pr billing.PricingRepository, stella StingService) GenerateCCBillClubSupportPaymentLinkHandler {
	return GenerateCCBillClubSupportPaymentLinkHandler{br: br, pr: pr, stella: stella}
}

func (h GenerateCCBillClubSupportPaymentLinkHandler) Handle(ctx context.Context, cmd GenerateCCBillClubSupportPaymentLink) (*ccbill.ClubSupporterPaymentLink, error) {

	club, err := h.stella.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	// check to make sure an existing subscription doesn't already exist for this club + account combination
	subscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.ClubId)

	if err != nil && !apperror.IsNotFoundError(err) {
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

	paymentLink, err := ccbill.NewClubSupporterPaymentLink(cmd.Principal, club, cmd.SavePaymentForLater, price)

	if err != nil {
		return nil, err
	}

	return paymentLink, nil
}
