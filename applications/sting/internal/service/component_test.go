package service_test

import (
	"context"
	"encoding/base64"
	"github.com/bxcodec/faker/v3"
	"log"
	"mime"
	"os"
	adapters2 "overdoll/applications/stella/internal/adapters"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"path"
	"path/filepath"
	"strings"
	"testing"

	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/eventials/go-tus"
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
const StingTusClientAddr = "http://:6666/api/upload/"

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

func getTusClient(t *testing.T) *tus.Client {

	// use a custom http client so we can attach our passport
	cfg := tus.DefaultConfig()

	client, err := tus.NewClient(StingTusClientAddr, cfg)
	require.NoError(t, err)

	return client
}

func uploadFileWithTus(t *testing.T, tusClient *tus.Client, filePath string) string {

	// use bazel runfiles path
	dir, err := bazel.RunfilesPath()
	require.NoError(t, err)

	f, err := os.Open(path.Join(dir, filePath))
	require.NoError(t, err)

	defer f.Close()

	fi, err := f.Stat()
	require.NoError(t, err)

	// create the tus client.
	// create an upload from a file.
	upload, _ := tus.NewUploadFromFile(f)

	// set filetype extension header or else
	// filetype wont be set up properly
	fileTypeEncoded := mime.TypeByExtension(filepath.Ext(filePath))
	upload.Metadata["filetype"] = fileTypeEncoded
	upload.Metadata["type"] = fileTypeEncoded
	upload.Metadata["name"] = fi.Name()

	// create the uploader.
	uploader, _ := tusClient.CreateUpload(upload)

	// start the uploading process.
	err = uploader.Upload()
	require.NoError(t, err)

	split := strings.Split(uploader.Url(), "/")

	// get last part of url = ID of the upload
	return split[len(split)-1]
}

type TestClub struct {
	Name string `faker:"title_male"`
	Slug string `faker:"username"`
}

func newPrincipal(t *testing.T) *principal.Principal {
	return principal.NewPrincipal("1q7MJ3JkhcdcJJNqZezdfQt5pZ6", nil, false, false)
}

func newClub(t *testing.T) *club.Club {

	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err)

	clb, err := club.NewClub(newPrincipal(t), fake.Slug, fake.Name)
	require.NoError(t, err)

	return clb
}

// helper which seeds a new post in the database
func seedClub(t *testing.T) *club.Club {
	pst := newClub(t)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters2.NewClubCassandraRepository(session)
	err := adapter.CreateClub(context.Background(), newPrincipal(t), pst)
	require.NoError(t, err)
	return pst
}

func newPublishingPost(t *testing.T) *post.Post {
	testingAccountId := newFakeAccount(t)

	pst, err := post.NewPost(principal.NewPrincipal(testingAccountId, nil, false, false), seedClub(t))
	require.NoError(t, err)

	err = pst.SubmitPostRequest(principal.NewPrincipal(testingAccountId, nil, false, false), "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	require.NoError(t, err)
	return pst
}

func newDraftPost(t *testing.T) *post.Post {
	testingAccountId := newFakeAccount(t)

	pst, err := post.NewPost(principal.NewPrincipal(testingAccountId, nil, false, false), seedClub(t))
	require.NoError(t, err)
	return pst
}

func newFakeAccount(t *testing.T) string {
	return uuid.New().String()
}

func seedPublishingPost(t *testing.T) *post.Post {
	pst := newPublishingPost(t)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewPostsCassandraRepository(session)
	err := adapter.CreatePost(context.Background(), pst)
	require.NoError(t, err)

	es := bootstrap.InitializeElasticSearchSession()

	adapterEs := adapters.NewPostsIndexElasticSearchRepository(es, session)
	err = adapterEs.IndexPost(context.Background(), pst)
	require.NoError(t, err)

	_, err = es.Refresh(adapters.PostIndexName).Do(context.Background())
	require.NoError(t, err)

	return pst
}

func seedDraftPost(t *testing.T) *post.Post {
	pst := newDraftPost(t)

	session := bootstrap.InitializeDatabaseSession()

	adapter := adapters.NewPostsCassandraRepository(session)
	err := adapter.CreatePost(context.Background(), pst)
	require.NoError(t, err)
	return pst
}

func convertClubIdToRelayId(clubId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, clubId))))
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
	newApp, _ := service.NewApplication(context.Background())
	env.RegisterActivity(newApp.Activities)

	return env
}

func startService() bool {
	config.Read("applications/sting")

	application, _ := service.NewComponentTestApplication(context.Background())

	client := clients.NewTemporalClient(context.Background())

	srv := ports.NewHttpServer(&application, client)

	go bootstrap.InitializeHttpServer(StingHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(StingHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(&application, client)

	go bootstrap.InitializeGRPCServer(StingGrpcAddr, func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})

	ok = testing_tools.WaitForPort(StingGrpcAddr)

	if !ok {
		log.Println("timed out waiting for sting GRPC to come up")
		return false
	}

	// pre-install webp so that our workflows dont have to
	if err := webpbin.NewCWebP().BinWrapper.Run(); err != nil {
		log.Printf("could not install webp: %v", err)
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
