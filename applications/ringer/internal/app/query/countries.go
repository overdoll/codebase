package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type Countries struct{}

type CountriesHandler struct{}

func NewCountriesHandler() CountriesHandler {
	return CountriesHandler{}
}

func (h CountriesHandler) Handle(ctx context.Context) ([]*payout.CountryWithMethod, error) {
	return payout.GetAllCountriesWithPayoutMethods(), nil
}
