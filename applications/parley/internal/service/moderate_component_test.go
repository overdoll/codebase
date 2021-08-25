package service_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/passport"
)

type PostRejectionReasons struct {
	PostRejectionReasons *types.PostRejectionReasonConnection `graphql:"postRejectionReasons()"`
}

// TestPostRejectionReasons - get some rejection reasons
func TestPostRejectionReasons(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var search PostRejectionReasons

	err := client.Query(context.Background(), &search, nil)

	require.NoError(t, err)
	require.Len(t, search.PostRejectionReasons.Edges, 2)
	require.Equal(t, "TranslateReason with no infraction", search.PostRejectionReasons.Edges[0].Node.Reason)
}

type AccountPostAuditLogs struct {
	Entities []struct {
		Account struct {
			ID                     string
			ModeratorPostAuditLogs *struct {
				Edges []struct {
					Node PostAuditLogModified
				}
			} `graphql:"moderatorPostAuditLogs(dateRange: $dateRange)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

// TestPostAuditLogs - get some audit logs
func TestPostAuditLogs(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ5IyRTV0X4J27F3m5wGD5mj"))

	var account AccountPostAuditLogs

	err := client.Query(context.Background(), &account, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=",
			},
		},
		"dateRange": types.PostAuditLogDateRange{
			From: time.Now(),
			To:   time.Now(),
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

type ApprovePost struct {
	ApprovePost *struct {
		PostAuditLog PostAuditLogModified
	} `graphql:"approvePost(input: $input)"`
}

func TestModeratePost_approve(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var approvePost ApprovePost

	err := client.Mutate(context.Background(), &approvePost, map[string]interface{}{
		"input": types.ApprovePostInput{
			PostID: "UG9zdDoxcTdNSXFxbmt6ZXczM3E0ZWxYdU4xUmkyN2Q=",
		},
	})

	require.NoError(t, err)

	require.Equal(t, types.PostAuditLogActionApproved, approvePost.ApprovePost.PostAuditLog.Action)
	require.Equal(t, "some notes", approvePost.ApprovePost.PostAuditLog.Notes)

	undo := revertModeratePost(t, client, approvePost.ApprovePost.PostAuditLog.ID)
	require.Equal(t, true, undo.RevertPostAuditLog.PostAuditLog.Reverted)
}

type RemovePost struct {
	RemovePost *struct {
		PostAuditLog PostAuditLogModified
	} `graphql:"removePost(input: $input)"`
}

func TestModeratePost_remove(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var removePost RemovePost

	err := client.Mutate(context.Background(), &removePost, map[string]interface{}{
		"input": types.RemovePostInput{
			PostID: "UG9zdDoxcTdNSXFxbmt6ZXczM3E0ZWxYdU4xUmkyN2Q=",
		},
	})

	require.NoError(t, err)

	require.Equal(t, types.PostAuditLogActionRemoved, removePost.RemovePost.PostAuditLog.Action)
}

func TestModeratePost_reject(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	notes := "some additional notes"
	res := rejectPost(t, client, "UG9zdFJlamVjdGlvblJlYXNvbjoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=", &notes)

	require.Equal(t, types.PostAuditLogActionDenied, res.RejectPost.PostAuditLog.Action)
	require.Equal(t, "some additional notes", res.RejectPost.PostAuditLog.Notes)
	require.Equal(t, "TranslateReason with no infraction", res.RejectPost.PostAuditLog.PostRejectionReason.Reason)

	undo := revertModeratePost(t, client, res.RejectPost.PostAuditLog.ID)

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

	res := rejectPost(t, client, "UG9zdFJlamVjdGlvblJlYXNvbjoxcTdNSjNKa2hjZGNKSk5xWmV6ZGZRdDVwWjY=", nil)
	infractionReason := "TranslateReason with infraction"

	require.Equal(t, types.PostAuditLogActionDenied, res.RejectPost.PostAuditLog.Action)
	require.Equal(t, "some additional notes and stuff", res.RejectPost.PostAuditLog.Notes)
	require.Equal(t, infractionReason, res.RejectPost.PostAuditLog.PostRejectionReason.Reason)

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
		if infra.Node.PostRejectionReason.Reason == infractionReason {
			foundInfraction = true
		}
	}

	require.True(t, foundInfraction)

	client = getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	undo := revertModeratePost(t, client, res.RejectPost.PostAuditLog.ID)

	// infraction should have been undone
	require.Equal(t, true, undo.RevertPostAuditLog.PostAuditLog.Reverted)
}
