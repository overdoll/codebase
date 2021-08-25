package service_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
)

type PostReportReasons struct {
	PostReportReasons *types.PostReportReasonConnection `graphql:"postReportReasons()"`
}

// TestPostReportReasons - get post report reasons
func TestPostReportReasons(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

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

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var reportPost ReportPost

	err := client.Mutate(context.Background(), &reportPost, map[string]interface{}{
		"input": types.ReportPostInput{
			PostID:           "UG9zdDoxcTdNSXFxbmt6ZXczM3E0ZWxYdU4xUmkyN2Q=",
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
				"id":         "UG9zdDoxcTdNSXFxbmt6ZXczM3E0ZWxYdU4xUmkyN2Q=",
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
	require.Equal(t, "QWNjb3VudDoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=", postReports.Entities[0].Post.Reports.Edges[0].Node.Account.Id)
}
