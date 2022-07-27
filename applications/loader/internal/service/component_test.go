package service_test

import (
	"bytes"
	"context"
	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/corona10/goimagehash"
	"github.com/eventials/go-tus"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"golang.org/x/image/webp"
	"google.golang.org/grpc"
	"image"
	"image/jpeg"
	"io"
	"log"
	"mime"
	"os"
	"overdoll/applications/loader/internal/ports"
	"overdoll/applications/loader/internal/service"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/passport"
	"overdoll/libraries/uuid"
	"path"
	"path/filepath"
	"strings"
	"time"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/testing_tools"
	"testing"
)

const LoaderHttpAddr = ":3333"
const LoaderTusClientAddr = "http://:3333/api/upload/"
const LoaderGraphqlClientAddr = "http://:3333/api/graphql/"

const LoaderGrpcAddr = "localhost:3334"
const LoaderGrpcClientAddr = "localhost:3334"

func getTusClient(t *testing.T) *tus.Client {

	// use a custom http client so we can attach our passport
	cfg := tus.DefaultConfig()

	client, err := tus.NewClient(LoaderTusClientAddr, cfg)
	require.NoError(t, err)

	return client
}

func getGraphqlClient(t *testing.T) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil)

	return graphql.NewClient(LoaderGraphqlClientAddr, client)
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

const chunkSize = 64000

func checkVideoHash(t *testing.T, url, fixture string) {

	require.True(t, testing_tools.FileExists(url), "file exists in bucket")

	// now, perform hash checks against each file
	fileName := uuid.New().String()
	err := testing_tools.DownloadFile(fileName, url)

	f1, err := os.Open(fileName)
	require.NoError(t, err)
	defer f1.Close()

	normalized, _ := testing_tools.NormalizedPathFromBazelTarget(fixture)

	f2, err := os.Open(normalized)
	require.NoError(t, err)

	defer f2.Close()

	for {
		b1 := make([]byte, chunkSize)
		_, err1 := f1.Read(b1)

		b2 := make([]byte, chunkSize)
		_, err2 := f2.Read(b2)

		if err1 != nil || err2 != nil {
			if err1 == io.EOF && err2 == io.EOF {
				return
			} else if err1 == io.EOF || err2 == io.EOF {
				require.False(t, true, "files not identical")
			} else {
				require.NoError(t, err1, "no error reading first")
				require.NoError(t, err1, "no error reading second")
			}
		}

		require.True(t, bytes.Equal(b1, b2), "should be identical bytes")
	}
}

func checkImageHash(t *testing.T, url, mimeType, webpFixture, jpegFixture string) {
	t.Helper()

	downloadUrl := url

	var referenceFile string

	if mimeType == "image/webp" {
		targ, _ := testing_tools.NormalizedPathFromBazelTarget(webpFixture)
		referenceFile = targ
	} else {
		targ, _ := testing_tools.NormalizedPathFromBazelTarget(jpegFixture)
		referenceFile = targ
	}

	require.True(t, testing_tools.FileExists(downloadUrl), "filtered file exists in bucket and is accessible")

	// now, perform hash checks against each file
	fileName := uuid.New().String()
	err := testing_tools.DownloadFile(fileName, downloadUrl)
	require.NoError(t, err, "no error downloading the file")

	file1, err := os.Open(referenceFile)
	require.NoError(t, err, "no error opening reference file")

	defer file1.Close()
	defer os.Remove(file1.Name())

	file2, err := os.Open(fileName)
	require.NoError(t, err, "no error opening target file")

	defer file2.Close()
	defer os.Remove(file2.Name())

	var img1 image.Image
	var img2 image.Image

	if mimeType == "image/webp" {
		img1, err = webp.Decode(file1)
		require.NoError(t, err, "no error decoding reference file")

		img2, err = webp.Decode(file2)
		require.NoError(t, err, "no error decoding target file")
	} else {
		img1, err = jpeg.Decode(file1)
		require.NoError(t, err, "no error decoding reference file")

		img2, err = jpeg.Decode(file2)
		require.NoError(t, err, "no error decoding target file")
	}

	hash1, err := goimagehash.AverageHash(img1)
	require.NoError(t, err, "no error generating hash of reference file")

	hash2, err := goimagehash.AverageHash(img2)
	require.NoError(t, err, "no error generating hash of target files")

	distance, err := hash1.Distance(hash2)
	require.NoError(t, err, "no error grabbing distance between files")

	require.Equal(t, 0, distance, "should have 0 differences with files")
}

func getGrpcClient(t *testing.T) loader.LoaderClient {

	loaderClient, _ := clients.NewLoaderClient(context.Background(), LoaderGrpcClientAddr)

	return loaderClient
}

func getWorkflowEnvironment() *testsuite.TestWorkflowEnvironment {

	suite := new(testsuite.WorkflowTestSuite)
	suite.SetLogger(testing_tools.NewDefaultTestWorkflowLogger())
	env := suite.NewTestWorkflowEnvironment()
	env.SetTestTimeout(time.Second * 300)

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
