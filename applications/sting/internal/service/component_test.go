package service_test

import (
	"context"
	"log"
	"mime"
	"os"
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
const StingGraphqlClientAddr = "http://:6666/graphql"
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

	application, _ := service.NewApplication(context.Background())

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
	err := webpbin.NewCWebP().BinWrapper.Run()

	if err != nil {
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
