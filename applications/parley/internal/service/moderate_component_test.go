package service_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	parley "overdoll/applications/parley/proto"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
)

type PostRejectionReasons struct {
	PostRejectionReasons *types.PostRejectionReasonConnection `graphql:"postRejectionReasons()"`
}

// TestPendingPostRejectionReasons - get some rejection reasons
func TestPendingPostRejectionReasons(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var search PostRejectionReasons

	err := client.Query(context.Background(), &search, nil)

	require.NoError(t, err)
	require.Len(t, search.PostRejectionReasons.Edges, 2)
	require.Equal(t, "Reason with no infraction", search.PostRejectionReasons.Edges[0].Node.Reason)
}

type AccountPostAuditLogs struct {
	Entities []struct {
		Account struct {
			ID                     string
			ModeratorPostAuditLogs *struct {
				Edges []struct {
					Node PostAuditLogModified
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// TestPendingPostAuditLogs - get some audit logs
func TestPendingPostAuditLogs(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var account AccountPostAuditLogs

	err := client.Query(context.Background(), &account, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=",
			},
		},
	})

	require.NoError(t, err)
}

// TestGetNextModerator - get next mod id
func TestGetNextModerator(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	item, err := client.GetNextModerator(context.Background(), &parley.GetModeratorRequest{})

	require.NoError(t, err)
	require.Contains(t, []string{"1q7MJ3JkhcdcJJNqZezdfQt5pZ6", "1q7MJ5IyRTV0X4J27F3m5wGD5mj"}, item.Id)
}

func TestModeratePost_approve(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	res := mModeratePost(t, client, nil, "some notes")

	require.Equal(t, types.PostAuditLogActionApproved, res.ModeratePost.PostAuditLog.Action)
	require.Equal(t, "some notes", res.ModeratePost.PostAuditLog.Notes)

	undo := mRevertModeratePost(t, client, res.ModeratePost.PostAuditLog.ID)
	require.Equal(t, true, undo.RevertPostAuditLog.PostAuditLog.Reverted)
}

func TestModeratePost_reject(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))
	val := "UG9zdFJlamVjdGlvblJlYXNvbjoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo="

	res := mModeratePost(t, client, &val, "some additional notes")

	require.Equal(t, types.PostAuditLogActionDenied, res.ModeratePost.PostAuditLog.Action)
	require.Equal(t, "some additional notes", res.ModeratePost.PostAuditLog.Notes)
	require.Equal(t, "Reason with no infraction", res.ModeratePost.PostAuditLog.Reason)

	undo := mRevertModeratePost(t, client, res.ModeratePost.PostAuditLog.ID)

	require.Equal(t, true, undo.RevertPostAuditLog.PostAuditLog.Reverted)
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

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))
	val := "UG9zdFJlamVjdGlvblJlYXNvbjoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY="

	res := mModeratePost(t, client, &val, "some additional notes and stuff")
	infractionReason := "Reason with infraction"

	require.Equal(t, types.PostAuditLogActionDenied, res.ModeratePost.PostAuditLog.Action)
	require.Equal(t, "some additional notes and stuff", res.ModeratePost.PostAuditLog.Notes)
	require.Equal(t, infractionReason, res.ModeratePost.PostAuditLog.Reason)

	client = getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ5IyRTV0X4J27F3m5wGD5mj"))

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
		if infra.Node.Reason == infractionReason {
			foundInfraction = true
		}
	}

	require.True(t, foundInfraction)

	client = getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	undo := mRevertModeratePost(t, client, res.ModeratePost.PostAuditLog.ID)

	// infraction should have been undone
	require.Equal(t, "", undo.RevertPostAuditLog.PostAuditLog.InfractionID)
	require.Equal(t, true, undo.RevertPostAuditLog.PostAuditLog.Reverted)
}
