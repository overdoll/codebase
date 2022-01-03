package service_test

import (
	"context"
	"encoding/base64"
	"testing"
	"time"

	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type PostReportReasons struct {
	PostReportReasons *types.PostReportReasonConnection `graphql:"postReportReasons()"`
}

// TestPostReportReasons - get post report reasons
func TestPostReportReasons(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	var search PostReportReasons

	err := client.Query(context.Background(), &search, nil)

	require.NoError(t, err)
	require.Len(t, search.PostReportReasons.Edges, 2)
	require.Equal(t, "Some report reason", search.PostReportReasons.Edges[0].Node.Reason)
}

type PostReportModified struct {
	PostReportReason types.PostReportReason
	Account          struct {
		Id string
	}
}

type ReportPost struct {
	ReportPost *struct {
		PostReport PostReportModified
	} `graphql:"reportPost(input: $input)"`
}

type PostReports struct {
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

func TestReportPost(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	// post ID has to be random since we can only report once
	postId := base64.StdEncoding.EncodeToString([]byte("Post:" + ksuid.New().String()))

	var reportPost ReportPost

	err := client.Mutate(context.Background(), &reportPost, map[string]interface{}{
		"input": types.ReportPostInput{
			PostID:           relay.ID(postId),
			PostReportReason: "UG9zdFJlcG9ydFJlYXNvbjoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=",
		},
	})

	require.NoError(t, err)

	require.Equal(t, "Some report reason #2", reportPost.ReportPost.PostReport.PostReportReason.Reason)

	var postReports PostReports

	err = client.Query(context.Background(), &postReports, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         postId,
			},
		},
		"dateRange": types.PostReportDateRange{
			From: time.Now(),
			To:   time.Now(),
		},
	})

	require.NoError(t, err)

	// will contain reports
	require.Greater(t, len(postReports.Entities[0].Post.Reports.Edges), 0)
	// reporting account is correct
	require.Equal(t, "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=", postReports.Entities[0].Post.Reports.Edges[0].Node.Account.Id)
}
