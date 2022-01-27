package service_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/graphql/relay"
	"testing"
	"time"
)

type PostAuditLogModified struct {
	Rule  *types.Rule
	Notes string
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
				"id":         string(clubId),
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

	postIdRelay := convertPostIdToRelayId(ksuid.New().String())

	err := client.Mutate(context.Background(), &approvePost, map[string]interface{}{
		"input": types.ApprovePostInput{
			PostID: postIdRelay,
		},
	})

	require.NoError(t, err)

	require.Equal(t, types.PostAuditLogActionApproved, approvePost.ApprovePost.PostAuditLog.Action, "action is approved")

	// make sure it shows up in the moderator logs as well
	logs := auditLogsForModeratorAccount(t, client, "QWNjb3VudDoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=")

	var moderatorAuditLog *PostAuditLogModified

	for _, l := range logs.Entities[0].Account.PostAuditLogs.Edges {
		if l.Node.Post.ID == postIdRelay {
			moderatorAuditLog = &l.Node
			break
		}
	}

	require.NotNil(t, moderatorAuditLog, "should have found moderator post audit logs")
	require.Equal(t, types.PostAuditLogActionApproved, moderatorAuditLog.Action)

	posts := auditLogsForPost(t, client, postIdRelay)

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

	postIdRelay := convertPostIdToRelayId(ksuid.New().String())
	rule := seedRule(t)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	err := client.Mutate(context.Background(), &removePost, map[string]interface{}{
		"input": types.RemovePostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
		},
	})

	require.NoError(t, err)

	require.Equal(t, types.PostAuditLogActionRemoved, removePost.RemovePost.PostAuditLog.Action, "action is removed")

	posts := auditLogsForPost(t, client, postIdRelay)

	require.Equal(t, len(posts.Entities[0].Post.AuditLogs.Edges), 1, "1 value")

	// audit logs should exist for this action
	require.Equal(t, types.PostAuditLogActionRemoved, posts.Entities[0].Post.AuditLogs.Edges[0].Node.Action, "action is removed still")
}

type RejectPost struct {
	RejectPost *struct {
		PostAuditLog PostAuditLogModified
	} `graphql:"rejectPost(input: $input)"`
}

func TestModeratePost_reject(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	notes := "some additional notes"
	postIdRelay := convertPostIdToRelayId(ksuid.New().String())

	var rejectPost RejectPost

	rule := seedRule(t)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	err := client.Mutate(context.Background(), &rejectPost, map[string]interface{}{
		"input": types.RejectPostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
			Notes:  &notes,
		},
	})

	require.NoError(t, err)

	require.Equal(t, types.PostAuditLogActionDenied, rejectPost.RejectPost.PostAuditLog.Action, "should be denied")
	require.Equal(t, notes, rejectPost.RejectPost.PostAuditLog.Notes, "correct note was added")
	require.Equal(t, ruleIdRelay, rejectPost.RejectPost.PostAuditLog.Rule.ID, "correct rule was set")

	posts := auditLogsForPost(t, client, postIdRelay)

	require.Equal(t, 1, len(posts.Entities[0].Post.AuditLogs.Edges))

	require.Equal(t, rejectPost.RejectPost.PostAuditLog.ID, posts.Entities[0].Post.AuditLogs.Edges[0].Node.ID, "found the audit log at the top")
}

func TestModeratePost_reject_with_infraction(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	postId := ksuid.New().String()
	postIdRelay := convertPostIdToRelayId(postId)
	clubId := convertClubIdToRelayId(postId)

	var rejectPost RejectPost

	rule := seedRuleInfraction(t)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	err := client.Mutate(context.Background(), &rejectPost, map[string]interface{}{
		"input": types.RejectPostInput{
			PostID: postIdRelay,
			RuleID: ruleIdRelay,
		},
	})

	require.NoError(t, err, "no error rejecting a post with infraction")
	require.Equal(t, ruleIdRelay, rejectPost.RejectPost.PostAuditLog.Rule.ID, "correct rule was set")

	clubInfractionHistory := getClubInfractionHistory(t, client, clubId)

	require.Equal(t, 1, len(clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges), "should have 1 infraction history")
	require.Equal(t, types.ClubInfractionHistorySourcePostModerationRejection, clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges[0].Node.Source, "correct source")

}

type IssueClubInfraction struct {
	IssueClubInfraction *struct {
		ClubInfraction *ClubInfractionHistory
	} `graphql:"issueClubInfraction(input: $input)"`
}

type RemoveClubInfractionHistory struct {
	RemoveClubInfractionHistory *struct {
		ClubInfractionId *relay.ID
	} `graphql:"removeClubInfractionHistory(input: $input)"`
}

func TestIssueClubManualInfraction_and_remove(t *testing.T) {
	rule := seedRuleInfraction(t)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	clubId := convertClubIdToRelayId(ksuid.New().String())

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	var issueClubInfraction IssueClubInfraction

	err := client.Mutate(context.Background(), &issueClubInfraction, map[string]interface{}{
		"input": types.IssueClubInfractionInput{
			ClubID:        clubId,
			RuleID:        ruleIdRelay,
			CustomEndTime: nil,
		},
	})

	require.NoError(t, err, "no error issuing manual infraction")

	clubInfractionHistory := getClubInfractionHistory(t, client, clubId)

	require.Equal(t, 1, len(clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges), "should have 1 infraction history")
	require.Equal(t, types.ClubInfractionHistorySourceManual, clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges[0].Node.Source, "correct source")

	infractionId := clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges[0].Node.ID

	var removeClubInfractionHistory RemoveClubInfractionHistory

	err = client.Mutate(context.Background(), &removeClubInfractionHistory, map[string]interface{}{
		"input": types.RemoveClubInfractionHistoryInput{ClubInfractionHistoryID: infractionId},
	})

	require.NoError(t, err, "no error removing infraction history")
	require.Equal(t, 0, len(clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges), "should have no infraction history")
}
