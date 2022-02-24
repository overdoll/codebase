package service_test

import (
	"context"
	"encoding/base64"
	"github.com/segmentio/ksuid"
	"log"
	"os"

	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"overdoll/applications/sting/internal/ports"
	"overdoll/applications/sting/internal/service"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
)

const StingHttpAddr = ":6666"
const StingGraphqlClientAddr = "http://:6666/api/graphql"

const StingGrpcAddr = "localhost:6667"
const StingGrpcClientAddr = "localhost:6667"

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

func getGraphqlClient(t *testing.T) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

func newPublishingPost(t *testing.T, accountId, clubId string) *post.Post {

	pst, err := post.NewPost(principal.NewPrincipal(accountId, nil, false, false), clubId)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(principal.NewPrincipal(accountId, nil, false, false), post.UnmarshalAudienceFromDatabase(
		"1pcKiQL7dgUW8CIN7uO1wqFaMql", "standard_audience", map[string]string{"en": "Standard Audience"}, "", 1, 0, 0,
	))

	require.NoError(t, err)

	err = pst.SubmitPostRequest(principal.NewPrincipal(accountId, nil, false, false), "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", true)

	require.NoError(t, err)
	return pst
}

func newPublishedPost(t *testing.T, accountId string) *post.Post {

	publishingPost := newPublishingPost(t, accountId, ksuid.New().String())

	publishingPost.MakePublishing()

	err := publishingPost.MakePublish()
	require.NoError(t, err)

	return publishingPost
}

func newPublishedPostWithClub(t *testing.T, accountId string) *post.Post {

	publishingPost := newPublishingPost(t, accountId, accountId)
	publishingPost.MakePublishing()

	err := publishingPost.MakePublish()
	require.NoError(t, err)

	return publishingPost
}

func newFakeAccount(t *testing.T) string {
	return uuid.New().String()
}

func seedPost(t *testing.T, pst *post.Post) *post.Post {
	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewPostsCassandraRepository(session, service.StellaServiceMock{})
	err := adapter.CreatePost(context.Background(), pst)
	require.NoError(t, err)

	es := bootstrap.InitializeElasticSearchSession()
	adapterEs := adapters.NewPostsIndexElasticSearchRepository(es, session, service.StellaServiceMock{})
	err = adapterEs.IndexPost(context.Background(), pst)
	require.NoError(t, err)

	refreshPostESIndex(t)

	return pst
}

func seedPublishedPostWithClub(t *testing.T, accountId string) *post.Post {
	pst := newPublishedPostWithClub(t, accountId)
	seedPost(t, pst)
	return pst
}

func seedPublishedPost(t *testing.T, accountId string) *post.Post {
	pst := newPublishedPost(t, accountId)
	seedPost(t, pst)
	return pst
}

func seedPublishingPost(t *testing.T, accountId string) *post.Post {
	pst := newPublishingPost(t, accountId, ksuid.New().String())
	seedPost(t, pst)
	return pst
}

func refreshPostESIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.PostIndexName).Do(context.Background())
	require.NoError(t, err)
}

func convertClubIdToRelayId(clubId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, clubId))))
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Account{}, accountId))))
}

func convertPostIdToRelayId(postId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Post{}, postId))))
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func getWorkflowEnvironment(t *testing.T) *testsuite.TestWorkflowEnvironment {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	newApp, _ := service.NewComponentTestApplication(context.Background())
	env.RegisterActivity(newApp.Activities)

	return env
}

func startService() bool {
	config.Read("applications/sting")

	application, _ := service.NewComponentTestApplication(context.Background())

	srv := ports.NewHttpServer(&application)

	go bootstrap.InitializeHttpServer(StingHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(StingHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application)

	go bootstrap.InitializeGRPCServer(StingGrpcAddr, func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})

	ok = testing_tools.WaitForPort(StingGrpcAddr)

	if !ok {
		log.Println("timed out waiting for sting GRPC to come up")
		return false
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
