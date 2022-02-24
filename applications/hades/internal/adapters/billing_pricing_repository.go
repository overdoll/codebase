package adapters

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/location"
)

type BillingPricingRepository struct {
	session gocqlx.Session
}

func NewBillingPricingRepository(session gocqlx.Session) BillingPricingRepository {
	return BillingPricingRepository{session: session}
}

func (r BillingPricingRepository) GetClubSupporterPricingForLocation(ctx context.Context, location *location.Location, clubId string) (*billing.Price, error) {
	return billing.GetClubSupporterLocalizedPricingDetails(location)
}

func (r BillingPricingRepository) GetClubSupporterAllPricing(ctx context.Context, clubId string) ([]*billing.Price, error) {
	return billing.GetClubSupporterAllPricingDetails()
}

func (r BillingPricingRepository) GetClubSupporterPricingForCurrency(ctx context.Context, currency billing.Currency, clubId string) (*billing.Price, error) {
	return billing.GetClubSupporterPricingForCurrency(currency)
}
