package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/graphql/relay"
	"testing"
	"time"
)

type PostAuditLogModified struct {
	PostRejectionReason *types.PostRejectionReason
	Notes               string
	ID                  string
	Post                struct {
		ID string
	}
	Action types.PostAuditLogAction
}

type PostRejectionReasons struct {
	PostRejectionReasons *types.PostRejectionReasonConnection `graphql:"postRejectionReasons()"`
}

// TestPostRejectionReasons - get some rejection reasons
func TestPostRejectionReasons(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	var search PostRejectionReasons

	err := client.Query(context.Background(), &search, nil)

	require.NoError(t, err)
	require.Len(t, search.PostRejectionReasons.Edges, 2)
	require.Equal(t, "Reason with no infraction", search.PostRejectionReasons.Edges[0].Node.Reason, "correct infraction reason")
}

type AccountPostAuditLogs struct {
	Entities []struct {
		Account struct {
			ID            string
			PostAuditLogs *struct {
				Edges []struct {
					Node PostAuditLogModified
				}
			} `graphql:"postAuditLogs(dateRange: $dateRange)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func auditLogsForModeratorAccount(t *testing.T, client *graphql.Client, accountId string) AccountPostAuditLogs {

	var account AccountPostAuditLogs

	err := client.Query(context.Background(), &account, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         accountId,
			},
		},
		"dateRange": types.PostAuditLogDateRange{
			From: time.Now(),
			To:   time.Now(),
		},
	})

	require.NoError(t, err)

	return account
}

type PostAuditLogs struct {
	Entities []struct {
		Post struct {
			ID        string
			AuditLogs *struct {
				Edges []struct {
					Node PostAuditLogModified
				}
			} `graphql:"auditLogs()"`
		} `graphql:"... on Post"`
	} `graphql:"_entities(representations: $representations)"`
}

func auditLogsForPost(t *testing.T, client *graphql.Client, postId string) PostAuditLogs {

	var account PostAuditLogs

	err := client.Query(context.Background(), &account, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Post",
				"id":         postId,
			},
		},
	})

	require.NoError(t, err)

	return account
}

type RejectPost struct {
	RejectPost *struct {
		PostAuditLog PostAuditLogModified
	} `graphql:"rejectPost(input: $input)"`
}

func rejectPost(t *testing.T, client *graphql.Client, postId, rejectionReason string, notes *string) RejectPost {

	var modPost RejectPost

	err := client.Mutate(context.Background(), &modPost, map[string]interface{}{
		"input": types.RejectPostInput{
			PostID:                relay.ID(postId),
			PostRejectionReasonID: relay.ID(rejectionReason),
			Notes:                 notes,
		},
	})

	require.NoError(t, err)

	return modPost
}

// TestGetNextModerator - get next mod id
func TestGetNextModerator(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	item, err := client.GetNextModerator(context.Background(), &parley.GetModeratorRequest{})

	require.NoError(t, err)
	require.Contains(t, []string{"1q7MJ3JkhcdcJJNqZezdfQt5pZ6", "1q7MJ5IyRTV0X4J27F3m5wGD5mj"}, item.Id, "contains one of the moderator account IDs")
}

type ApprovePost struct {
	ApprovePost *struct {
		PostAuditLog PostAuditLogModified
	} `graphql:"approvePost(input: $input)"`
}

func TestModeratePost_approve(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	var approvePost ApprovePost

	postId := getRandomPostId()

	err := client.Mutate(context.Background(), &approvePost, map[string]interface{}{
		"input": types.ApprovePostInput{
			PostID: relay.ID(postId),
		},
	})

	require.NoError(t, err)

	require.Equal(t, types.PostAuditLogActionApproved, approvePost.ApprovePost.PostAuditLog.Action, "action is approved")

	// make sure it shows up in the moderator logs as well
	logs := auditLogsForModeratorAccount(t, client, "QWNjb3VudDoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=")

	var moderatorAuditLog *PostAuditLogModified

	for _, l := range logs.Entities[0].Account.PostAuditLogs.Edges {
		if l.Node.Post.ID == postId {
			moderatorAuditLog = &l.Node
			break
		}
	}

	require.NotNil(t, moderatorAuditLog, "should have found moderator post audit logs")
	require.Equal(t, types.PostAuditLogActionApproved, moderatorAuditLog.Action)

	posts := auditLogsForPost(t, client, postId)

	// should be exactly 1 - a reverted audit log
	require.Equal(t, len(posts.Entities[0].Post.AuditLogs.Edges), 1)

	// audit logs should exist for this action
	require.Equal(t, types.PostAuditLogActionApproved, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action)
}

type RemovePost struct {
	RemovePost *struct {
		PostAuditLog PostAuditLogModified
	} `graphql:"removePost(input: $input)"`
}

func TestModeratePost_remove(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	var removePost RemovePost

	postId := getRandomPostId()

	err := client.Mutate(context.Background(), &removePost, map[string]interface{}{
		"input": types.RemovePostInput{
			PostID:                relay.ID(postId),
			PostRejectionReasonID: "UG9zdFJlamVjdGlvblJlYXNvbjoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=",
		},
	})

	require.NoError(t, err)

	require.Equal(t, types.PostAuditLogActionRemoved, removePost.RemovePost.PostAuditLog.Action, "action is removed")

	posts := auditLogsForPost(t, client, postId)

	require.Equal(t, len(posts.Entities[0].Post.AuditLogs.Edges), 1, "1 value")

	// audit logs should exist for this action
	require.Equal(t, types.PostAuditLogActionRemoved, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action, "action is removed still")
}

func TestModeratePost_reject(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	notes := "some additional notes"
	postId := getRandomPostId()
	res := rejectPost(t, client, postId, "UG9zdFJlamVjdGlvblJlYXNvbjoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=", &notes)

	require.Equal(t, types.PostAuditLogActionDenied, res.RejectPost.PostAuditLog.Action)
	require.Equal(t, "some additional notes", res.RejectPost.PostAuditLog.Notes)
	require.Equal(t, "Reason with no infraction", res.RejectPost.PostAuditLog.PostRejectionReason.Reason)

	posts := auditLogsForPost(t, client, postId)

	// should be exactly 1 - a reverted audit log
	require.Equal(t, len(posts.Entities[0].Post.AuditLogs.Edges), 1)

	// audit logs should exist for this action
	require.Equal(t, types.PostAuditLogActionDenied, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action)
}

type AccountInfractionHistory struct {
	Entities []struct {
		Account struct {
			ID          string
			Infractions *types.AccountInfractionHistoryConnection
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func TestModeratePost_reject_infraction_and_undo(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	postId := getRandomPostId()
	notes := "some additional notes and stuff"

	res := rejectPost(t, client, postId, "UG9zdFJlamVjdGlvblJlYXNvbjoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=", &notes)
	infractionReason := "Reason with infraction"

	require.Equal(t, types.PostAuditLogActionDenied, res.RejectPost.PostAuditLog.Action)
	require.Equal(t, notes, res.RejectPost.PostAuditLog.Notes)
	require.Equal(t, infractionReason, res.RejectPost.PostAuditLog.PostRejectionReason.Reason)

	client = getHttpClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	// get infraction history for this account
	var infractionHistory AccountInfractionHistory

	err := client.Query(context.Background(), &infractionHistory, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=",
			},
		},
	})

	require.NoError(t, err)

	foundInfraction := false

	// look for the infraction that we created
	for _, infra := range infractionHistory.Entities[0].Account.Infractions.Edges {
		if infra.Node.PostRejectionReason.Reason == infractionReason {
			foundInfraction = true
		}
	}

	require.True(t, foundInfraction)

	client = getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	// check audit log record exists
	posts := auditLogsForPost(t, client, postId)

	// should be exactly 1 - a reverted audit log
	require.Equal(t, len(posts.Entities[0].Post.AuditLogs.Edges), 1)

	// audit logs should exist for this action
	require.Equal(t, types.PostAuditLogActionDenied, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action)
	require.Equal(t, "some additional notes and stuff", posts.Entities[0].Post.AuditLogs.Edges[0].Node.Notes)
}
