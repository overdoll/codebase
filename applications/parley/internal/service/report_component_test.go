package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"overdoll/applications/parley/internal/app/workflows"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
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
			} `graphql:"reports(from: $from)"`
		} `graphql:"... on Post"`
	} `graphql:"_entities(representations: $representations)"`
}

type PostReports struct {
	PostReports *struct {
		Edges []struct {
			Node PostReportModified
		}
	} `graphql:"postReports(from: $from)"`
}

func TestReportPost(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getHttpClientWithAuthenticatedAccount(t, accountId)

	// post ID has to be random since we can only report once
	postIdRelay := convertPostIdToRelayId(uuid.New().String())
	accountIdRelay := convertAccountIdToRelayId(accountId)
	rule := seedRule(t, false)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ReportPost, mock.Anything)

	var reportPost ReportPost

	err := client.Mutate(context.Background(), &reportPost, map[string]interface{}{
		"input": types.ReportPostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
		},
	})

	require.NoError(t, err, "no error reporting the post")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
	refreshReportsIndex(t)

	var reportsOnPost ReportsOnPost

	err = client.Query(context.Background(), &reportsOnPost, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         string(postIdRelay),
			},
		},
		"from": time.Now(),
	})

	require.NoError(t, err, "no error getting reports on a post")

	// will contain reports
	require.Equal(t, 1, len(reportsOnPost.Entities[0].Post.Reports.Edges))
	// reporting account is correct
	require.Equal(t, string(accountIdRelay), reportsOnPost.Entities[0].Post.Reports.Edges[0].Node.Account.Id)
	require.Equal(t, ruleIdRelay, reportsOnPost.Entities[0].Post.Reports.Edges[0].Node.Rule.ID, "correct rule on the report")

	var postReports PostReports

	err = client.Query(context.Background(), &postReports, map[string]interface{}{
		"from": time.Now(),
	})

	require.NoError(t, err, "no error getting all reports")

	// check we have the correct report listed
	require.Greater(t, len(reportsOnPost.Entities[0].Post.Reports.Edges), 0, "contains more than 0 reports")
	require.Equal(t, ruleIdRelay, reportsOnPost.Entities[0].Post.Reports.Edges[0].Node.Rule.ID, "correct rule on the report")

	grpcClient := getGrpcClient(t)

	_, err = grpcClient.DeleteAccountData(context.Background(), &parley.DeleteAccountDataRequest{AccountId: accountId})

	require.NoError(t, err, "no error deleting account data")

	refreshReportsIndex(t)

	err = client.Query(context.Background(), &reportsOnPost, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         string(postIdRelay),
			},
		},
		"from": time.Now(),
	})

	require.NoError(t, err, "no error getting reports on a post")

	require.Equal(t, 0, len(reportsOnPost.Entities[0].Post.Reports.Edges), "should have no reports after deleting reports for that account")
}
