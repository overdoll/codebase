package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/errors"
	"overdoll/libraries/location"
	"overdoll/libraries/money"
	"overdoll/libraries/support"
)

var clubSupporterSubscriptionPricingTable = table.New(table.Metadata{
	Name: "club_supporter_subscription_pricing",
	Columns: []string{
		"club_id",
		"price",
		"currency",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{},
})

type clubSupporterSubscriptionPricing struct {
	ClubId   string `db:"club_id"`
	Price    uint64 `db:"price"`
	Currency string `db:"currency"`
}

type BillingPricingRepository struct {
	session gocqlx.Session
}

func NewBillingPricingRepository(session gocqlx.Session) BillingPricingRepository {
	return BillingPricingRepository{
		session: session,
	}
}

func (r BillingPricingRepository) getClubSupporterPriceForClub(ctx context.Context, clubId string) (*billing.Price, error) {

	var pricing clubSupporterSubscriptionPricing

	err := r.session.
		Query(clubSupporterSubscriptionPricingTable.Get()).
		WithContext(ctx).
		BindStruct(clubSupporterSubscriptionPricing{ClubId: clubId}).
		GetRelease(&pricing)

	if err != nil && err != gocql.ErrNotFound {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club supporter price")
	}

	if err == gocql.ErrNotFound {
		return billing.GetDefaultPrice(), nil
	}

	curr, err := money.CurrencyFromString(pricing.Currency)
	if err != nil {
		return nil, err
	}

	return billing.UnmarshalPricingFromDatabase(curr, pricing.Price), nil
}

func (r BillingPricingRepository) GetClubSupporterPricing(ctx context.Context, location *location.Location, clubId string) (*billing.Price, []*billing.Price, error) {

	clubPrice, err := r.getClubSupporterPriceForClub(ctx, clubId)
	if err != nil {
		return nil, nil, err
	}

	localizedPrice, err := billing.GetClubSupporterLocalizedPricingDetails(location, clubPrice)
	if err != nil {
		return nil, nil, err
	}

	allPrices, err := billing.GetClubSupporterAllPricingDetails(clubPrice)
	if err != nil {
		return nil, nil, err
	}

	return localizedPrice, allPrices, nil
}

func (r BillingPricingRepository) GetClubSupporterPricingForCurrency(ctx context.Context, currency money.Currency, clubId string) (*billing.Price, error) {

	clubPrice, err := r.getClubSupporterPriceForClub(ctx, clubId)
	if err != nil {
		return nil, err
	}

	return billing.GetClubSupporterPricingForCurrency(currency, clubPrice)
}
