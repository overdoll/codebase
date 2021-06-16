package service_test

import (
	"context"
	"log"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	parley "overdoll/applications/parley/proto"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/applications/parley/src/ports"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/applications/parley/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const ParleyHttpAddr = ":8888"
const ParleyHttpClientAddr = "http://:8888/graphql"

const ParleyGrpcAddr = "localhost:8889"
const ParleyGrpcClientAddr = "localhost:8889"

type PendingPostRejectionReasons struct {
	RejectionReasons []*types.PendingPostRejectionReason `graphql:"rejectionReasons"`
}

type PendingPostAuditLogs struct {
	PendingPostAuditLogs *types.PendingPostAuditLogConnection `graphql:"pendingPostAuditLogs(filter: $filter)"`
}

type ModeratePost struct {
	ModeratePost types.ModeratePost `graphql:"moderatePost(data: $data)"`
}

type UndoModeratePost struct {
	UndoModeratePost types.ModeratePost `graphql:"revertPendingPostAuditLog(data: $data)"`
}

func mModeratePost(t *testing.T, client *graphql.Client, rejectionReason *string, notes string) ModeratePost {
	var modPost ModeratePost

	err := client.Mutate(context.Background(), &modPost, map[string]interface{}{
		"data": types.ModeratePostInput{
			PendingPostID:     "1q7MIqqnkzew33q4elXuN1Ri27d",
			RejectionReasonID: rejectionReason,
			Notes:             notes,
		},
	})

	require.NoError(t, err)

	return modPost
}

func mRevertModeratePost(t *testing.T, client *graphql.Client, id string) UndoModeratePost {
	var search UndoModeratePost

	err := client.Mutate(context.Background(), &search, map[string]interface{}{
		"data": types.RevertPostInput{AuditLogID: id},
	})

	require.NoError(t, err)

	return search
}

// TestPendingPostRejectionReasons - get some rejection reasons
func TestPendingPostRejectionReasons(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var search PendingPostRejectionReasons

	err := client.Query(context.Background(), &search, nil)

	require.NoError(t, err)
	require.Len(t, search.RejectionReasons, 2)
	require.Equal(t, "Reason with infraction", search.RejectionReasons[0].Reason)
}

// TestPendingPostAuditLogs - get some audit logs
func TestPendingPostAuditLogs(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

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
	require.Equal(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", item.Id)
}

func TestModeratePost_approve(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	res := mModeratePost(t, client, nil, "some notes")

	require.Equal(t, infraction.StatusApproved, res.ModeratePost.AuditLog.Status)
	require.Equal(t, "some notes", res.ModeratePost.AuditLog.Notes)

	undo := mRevertModeratePost(t, client, res.ModeratePost.AuditLog.ID)
	require.Equal(t, true, undo.UndoModeratePost.AuditLog.Reverted)
}

func TestModeratePost_reject(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))
	val := "1q7MJ5IyRTV0X4J27F3m5wGD5mj"

	res := mModeratePost(t, client, &val, "some additional notes")

	require.Equal(t, infraction.StatusDenied, res.ModeratePost.AuditLog.Status)
	require.Equal(t, "some additional notes", res.ModeratePost.AuditLog.Notes)
	require.Equal(t, "Reason with no infraction", res.ModeratePost.AuditLog.Reason)

	undo := mRevertModeratePost(t, client, res.ModeratePost.AuditLog.ID)

	require.Equal(t, true, undo.UndoModeratePost.AuditLog.Reverted)
}

func TestModeratePost_reject_infraction_and_undo(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))
	val := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	res := mModeratePost(t, client, &val, "some additional notes")

	require.Equal(t, infraction.StatusDenied, res.ModeratePost.AuditLog.Status)
	require.Equal(t, "some additional notes", res.ModeratePost.AuditLog.Notes)
	require.Equal(t, "Reason with infraction", res.ModeratePost.AuditLog.Reason)

	undo := mRevertModeratePost(t, client, res.ModeratePost.AuditLog.ID)

	// infraction should have been undone
	require.Equal(t, nil, undo.UndoModeratePost.AuditLog.InfractionID)
	require.Equal(t, true, undo.UndoModeratePost.AuditLog.Reverted)
}

func getHttpClient(t *testing.T, pass *passport.Passport) *graphql.Client {

	client, _ := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(ParleyHttpClientAddr, client)
}

func getGrpcClient(t *testing.T) parley.ParleyClient {

	parleyClient, _ := clients.NewParleyClient(context.Background(), ParleyGrpcClientAddr)

	return parleyClient
}

func startService() bool {
	config.Read("applications/parley/config.toml")

	application, _ := service.NewComponentTestApplication(context.Background())

	srv := ports.NewGraphQLServer(&application)

	go bootstrap.InitializeHttpServer(ParleyHttpAddr, srv, func() {})

	ok := tests.WaitForPort(ParleyHttpAddr)
	if !ok {
		log.Println("Timed out waiting for parley HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application)

	go bootstrap.InitializeGRPCServer(ParleyGrpcAddr, func(server *grpc.Server) {
		parley.RegisterParleyServer(server, s)
	})

	ok = tests.WaitForPort(ParleyGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for parley GRPC to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
