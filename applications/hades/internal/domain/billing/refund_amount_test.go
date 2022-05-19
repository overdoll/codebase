package billing

import (
	"github.com/stretchr/testify/require"
	"overdoll/libraries/money"
	"testing"
	"time"
)

func TestGetRefundAmount_MiddleOfSubscription(t *testing.T) {
	t.Parallel()

	lastBillingDate := time.Now().Add(-time.Hour * 24 * 28)
	nextBillingDate := lastBillingDate.Add(time.Hour * 24 * 30)

	result, err := newRefundAmountWithProrated(699, money.USD, lastBillingDate, nextBillingDate)
	require.NoError(t, err, "no error creating prorated refund amount")

	require.Equal(t, 46, int(result.ProratedAmount()), "with only 2 days left in the billing cycle, we refund for the remaining days")
}

func TestGetRefundAmount_OutsideOfSubscription(t *testing.T) {
	t.Parallel()

	lastBillingDate := time.Now().Add(-time.Hour * 24 * 60)
	nextBillingDate := lastBillingDate.Add(time.Hour * 24 * 30)

	result, err := newRefundAmountWithProrated(699, money.USD, lastBillingDate, nextBillingDate)
	require.NoError(t, err, "no error creating prorated refund amount")

	require.Equal(t, 0, int(result.ProratedAmount()), "with a lapsed subscription, 0 should be the prorated amount")
}
