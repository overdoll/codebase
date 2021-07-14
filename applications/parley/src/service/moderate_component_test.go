package service_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	parley "overdoll/applications/parley/proto"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type PendingPostRejectionReasons struct {
	RejectionReasons []*types.PendingPostRejectionReason `graphql:"rejectionReasons"`
}

// TestPendingPostRejectionReasons - get some rejection reasons
func TestPendingPostRejectionReasons(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var search PendingPostRejectionReasons

	err := client.Query(context.Background(), &search, nil)

	require.NoError(t, err)
	require.Len(t, search.RejectionReasons, 2)
	require.Equal(t, "Reason with infraction", search.RejectionReasons[0].Reason)
}

type PendingPostAuditLogs struct {
	PendingPostAuditLogs *types.PendingPostAuditLogConnection `graphql:"pendingPostAuditLogs(filter: $filter)"`
}

// TestPendingPostAuditLogs - get some audit logs
func TestPendingPostAuditLogs(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var search PendingPostAuditLogs

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"filter": types.PendingPostAuditLogFilters{ModeratorID: nil, DateRange: []int{1623804143}},
	})

	require.NoError(t, err)
	require.Equal(t, "0eclipse", search.PendingPostAuditLogs.Edges[0].Node.Contributor.Username)
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

	require.Equal(t, infraction.StatusApproved, res.ModeratePost.AuditLog.Status)
	require.Equal(t, "some notes", res.ModeratePost.AuditLog.Notes)

	undo := mRevertModeratePost(t, client, res.ModeratePost.AuditLog.ID)
	require.Equal(t, true, undo.UndoModeratePost.AuditLog.Reverted)
}

func TestModeratePost_reject(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))
	val := "1q7MJ5IyRTV0X4J27F3m5wGD5mj"

	res := mModeratePost(t, client, &val, "some additional notes")

	require.Equal(t, infraction.StatusDenied, res.ModeratePost.AuditLog.Status)
	require.Equal(t, "some additional notes", res.ModeratePost.AuditLog.Notes)
	require.Equal(t, "Reason with no infraction", res.ModeratePost.AuditLog.Reason)

	undo := mRevertModeratePost(t, client, res.ModeratePost.AuditLog.ID)

	require.Equal(t, true, undo.UndoModeratePost.AuditLog.Reverted)
}

type AccountInfractionHistory struct {
	AccountInfractionHistory []types.AccountInfractionHistory `graphql:"accountInfractionHistory()"`
}

func TestModeratePost_reject_infraction_and_undo(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))
	val := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	res := mModeratePost(t, client, &val, "some additional notes")
	infractionReason := "Reason with infraction"

	require.Equal(t, infraction.StatusDenied, res.ModeratePost.AuditLog.Status)
	require.Equal(t, "some additional notes", res.ModeratePost.AuditLog.Notes)
	require.Equal(t, infractionReason, res.ModeratePost.AuditLog.Reason)

	client = getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ5IyRTV0X4J27F3m5wGD5mj"))

	// get infraction history for this account
	var infractionHistory AccountInfractionHistory

	err := client.Query(context.Background(), &infractionHistory, nil)
	require.NoError(t, err)

	foundInfraction := false

	// look for the infraction that we created
	for _, infra := range infractionHistory.AccountInfractionHistory {
		if infra.Reason == infractionReason {
			foundInfraction = true
		}
	}

	require.True(t, foundInfraction)

	client = getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	undo := mRevertModeratePost(t, client, res.ModeratePost.AuditLog.ID)

	// infraction should have been undone
	var str *string
	require.Equal(t, str, undo.UndoModeratePost.AuditLog.InfractionID)
	require.Equal(t, true, undo.UndoModeratePost.AuditLog.Reverted)
}
