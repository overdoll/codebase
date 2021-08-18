package service_test

import (
	"context"
	"log"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"overdoll/applications/parley/internal/ports"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/applications/parley/internal/service"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const ParleyHttpAddr = ":8888"
const ParleyHttpClientAddr = "http://:8888/graphql"

const ParleyGrpcAddr = "localhost:8889"
const ParleyGrpcClientAddr = "localhost:8889"

type PostAuditLogModified struct {
	Reason       string
	Notes        string
	Reverted     bool
	InfractionID string
	ID           string
	Action       types.PostAuditLogAction
}

type ModeratePost struct {
	ModeratePost *struct {
		PostAuditLog PostAuditLogModified
	} `graphql:"moderatePost(input: $input)"`
}

func mModeratePost(t *testing.T, client *graphql.Client, rejectionReason *string, notes string) ModeratePost {
	var modPost ModeratePost

	var rejection *relay.ID

	if rejectionReason != nil {
		id := relay.ID(*rejectionReason)
		rejection = &id
	}

	err := client.Mutate(context.Background(), &modPost, map[string]interface{}{
		"input": types.ModeratePostInput{
			PostID:                "UG9zdDoxcTdNSXFxbmt6ZXczM3E0ZWxYdU4xUmkyN2Q=",
			PostRejectionReasonID: rejection,
			Notes:                 notes,
		},
	})

	require.NoError(t, err)

	return modPost
}

type RevertPostAuditLog struct {
	RevertPostAuditLog *struct {
		PostAuditLog *PostAuditLogModified
	} `graphql:"revertPostAuditLog(input: $input)"`
}

func mRevertModeratePost(t *testing.T, client *graphql.Client, id string) RevertPostAuditLog {
	var search RevertPostAuditLog

	err := client.Mutate(context.Background(), &search, map[string]interface{}{
		"input": types.RevertPostAuditLogInput{PostAuditLogID: relay.ID(id)},
	})

	require.NoError(t, err)

	return search
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
	config.Read("applications/parley")

	application, _ := service.NewComponentTestApplication(context.Background())

	srv := ports.NewHttpServer(&application)

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
