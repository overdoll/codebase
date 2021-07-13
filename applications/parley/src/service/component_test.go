package service_test

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	parley "overdoll/applications/parley/proto"
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

// query is weird here because we query the entities field directly
type AccountSettings struct {
	Entities struct {
		AccountSettings types.AccountSettings `graphql:"... on AccountSettings"`
	} `graphql:"_entities(representations: $representations)"`
}

type _Any map[string]interface{}

func qAccountSettings(t *testing.T, client *graphql.Client, accountId string) AccountSettings {
	var accountSettings AccountSettings

	err := client.Query(context.Background(), &accountSettings, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "AccountSettings",
				"accountId":  accountId,
			},
		},
	})

	fmt.Println(err)
	fmt.Println(accountSettings)

	require.NoError(t, err)

	return accountSettings
}

type ModeratePost struct {
	ModeratePost types.ModeratePost `graphql:"moderatePost(data: $data)"`
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

type UndoModeratePost struct {
	UndoModeratePost types.ModeratePost `graphql:"revertPendingPostAuditLog(data: $data)"`
}

func mRevertModeratePost(t *testing.T, client *graphql.Client, id string) UndoModeratePost {
	var search UndoModeratePost

	err := client.Mutate(context.Background(), &search, map[string]interface{}{
		"data": types.RevertPostInput{AuditLogID: id},
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
