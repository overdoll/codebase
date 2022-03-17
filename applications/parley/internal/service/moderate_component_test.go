package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/app/workflows"
	"overdoll/applications/parley/internal/ports/graphql/types"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type PostAuditLogModified struct {
	Rule  *types.Rule
	Notes *string
	ID    string
	Post  struct {
		ID relay.ID
	}
	Action types.PostAuditLogAction
}

type ClubInfractionHistory struct {
	Entities []struct {
		Club struct {
			ID                string
			InfractionHistory *struct {
				Edges []struct {
					Node ClubInfractionHistoryModified
				}
			} `graphql:"infractionHistory()"`
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

type ClubInfractionHistoryModified struct {
	ID     relay.ID
	Source types.ClubInfractionHistorySource
}

func getClubInfractionHistory(t *testing.T, client *graphql.Client, clubId relay.ID) ClubInfractionHistory {

	var clubInfractionHistory ClubInfractionHistory

	err := client.Query(context.Background(), &clubInfractionHistory, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         clubId,
			},
		},
	})

	require.NoError(t, err, "no error getting club infraction history")

	return clubInfractionHistory
}

type AccountPostAuditLogs struct {
	Entities []struct {
		Account struct {
			ID            string
			PostAuditLogs *struct {
				Edges []struct {
					Node PostAuditLogModified
				}
			} `graphql:"postAuditLogs(from: $from)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func auditLogsForModeratorAccount(t *testing.T, client *graphql.Client, accountId string) AccountPostAuditLogs {

	var account AccountPostAuditLogs

	err := client.Query(context.Background(), &account, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"from": time.Now(),
	})

	require.NoError(t, err)

	return account
}

type PostModified struct {
	ID string
}

type PostAuditLogs struct {
	Entities []struct {
		Post struct {
			ID        string
			Rule      *types.Rule
			AuditLogs *struct {
				Edges []struct {
					Node PostAuditLogModified
				}
			} `graphql:"auditLogs()"`
		} `graphql:"... on Post"`
	} `graphql:"_entities(representations: $representations)"`
}

func auditLogsForPost(t *testing.T, client *graphql.Client, postId relay.ID) PostAuditLogs {

	var account PostAuditLogs

	err := client.Query(context.Background(), &account, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         string(postId),
			},
		},
	})

	require.NoError(t, err)

	return account
}

type RemovePost struct {
	RemovePost *struct {
		Post PostModified
	} `graphql:"removePost(input: $input)"`
}

func TestModeratePost_remove(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()

	client := getHttpClientWithAuthenticatedAccount(t, accountId)

	var removePost RemovePost

	postIdRelay := convertPostIdToRelayId(uuid.New().String())
	rule := seedRule(t, false)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.RemovePost, mock.Anything)

	err := client.Mutate(context.Background(), &removePost, map[string]interface{}{
		"input": types.RemovePostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
		},
	})

	require.NoError(t, err, "no error removing post")

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "remove post workflow correct")
	require.NoError(t, env.GetWorkflowError(), "remove post workflow no error")

	logs := auditLogsForModeratorAccount(t, client, accountId)

	require.Len(t, logs.Entities[0].Account.PostAuditLogs.Edges, 1, "should have 1 audit log")

	require.Equal(t, types.PostAuditLogActionRemoved, logs.Entities[0].Account.PostAuditLogs.Edges[0].Node.Action, "should be denied")
	require.Equal(t, ruleIdRelay, logs.Entities[0].Account.PostAuditLogs.Edges[0].Node.Rule.ID, "correct rule was set")

	posts := auditLogsForPost(t, client, postIdRelay)

	require.Len(t, posts.Entities[0].Post.AuditLogs.Edges, 1)

	require.Equal(t, types.PostAuditLogActionRemoved, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action, "should be denied")
	require.Equal(t, ruleIdRelay, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Rule.ID, "correct rule was set")

	require.NotNil(t, posts.Entities[0].Post.Rule, "rule exists on post")
	require.Equal(t, ruleIdRelay, posts.Entities[0].Post.Rule.ID, "rule exists on post")
}

type RejectPost struct {
	RejectPost *struct {
		Post PostModified
	} `graphql:"rejectPost(input: $input)"`
}

func TestModeratePost_reject(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()

	client := getHttpClientWithAuthenticatedAccount(t, accountId)

	notes := "some additional notes"
	postId := uuid.New().String()
	postIdRelay := convertPostIdToRelayId(postId)

	rule := seedRule(t, true)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	seedPostModerator(t, accountId, postId)

	postModeratorQueue := accountPostModeratorQueue(t, client, accountId)
	require.Len(t, postModeratorQueue.Entities[0].Account.PostModeratorQueue.Edges, 1, "should be in queue")

	var rejectPost RejectPost

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.RejectPost, workflows.RejectPostInput{
		AccountId: accountId,
		PostId:    postId,
		ClubId:    postId,
		RuleId:    rule.ID(),
		Notes:     &notes,
	})

	err := client.Mutate(context.Background(), &rejectPost, map[string]interface{}{
		"input": types.RejectPostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
			Notes:  &notes,
		},
	})

	require.NoError(t, err, "no error rejecting post")

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "reject post workflow correct")
	require.NoError(t, env.GetWorkflowError(), "reject post workflow no error")

	logs := auditLogsForModeratorAccount(t, client, accountId)

	require.Len(t, logs.Entities[0].Account.PostAuditLogs.Edges, 1, "should have 1 audit log")

	require.Equal(t, types.PostAuditLogActionDenied, logs.Entities[0].Account.PostAuditLogs.Edges[0].Node.Action, "should be denied")
	require.Equal(t, &notes, logs.Entities[0].Account.PostAuditLogs.Edges[0].Node.Notes, "correct note was added")
	require.Equal(t, ruleIdRelay, logs.Entities[0].Account.PostAuditLogs.Edges[0].Node.Rule.ID, "correct rule was set")

	posts := auditLogsForPost(t, client, postIdRelay)

	require.Len(t, posts.Entities[0].Post.AuditLogs.Edges, 1)

	require.Equal(t, types.PostAuditLogActionDenied, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action, "should be denied")
	require.Equal(t, &notes, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Notes, "correct note was added")
	require.Equal(t, ruleIdRelay, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Rule.ID, "correct rule was set")

	postModeratorQueue = accountPostModeratorQueue(t, client, accountId)
	require.Len(t, postModeratorQueue.Entities[0].Account.PostModeratorQueue.Edges, 0, "should no longer be in queue")

	require.NotNil(t, posts.Entities[0].Post.Rule, "rule exists on post")
	require.Equal(t, ruleIdRelay, posts.Entities[0].Post.Rule.ID, "rule exists on post")
}

func TestModeratePost_reject_with_infraction(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()

	client := getHttpClientWithAuthenticatedAccount(t, accountId)

	postId := uuid.New().String()
	postIdRelay := convertPostIdToRelayId(postId)
	clubId := convertClubIdToRelayId(postId)

	rule := seedRuleInfraction(t)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())
	seedPostModerator(t, accountId, postId)

	postModeratorQueue := accountPostModeratorQueue(t, client, accountId)
	require.Len(t, postModeratorQueue.Entities[0].Account.PostModeratorQueue.Edges, 1, "should be in queue")

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.RejectPost, workflows.RejectPostInput{
		AccountId: accountId,
		PostId:    postId,
		ClubId:    postId,
		RuleId:    rule.ID(),
		Notes:     nil,
	})

	var rejectPost RejectPost

	err := client.Mutate(context.Background(), &rejectPost, map[string]interface{}{
		"input": types.RejectPostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
		},
	})

	require.NoError(t, err, "no error rejecting a post with infraction")

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "reject post workflow correct")
	require.NoError(t, env.GetWorkflowError(), "reject post workflow no error")

	clubInfractionHistory := getClubInfractionHistory(t, client, clubId)

	require.Equal(t, 1, len(clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges), "should have 1 infraction history")
	require.Equal(t, types.ClubInfractionHistorySourcePostModerationRejection, clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges[0].Node.Source, "correct source")

	postModeratorQueue = accountPostModeratorQueue(t, client, accountId)
	require.Len(t, postModeratorQueue.Entities[0].Account.PostModeratorQueue.Edges, 0, "should no longer be in queue")
}

type ApprovePost struct {
	ApprovePost *struct {
		Post PostModified
	} `graphql:"approvePost(input: $input)"`
}

type PostModeratorModified struct {
	Post struct {
		Id string
	}
	ReassignmentAt time.Time
	PlacedAt       time.Time
}

type AccountPostModeratorQueue struct {
	Entities []struct {
		Account struct {
			ID                 string
			PostModeratorQueue *struct {
				Edges []struct {
					Node PostModeratorModified
				}
			} `graphql:"postModeratorQueue()"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func accountPostModeratorQueue(t *testing.T, client *graphql.Client, accountId string) AccountPostModeratorQueue {
	var postModeratorQueue AccountPostModeratorQueue

	err := client.Query(context.Background(), &postModeratorQueue, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err, "no error checking post moderator queue")
	return postModeratorQueue
}

func TestPutPostIntoModeratorQueue_and_approve(t *testing.T) {
	t.Parallel()

	// clear moderators table, and add a new moderator that will be used for this test
	accountId := uuid.New().String()
	clearModeratorsTableAndSeedModerator(t, accountId)

	grpcClient := getGrpcClient(t)

	postId := uuid.New().String()

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.PutPostIntoModeratorQueue, mock.Anything)

	res, err := grpcClient.PutPostIntoModeratorQueueOrPublish(context.Background(), &parley.PutPostIntoModeratorQueueOrPublishRequest{
		PostId: postId,
	})

	require.NoError(t, err, "no error putting post into moderator queue or publishing")
	require.True(t, res.PutIntoReview, "should have been put into review")

	env := getWorkflowEnvironment(t)

	// during our delayed callback, we want to make sure the post is being "moderated"
	env.RegisterDelayedCallback(func() {

		client := getHttpClientWithAuthenticatedAccount(t, accountId)

		// now, we check that this post exists in the account's post queue
		postModeratorQueue := accountPostModeratorQueue(t, client, accountId)

		require.Len(t, postModeratorQueue.Entities, 1, "should have found 1 entity")
		require.Len(t, postModeratorQueue.Entities[0].Account.PostModeratorQueue.Edges, 1, "should have found 1 item in queue")

		approveWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.ApprovePost, mock.Anything)

		// now, go through the motion of actually approving our post
		var approvePost ApprovePost

		err = client.Mutate(context.Background(), &approvePost, map[string]interface{}{
			"input": types.ApprovePostInput{
				PostID: convertPostIdToRelayId(postId),
			},
		})

		require.NoError(t, err, "no error approving post")

		envApprove := getWorkflowEnvironment(t)
		approveWorkflowExecution.FindAndExecuteWorkflow(t, envApprove)
		require.True(t, envApprove.IsWorkflowCompleted(), "approve post workflow correct")
		require.NoError(t, envApprove.GetWorkflowError(), "approve post workflow no error")

		// make sure it shows up in the moderator logs as well
		logs := auditLogsForModeratorAccount(t, client, accountId)

		require.Len(t, logs.Entities[0].Account.PostAuditLogs.Edges, 1, "should have 1 audit log")

		require.Equal(t, types.PostAuditLogActionApproved, logs.Entities[0].Account.PostAuditLogs.Edges[0].Node.Action)

		posts := auditLogsForPost(t, client, convertPostIdToRelayId(postId))

		// should be exactly 1
		require.Equal(t, 1, len(posts.Entities[0].Post.AuditLogs.Edges))

		// audit logs should exist for this action
		require.Equal(t, types.PostAuditLogActionApproved, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action)

	}, time.Hour*24)

	workflowExecution.FindAndExecuteWorkflow(t, env)

	require.True(t, env.IsWorkflowCompleted(), "put post into moderator queue workflow complete")
	require.NoError(t, env.GetWorkflowError(), "put post into moderator queue workflow no error")

	client := getHttpClientWithAuthenticatedAccount(t, accountId)

	postModeratorQueue := accountPostModeratorQueue(t, client, accountId)
	require.Len(t, postModeratorQueue.Entities[0].Account.PostModeratorQueue.Edges, 0, "should no longer be in queue")
}
