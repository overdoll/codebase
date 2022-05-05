package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"testing"
)

type ClubTransactionMetrics struct {
	Entities []struct {
		Club struct {
			Id                 relay.ID
			TransactionMetrics *types.ClubTransactionMetricConnection `graphql:"transactionMetrics(status: [ACTIVE])"`
		} `graphql:"... on Account"`
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
