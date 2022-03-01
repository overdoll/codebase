package adapters_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"net/http"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
	"testing"
)

var (
	existingSubscriptionId    = "0222055401000332416"
	exitingVoidSubscriptionId = "0222055401000335775"
)

// non-void subscription "0222059101000249429"

func Test_ChargeByPrevious_Extend_Cancel_Void(t *testing.T) {
	t.Parallel()

	repository := newCCBillHttpRepository(t)

	requester := principal.NewPrincipal(
		ksuid.New().String(),
		[]string{},
		false,
		false,
	)

	chargeUrl, err := ccbill.NewChargeByPreviousClubSupporterPaymentUrl(
		requester,
		ksuid.New().String(),
		existingSubscriptionId,
		billing.UnmarshalPricingFromDatabase(billing.USD, 6.99),
	)

	require.NoError(t, err, "no error generating a chargeByPrevious url")

	token, err := repository.ChargeByPreviousTransactionId(context.Background(), chargeUrl)
	require.NoError(t, err, "no error running charge by previous")

	transactionDetails, err := ccbill.NewTransactionDetailsFromEncryptedToken(requester, *token)
	require.NoError(t, err, "no error getting transaction details from token")

	require.True(t, transactionDetails.Approved(), "transaction should be approved")

	newSubscriptionId := transactionDetails.Id()

	err = repository.ExtendSubscription(context.Background(), newSubscriptionId, 10)
	require.NoError(t, err, "no error extending subscription")

	err = repository.CancelSubscription(context.Background(), newSubscriptionId)
	require.NoError(t, err, "no error cancelling subscription")

	status, err := repository.ViewSubscriptionStatus(context.Background(), newSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.NotNil(t, status.CancelDate(), "should be cancelled")
	require.NotNil(t, status.ExpirationDate(), "should have an expiration date")
	require.Equal(t, ccbill.ActiveAndCancelled, status.SubscriptionStatus(), "should be active and cancelled")

	voidOrRefund, err := ccbill.NewVoidOrRefundWithoutAmount(newSubscriptionId)
	require.NoError(t, err, "no error creating void or refund")

	err = repository.VoidOrRefundSubscription(context.Background(), voidOrRefund)
	require.NoError(t, err, "no error voiding or refunding subscription")

	status, err = repository.ViewSubscriptionStatus(context.Background(), newSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.Equal(t, 1, status.VoidsIssued(), "should have an issued void")
	require.Equal(t, ccbill.Inactive, status.SubscriptionStatus(), "should be active and cancelled")
}

func Test_ViewSubscription_Void(t *testing.T) {
	t.Parallel()

	repository := newCCBillHttpRepository(t)

	status, err := repository.ViewSubscriptionStatus(context.Background(), exitingVoidSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.Equal(t, 1, status.VoidsIssued(), "one void issued")
	require.Equal(t, "2022-02-24 08:41:29 +0000 UTC", status.ExpirationDate(), "expiration date")
	require.Equal(t, "2022-02-24 08:41:29 +0000 UTC", status.CancelDate(), "cancel date")
	require.Equal(t, ccbill.Inactive, status.SubscriptionStatus(), "inactive status")
}

func newCCBillHttpRepository(t *testing.T) adapters.CCBillHttpRepository {
	httpClient := &http.Client{}
	return adapters.NewCCBillHttpRepository(httpClient)
}
