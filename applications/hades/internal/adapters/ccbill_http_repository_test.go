package adapters_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"net/http"
	"os"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
	"testing"
)

var (
	existingSubscriptionId = "0222061301000154998"
	refundedSubscriptionId = "0122061301000154282"
	voidedSubscriptionId   = "0122061301000154282"
)

func Test_ChargeByPrevious_Void(t *testing.T) {
	t.Parallel()

	if os.Getenv("BUILDKITE_BUILD_NUMBER") != "" {
		t.Skip("Skipping testing in CI environment")
	}

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

	status, err := repository.ViewSubscriptionStatus(context.Background(), newSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.NotNil(t, status.NextBillingDate(), "should have an issued void")
	require.Equal(t, ccbill.ActiveAndNotCancelled, status.SubscriptionStatus(), "should be active and not cancelled")

	voidOrRefund, err := ccbill.NewVoidOrRefundWithoutAmount(newSubscriptionId)
	require.NoError(t, err, "no error creating void or refund")

	err = repository.VoidOrRefundSubscription(context.Background(), voidOrRefund)
	require.NoError(t, err, "no error voiding or refunding subscription")

	status, err = repository.ViewSubscriptionStatus(context.Background(), newSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.Equal(t, 1, status.RefundsIssued(), "one refund issued")
	require.NotNil(t, status.ExpirationDate(), "expiration date")
	require.NotNil(t, status.CancelDate(), "cancel date")
	require.Equal(t, ccbill.Inactive, status.SubscriptionStatus(), "inactive status")
}

func Test_ChargeByPrevious_Extend_Cancel(t *testing.T) {
	t.Parallel()

	if os.Getenv("BUILDKITE_BUILD_NUMBER") != "" {
		t.Skip("Skipping testing in CI environment")
	}

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

	//err = repository.ExtendSubscription(context.Background(), newSubscriptionId, 10)
	//require.NoError(t, err, "no error extending subscription")

	err = repository.CancelSubscription(context.Background(), newSubscriptionId)
	require.NoError(t, err, "no error cancelling subscription")

	status, err := repository.ViewSubscriptionStatus(context.Background(), newSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.NotNil(t, status.CancelDate(), "should be cancelled")
	require.NotNil(t, status.ExpirationDate(), "should have an expiration date")
	require.Equal(t, ccbill.ActiveAndCancelled, status.SubscriptionStatus(), "should be active and cancelled")
}

func Test_ChargeByPrevious_View_Refunded(t *testing.T) {
	t.Parallel()

	if os.Getenv("BUILDKITE_BUILD_NUMBER") != "" {
		t.Skip("Skipping testing in CI environment")
	}

	repository := newCCBillHttpRepository(t)

	status, err := repository.ViewSubscriptionStatus(context.Background(), refundedSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.Equal(t, 1, status.RefundsIssued(), "one refund issued")
	require.NotNil(t, status.ExpirationDate(), "expiration date")
	require.NotNil(t, status.CancelDate(), "cancel date")
	require.Equal(t, ccbill.Inactive, status.SubscriptionStatus(), "inactive status")
}

func Test_ChargeByPrevious_View_Voided(t *testing.T) {
	t.Parallel()

	if os.Getenv("BUILDKITE_BUILD_NUMBER") != "" {
		t.Skip("Skipping testing in CI environment")
	}

	repository := newCCBillHttpRepository(t)

	status, err := repository.ViewSubscriptionStatus(context.Background(), voidedSubscriptionId)
	require.NoError(t, err, "no error viewing subscription")

	require.Equal(t, 1, status.VoidsIssued(), "one void issued")
	require.NotNil(t, status.ExpirationDate(), "expiration date")
	require.NotNil(t, status.CancelDate(), "cancel date")
	require.Equal(t, ccbill.Inactive, status.SubscriptionStatus(), "inactive status")
}

func newCCBillHttpRepository(t *testing.T) adapters.CCBillHttpRepository {
	httpClient := &http.Client{}
	return adapters.NewCCBillHttpRepository(httpClient)
}
