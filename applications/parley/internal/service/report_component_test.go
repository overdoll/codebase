package service_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
)

type PostReportModified struct {
	Rule    types.Rule
	Account struct {
		Id string
	}
}

type ReportPost struct {
	ReportPost *struct {
		PostReport PostReportModified
	} `graphql:"reportPost(input: $input)"`
}

type ReportsOnPost struct {
	Entities []struct {
		Post struct {
			ID      string
			Reports *struct {
				Edges []struct {
					Node PostReportModified
				}
			} `graphql:"reports(dateRange: $dateRange)"`
		} `graphql:"... on Post"`
	} `graphql:"_entities(representations: $representations)"`
}

type PostReports struct {
	PostReports *struct {
		Edges []struct {
			Node PostReportModified
		}
	} `graphql:"reports(dateRange: $dateRange)"`
}

func TestReportPost(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	// post ID has to be random since we can only report once
	postIdRelay := convertPostIdToRelayId(ksuid.New().String())
	rule := seedRule(t)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	var reportPost ReportPost

	err := client.Mutate(context.Background(), &reportPost, map[string]interface{}{
		"input": types.ReportPostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
		},
	})

	require.NoError(t, err, "no error reporting the post")

	var reportsOnPost ReportsOnPost

	err = client.Query(context.Background(), &reportsOnPost, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         string(postIdRelay),
			},
		},
		"dateRange": types.PostReportDateRange{
			From: time.Now(),
			To:   time.Now(),
		},
	})

	require.NoError(t, err, "no error getting reports on a post")

	// will contain reports
	require.Greater(t, len(reportsOnPost.Entities[0].Post.Reports.Edges), 0)
	// reporting account is correct
	require.Equal(t, "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=", reportsOnPost.Entities[0].Post.Reports.Edges[0].Node.Account.Id)
	require.Equal(t, ruleIdRelay, reportsOnPost.Entities[0].Post.Reports.Edges[0].Node.Rule.ID, "correct rule on the report")

	var postReports PostReports

	err = client.Query(context.Background(), &postReports, map[string]interface{}{
		"dateRange": types.PostReportDateRange{
			From: time.Now(),
			To:   time.Now(),
		},
	})

	require.NoError(t, err, "no error getting all reports")

	// check we have the correct report listed
	require.Greater(t, len(reportsOnPost.Entities[0].Post.Reports.Edges), 0, "contains more than 0 reports")
	require.Equal(t, ruleIdRelay, reportsOnPost.Entities[0].Post.Reports.Edges[0].Node.Rule.ID, "correct rule on the report")
}
