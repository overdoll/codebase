package service_test

import (
	"context"
	"encoding/base64"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"
)

type RefundAccountTransaction struct {
	RefundAccountTransaction *struct {
		Id string
	} `graphql:"refundAccountTransaction(input: $input)"`
}

type GenerateRefundAmountForAccountTransaction struct {
	GenerateRefundAmountForAccountTransaction *types.GenerateRefundAmountForAccountTransactionPayload `graphql:"generateRefundAmountForAccountTransaction(input: $input)"`
}

func TestAccountTransactionRefund(t *testing.T) {

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	transactionId := uuid.New().String()
	clubId := uuid.New().String()

	// once again, do another new sale success webhook, since this sets up everything we need for the following test
	// club ID will be a different ID because that's what the subscription is for
	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, transactionId, clubId, nil)

	accountTransactionRelayId := relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.AccountTransaction{}, transactionId))))

	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// generate a refund amount
	var generateProratedRefund GenerateRefundAmountForAccountTransaction

	err := gqlClient.Mutate(context.Background(), &generateProratedRefund, map[string]interface{}{
		"input": types.GenerateRefundAmountForAccountTransactionInput{
			AccountTransactionID: accountTransactionRelayId,
		},
	})

	require.NoError(t, err, "no error generating prorated refund")
	require.Less(t, generateProratedRefund.GenerateRefundAmountForAccountTransaction.RefundAmount.ProratedAmount, 699, "correct amount")
	require.Equal(t, 699, generateProratedRefund.GenerateRefundAmountForAccountTransaction.RefundAmount.MaximumAmount, "correct max amount")
	require.Equal(t, types.CurrencyUsd, generateProratedRefund.GenerateRefundAmountForAccountTransaction.RefundAmount.Currency, "correct max amount")

	// void or refund subscription
	var voidOrRefund RefundAccountTransaction

	err = gqlClient.Mutate(context.Background(), &voidOrRefund, map[string]interface{}{
		"input": types.RefundAccountTransactionInput{
			AccountTransactionID: accountTransactionRelayId,
			Amount:               generateProratedRefund.GenerateRefundAmountForAccountTransaction.RefundAmount.ProratedAmount,
		},
	})

	require.NoError(t, err, "no error refunding transaction")
	require.NotNil(t, voidOrRefund.RefundAccountTransaction.Id, "id exists")
}
