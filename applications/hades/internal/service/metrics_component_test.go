package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/money"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type ClubTransactionMetrics struct {
	Entities []struct {
		Club struct {
			Id                 relay.ID
			TransactionMetrics *types.ClubTransactionMetricConnection `graphql:"transactionMetrics()"`
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

func getClubTransactionMetrics(t *testing.T, client *graphql.Client, clubId string) *types.ClubTransactionMetric {

	var clubMetrics ClubTransactionMetrics

	err := client.Query(context.Background(), &clubMetrics, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         convertClubIdIdToRelayId(clubId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing subscriptions")

	require.Len(t, clubMetrics.Entities[0].Club.TransactionMetrics.Edges, 1, "should have 1 metric")

	return clubMetrics.Entities[0].Club.TransactionMetrics.Edges[0].Node
}

func TestMetrics_create_multiple(t *testing.T) {
	t.Parallel()

	clubId := uuid.New().String()

	// run multiple workflows that will create metrics
	for i := 0; i < 10; i++ {

		env := getWorkflowEnvironment()
		env.ExecuteWorkflow(workflows.ClubTransactionMetric, workflows.ClubTransactionMetricInput{
			ClubId:       clubId,
			Timestamp:    time.Now(),
			Id:           uuid.New().String(),
			Amount:       699,
			Currency:     money.USD,
			IsRefund:     false,
			IsChargeback: false,
		})

		require.True(t, env.IsWorkflowCompleted(), "metric successfully seeded")
		require.NoError(t, env.GetWorkflowError(), "metric seeded without errors")
	}

	// run 1 workflow that will create 1 chargeback
	env := getWorkflowEnvironment()
	env.ExecuteWorkflow(workflows.ClubTransactionMetric, workflows.ClubTransactionMetricInput{
		ClubId:       clubId,
		Timestamp:    time.Now(),
		Id:           uuid.New().String(),
		Amount:       699,
		Currency:     money.USD,
		IsRefund:     false,
		IsChargeback: true,
	})
	require.True(t, env.IsWorkflowCompleted(), "metric successfully seeded")
	require.NoError(t, env.GetWorkflowError(), "metric seeded without errors")

	// run 1 workflow that will create 1 refund
	env = getWorkflowEnvironment()
	env.ExecuteWorkflow(workflows.ClubTransactionMetric, workflows.ClubTransactionMetricInput{
		ClubId:       clubId,
		Timestamp:    time.Now(),
		Id:           uuid.New().String(),
		Amount:       399,
		Currency:     money.USD,
		IsRefund:     true,
		IsChargeback: false,
	})
	require.True(t, env.IsWorkflowCompleted(), "metric successfully seeded")
	require.NoError(t, env.GetWorkflowError(), "metric seeded without errors")

	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, uuid.New().String())
	metrics := getClubTransactionMetrics(t, gqlClient, clubId)

	require.Equal(t, 10, metrics.TotalTransactionsCount, "should have 10 transaction count")
	require.Equal(t, 6990, metrics.TotalTransactionsAmount, "should have correct transactions amount")
	require.Equal(t, graphql1.CurrencyUsd, metrics.Currency, "should have correct transaction currency")

	require.Equal(t, 399, metrics.RefundsAmount, "should have 1 refunds amount")
	require.Equal(t, 1, metrics.RefundsCount, "should have 1 refunds count")
	require.Equal(t, 0.1, metrics.RefundsCountRatio, "should have correct refunds ratio")
	require.Equal(t, 0.05708, metrics.RefundsAmountRatio, "should have correct refunds amount")

	require.Equal(t, 699, metrics.ChargebacksAmount, "should have 1 chargebacks amount")
	require.Equal(t, 1, metrics.ChargebacksCount, "should have 1 chargebacks count")
	require.Equal(t, 0.1, metrics.ChargebacksCountRatio, "should have correct chargebacks ratio")
	require.Equal(t, 0.1, metrics.ChargebacksAmountRatio, "should have correct chargebacks amount")
}
