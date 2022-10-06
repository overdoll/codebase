package billing

import (
	"github.com/stretchr/testify/require"
	"overdoll/libraries/location"
	"overdoll/libraries/money"
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
		),
		UnmarshalPricingFromDatabase(money.USD, 699),
	)

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, money.USD, localizedPrice.Currency(), "USD currency")
	require.Equal(t, 699, int(localizedPrice.Amount()), "correct amount")
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
		),
		UnmarshalPricingFromDatabase(money.USD, 699),
	)

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, money.EUR, localizedPrice.Currency(), "EUR currency")
	require.Equal(t, 727, int(localizedPrice.Amount()), "correct amount")
}

func TestGetLocalizedPricingJPY(t *testing.T) {
	t.Parallel()

	localizedPrice, err := GetClubSupporterLocalizedPricingDetails(
		location.UnmarshalLocationFromDatabase(
			"0",
			"JP",
			"",
			"",
			0,
			0,
		),
		UnmarshalPricingFromDatabase(money.USD, 699),
	)

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, money.JPY, localizedPrice.Currency(), "JPY currency")
	require.Equal(t, 1049, int(localizedPrice.Amount()), "correct amount")
}

func TestGetLocalizedPricingCAD(t *testing.T) {
	t.Parallel()

	localizedPrice, err := GetClubSupporterLocalizedPricingDetails(
		location.UnmarshalLocationFromDatabase(
			"0",
			"CA",
			"",
			"",
			0,
			0,
		),
		UnmarshalPricingFromDatabase(money.USD, 699),
	)

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, money.CAD, localizedPrice.Currency(), "CAD currency")
	require.Equal(t, 979, int(localizedPrice.Amount()), "correct amount")
}

func TestGetLocalizedPricingAUD(t *testing.T) {
	t.Parallel()

	localizedPrice, err := GetClubSupporterLocalizedPricingDetails(
		location.UnmarshalLocationFromDatabase(
			"0",
			"AU",
			"",
			"",
			0,
			0,
		),
		UnmarshalPricingFromDatabase(money.USD, 699),
	)

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, money.AUD, localizedPrice.Currency(), "CAD currency")
	require.Equal(t, 1132, int(localizedPrice.Amount()), "correct amount")
}

func TestGetLocalizedPricingGB(t *testing.T) {
	t.Parallel()

	localizedPrice, err := GetClubSupporterLocalizedPricingDetails(
		location.UnmarshalLocationFromDatabase(
			"0",
			"GBR",
			"",
			"",
			0,
			0,
		),
		UnmarshalPricingFromDatabase(money.USD, 699),
	)

	require.NoError(t, err, "no error grabbing price")

	require.Equal(t, money.GBP, localizedPrice.Currency(), "GBP currency")
	require.Equal(t, 643, int(localizedPrice.Amount()), "correct amount")
}
