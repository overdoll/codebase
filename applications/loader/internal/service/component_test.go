package service_test

import (
	"context"
	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/eventials/go-tus"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"log"
	"mime"
	"os"
	"overdoll/applications/loader/internal/ports"
	"overdoll/applications/loader/internal/service"
	loader "overdoll/applications/loader/proto"
	"path"
	"path/filepath"
	"strings"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
	"testing"
)

const LoaderHttpAddr = ":3333"
const LoaderGraphqlClientAddr = "http://:3333/api/graphql"
const LoaderTusClientAddr = "http://:3333/api/upload/"

const LoaderGrpcAddr = "localhost:3334"
const LoaderGrpcClientAddr = "localhost:3334"

func getTusClient(t *testing.T) *tus.Client {

	// use a custom http client so we can attach our passport
	cfg := tus.DefaultConfig()

	client, err := tus.NewClient(LoaderTusClientAddr, cfg)
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

func getGraphqlClient(t *testing.T) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil)

	return graphql.NewClient(LoaderGraphqlClientAddr, client)
}

func getGrpcClient(t *testing.T) loader.LoaderClient {

	loaderClient, _ := clients.NewLoaderClient(context.Background(), LoaderGrpcClientAddr)

	return loaderClient
}

func getWorkflowEnvironment() *testsuite.TestWorkflowEnvironment {

	suite := new(testsuite.WorkflowTestSuite)
	suite.SetLogger(testing_tools.NewDefaultTestWorkflowLogger())
	env := suite.NewTestWorkflowEnvironment()

	env.RegisterActivity(application.App.Activities)

	return env
}

func startService() bool {
	config.Read("applications/loader")

	app := service.NewComponentTestApplication(context.Background())

	srv := ports.NewHttpServer(app.App)

	go bootstrap.InitializeHttpServer(LoaderHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(LoaderHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(app.App)

	go bootstrap.InitializeGRPCServer(LoaderGrpcAddr, func(server *grpc.Server) {
		loader.RegisterLoaderServer(server, s)
	})

	ok = testing_tools.WaitForPort(LoaderGrpcAddr)

	if !ok {
		log.Println("timed out waiting for sting GRPC to come up")
		return false
	}

	// pre-install webp so that our workflows dont have to
	if err := webpbin.NewCWebP().BinWrapper.Run(); err != nil {
		log.Printf("could not install webp: %v", err)
		return false
	}

	mockServices(app)

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
