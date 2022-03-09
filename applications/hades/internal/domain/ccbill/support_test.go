package ccbill

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestParseCCBillDateWithTime(t *testing.T) {
	t.Parallel()

	tm, err := ParseCCBillDateWithTime("2022-02-26 08:21:49")
	require.NoError(t, err, "no error parsing date with time")
	require.Equal(t, "2022-02-26 08:21:49 -0700 MST", tm.String())
}

func TestParseCCBillDate(t *testing.T) {
	t.Parallel()

	tm, err := ParseCCBillDate("2022-02-26")
	require.NoError(t, err, "no error parsing date")
	require.Equal(t, "2022-02-26 00:00:00 +0000 UTC", tm.String())
}

type convertAmountTest struct {
	currencyCode   int
	amount         int64
	expectedAmount float64
}

func TestConvertAmountToCCBillFloat(t *testing.T) {
	t.Parallel()

	var convertTests = []convertAmountTest{
		{
			currencyCode:   840,
			amount:         699,
			expectedAmount: 6.99,
		},
		{
			currencyCode:   978,
			amount:         699,
			expectedAmount: 6.99,
		},
		{
			currencyCode:   036,
			amount:         699,
			expectedAmount: 6.99,
		},
		{
			currencyCode:   826,
			amount:         699,
			expectedAmount: 6.99,
		},
		{
			currencyCode:   124,
			amount:         699,
			expectedAmount: 6.99,
		},
		{
			currencyCode:   392,
			amount:         699,
			expectedAmount: 699,
		},
	}

	for _, test := range convertTests {
		res, err := ConvertAmountToCCBillFloat(test.amount, test.currencyCode)
		require.NoError(t, err, "no error converting amount to float")
		require.Equal(t, test.expectedAmount, res, "expected amount to match")
	}
}

type parseFloatTest struct {
	currency       string
	amount         string
	expectedAmount int64
}

func TestParseCCBillCurrencyAmount(t *testing.T) {
	t.Parallel()

	var parseTests = []parseFloatTest{
		{
			currency:       "USD",
			amount:         "6.99",
			expectedAmount: 699,
		},
		{
			currency:       "AUD",
			amount:         "6.99",
			expectedAmount: 699,
		},
		{
			currency:       "CAD",
			amount:         "6.99",
			expectedAmount: 699,
		},
		{
			currency:       "GBP",
			amount:         "6.99",
			expectedAmount: 699,
		},
		{
			currency:       "EUR",
			amount:         "6.99",
			expectedAmount: 699,
		},
		{
			currency:       "JPY",
			amount:         "300",
			expectedAmount: 300,
		},
	}

	for _, test := range parseTests {
		res, err := ParseCCBillCurrencyAmount(test.amount, test.currency)
		require.NoError(t, err, "no error parsing float to amount")
		require.Equal(t, test.expectedAmount, res, "expected amount to match")
	}
}
