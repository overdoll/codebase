package billing

import (
	"github.com/stretchr/testify/require"
	"overdoll/libraries/location"
	"testing"
)

func TestGetLocalizedPricingDefault(t *testing.T) {
	t.Parallel()

	localizedPrice, err := GetClubSupporterLocalizedPricingDetails(
		location.UnmarshalLocationFromDatabase(
			"0",
			"",
			"",
			"",
			0,
			0,
		))

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, USD, localizedPrice.Currency(), "USD currency")
	require.Equal(t, int64(699), localizedPrice.Amount(), "correct amount")
}

func TestGetLocalizedPricingEU(t *testing.T) {
	t.Parallel()

	localizedPrice, err := GetClubSupporterLocalizedPricingDetails(
		location.UnmarshalLocationFromDatabase(
			"0",
			"FI",
			"",
			"",
			0,
			0,
		))

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, EUR, localizedPrice.Currency(), "EUR currency")
	require.Equal(t, int64(769), localizedPrice.Amount(), "correct amount")
}