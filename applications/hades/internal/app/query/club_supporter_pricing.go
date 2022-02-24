package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/passport"
)

type ClubSupporterPricing struct {
	Passport *passport.Passport
	ClubId   string
}

type ClubSupporterPricingHandler struct {
	pr  billing.PricingRepository
	eva EvaService
}

func NewClubSupporterPricingHandler(pr billing.PricingRepository, eva EvaService) ClubSupporterPricingHandler {
	return ClubSupporterPricingHandler{pr: pr, eva: eva}
}

func (h ClubSupporterPricingHandler) Handle(ctx context.Context, cmd ClubSupporterPricing) (*billing.Price, []*billing.Price, error) {

	loc, err := h.eva.LocationFromIp(ctx, cmd.Passport.IP())

	if err != nil {
		return nil, nil, err
	}

	pricing, err := h.pr.GetClubSupporterPricingForLocation(ctx, loc, cmd.ClubId)

	if err != nil {
		return nil, nil, err
	}

	allPrices, err := h.pr.GetClubSupporterAllPricing(ctx, cmd.ClubId)

	if err != nil {
		return nil, nil, err
	}

	return pricing, allPrices, nil
}
