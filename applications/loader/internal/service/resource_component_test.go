package service_test

import (
	"context"
	graphql2 "github.com/99designs/gqlgen/graphql"
	"github.com/corona10/goimagehash"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"image/png"
	"os"
	"overdoll/applications/loader/internal/app/workflows"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/resource"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"strings"
	"testing"
	"time"
)

func TestUploadResourcesAndProcessPrivate_and_apply_filter(t *testing.T) {

	t.Parallel()

	// create an item ID to associate the resources with
	itemId := uuid.New().String()

	tusClient := getTusClient(t)
	// upload some files
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1.png")
	videoFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_2.mp4")

	grpcClient := getGrpcClient(t)

	imageId := strings.Split(imageFileId, "+")[0]
	videoId := strings.Split(videoFileId, "+")[0]

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceIds: []string{
		imageId,
		videoId,
	}, Source: "STING"})

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
		Private:     true,
		Source:      proto.SOURCE_STING,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	env := getWorkflowEnvironment()
	env.SetTestTimeout(time.Second * 10)

	workflowExecution.FindAndExecuteWorkflow(t, env)

	resourceResults, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: []string{res.Resources[0].Id, res.Resources[1].Id},
	})

	require.NoError(t, err, "no error getting resources")

	require.True(t, resourceResults.Resources[0].Private, "should be private")

	// create serializer instance
	serializer := resource.NewSerializer()

	unmarshalledResources, err := serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), resourceResults.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	var assertions int

	// validate all urls that the files are accessible
	for _, entity := range unmarshalledResources {

		for _, u := range entity.FullUrls() {
			assertions += 1
			require.True(t, testing_tools.FileExists(u.FullUrl()), "file exists in bucket")
		}

		if entity.IsVideo() {
			assertions += 1
			require.True(t, testing_tools.FileExists(entity.VideoThumbnailFullUrl().FullUrl()), "video thumbnail file exists in bucket")
		}
	}

	require.Equal(t, 4, assertions, "should have checked 3 urls in total")

	// now, apply a filter
	copyResourceResults, err := grpcClient.CopyResourcesAndApplyFilter(
		context.Background(),
		&loader.CopyResourcesAndApplyFilterRequest{
			Resources: []*loader.ResourceIdentifier{
				{
					Id:     imageId,
					ItemId: itemId,
				},
				{
					Id:     videoId,
					ItemId: itemId,
				},
			},
			Private: false,
			Filters: &loader.Filters{
				Pixelate: &loader.PixelateFilter{Size: 100},
			}},
	)

	require.NoError(t, err, "no error copying resources")

	require.Len(t, copyResourceResults.Resources, 2, "should have 2 filtered resources")

	var originalImageFileNewId string
	var originalVideoFileNewId string

	for _, r := range copyResourceResults.Resources {
		if r.OldResource.Id == imageId {
			originalImageFileNewId = r.NewResource.Id
		} else if r.OldResource.Id == videoId {
			originalVideoFileNewId = r.NewResource.Id
		}
	}

	resourceResults, err = grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: []string{copyResourceResults.Resources[0].NewResource.Id, copyResourceResults.Resources[1].NewResource.Id},
	})

	require.NoError(t, err, "no error grabbing new filtered resource")

	require.Len(t, resourceResults.Resources, 2, "should have 2 entities")

	unmarshalledResources, err = serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), resourceResults.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	// validate all urls that the files are accessible, and check hashes
	for _, entity := range unmarshalledResources {

		var downloadUrl string
		var referenceFile string

		if entity.ID() == originalImageFileNewId {
			for _, u := range entity.FullUrls() {
				downloadUrl = u.FullUrl()
				targ, _ := testing_tools.NormalizedPathFromBazelTarget("applications/loader/internal/service/file_fixtures/test_file_1_pixelated.png")
				referenceFile = targ
			}
		}

		if entity.ID() == originalVideoFileNewId {
			for _, u := range entity.FullUrls() {
				downloadUrl = u.FullUrl()
				targ, _ := testing_tools.NormalizedPathFromBazelTarget("applications/loader/internal/service/file_fixtures/test_file_2_pixelated.png")
				referenceFile = targ
			}
		}

		require.True(t, testing_tools.FileExists(downloadUrl), "filtered file exists in bucket and is accessible")

		// now, perform hash checks against each file
		fileName := uuid.New().String() + ".png"
		err = testing_tools.DownloadFile(fileName, downloadUrl)
		require.NoError(t, err, "no error downloading the file")

		file1, err := os.Open(referenceFile)
		require.NoError(t, err, "no error opening reference file")
		file2, err := os.Open(fileName)
		require.NoError(t, err, "no error opening target file")

		img1, err := png.Decode(file1)
		require.NoError(t, err, "no error decoding reference file")

		img2, err := png.Decode(file2)
		require.NoError(t, err, "no error decoding target file")

		hash1, err := goimagehash.AverageHash(img1)
		require.NoError(t, err, "no error generating hash of reference file")

		hash2, err := goimagehash.AverageHash(img2)
		require.NoError(t, err, "no error generating hash of target files")

		distance, err := hash1.Distance(hash2)
		require.NoError(t, err, "no error grabbing distance between files")

		require.Equal(t, 0, distance, "should have 0 differences with files")

		_ = file1.Close()
		_ = file2.Close()
	}
}

func TestUploadResourcesAndProcessAndDelete_non_private(t *testing.T) {
	t.Parallel()

	// create an item ID to associate the resources with
	itemId := uuid.New().String()

	tusClient := getTusClient(t)
	// upload some files
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1.png")
	videoFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_2.mp4")

	grpcClient := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceIds: []string{
		strings.Split(imageFileId, "+")[0],
		strings.Split(videoFileId, "+")[0],
	}, Source: "STING"})

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
		Private:     false,
		Source:      proto.SOURCE_STING,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	videoFileId = strings.Split(videoFileId, "+")[0]
	imageFileId = strings.Split(imageFileId, "+")[0]

	resourceIds := []string{res.Resources[0].Id, res.Resources[1].Id}

	// get resources and see that they are not processed yet (we did not run the workflow)
	resources, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	// should have 2 elements
	require.Len(t, resources.Resources, 2, "should have 2 elements in res")

	var imageResource *proto.Resource
	var videoResource *proto.Resource

	for _, res := range resources.Resources {
		if res.Id == videoFileId {
			videoResource = res
		}

		if res.Id == imageFileId {
			imageResource = res
		}
	}

	// first element is not processed
	require.False(t, imageResource.Processed, "should not be processed #1")
	require.Equal(t, imageResource.ItemId, itemId, "correct item ID #1")

	// second element is not processed
	require.False(t, videoResource.Processed, "should not be processed #2")
	require.Equal(t, videoResource.ItemId, itemId, "correct item ID #2")

	require.NoError(t, err, "no error grabbing entities")

	serializer := resource.NewSerializer()
	unmarshalledResources, err := serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), resources.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	var assertions int

	for _, entity := range unmarshalledResources {
		for _, u := range entity.FullUrls() {
			require.True(t, testing_tools.FileExists(u.FullUrl()), "uploaded file exists in bucket")
			assertions += 1
		}
	}

	require.Equal(t, 2, assertions, "expected to have checked 2 files")

	env := getWorkflowEnvironment()
	env.SetTestTimeout(time.Second * 10)

	workflowExecution.FindAndExecuteWorkflow(t, env)

	// then, run grpc call once again to make sure its processed
	resources, err = grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	unmarshalledResources, err = serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), resources.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	// should have 2 elements
	require.Len(t, unmarshalledResources, 2, "should have 2 elements")

	var newImageResource *resource.Resource
	var newVideoResource *resource.Resource

	for _, res := range unmarshalledResources {
		if res.ID() == videoFileId {
			newVideoResource = res
		}

		if res.ID() == imageFileId {
			newImageResource = res
		}
	}

	// first element is processed
	require.True(t, newImageResource.IsProcessed(), "should be processed #1")

	// second element is processed
	require.True(t, newVideoResource.IsProcessed(), "should be processed #2")

	// expect 2 urls for image
	require.Len(t, newImageResource.FullUrls(), 2)

	require.Equal(t, "image/webp", newImageResource.FullUrls()[0].MimeType(), "expected first image to be webp")
	require.Equal(t, "image/png", newImageResource.FullUrls()[1].MimeType(), "expected second image to be png")

	require.NotEmpty(t, newImageResource.Preview(), "preview is not empty for image")

	// correct dimensions
	require.Equal(t, 532, newImageResource.Height(), "should be the correct height")
	require.Equal(t, 656, newImageResource.Width(), "should be the correct width")

	// expect 1 url for video
	require.Len(t, newVideoResource.FullUrls(), 1)

	// correct dimensions
	require.Equal(t, 360, newVideoResource.Height(), "should be the correct height")
	require.Equal(t, 640, newVideoResource.Width(), "should be the correct width")

	// correct duration
	require.Equal(t, 13347, newVideoResource.VideoDuration(), "should be the correct duration")

	require.Equal(t, "video/mp4", newVideoResource.FullUrls()[0].MimeType(), "expected video to be mp4")
	require.Equal(t, "image/png", newVideoResource.VideoThumbnailMimeType(), "expected video thumbnail to be png")

	require.NotEmpty(t, newVideoResource.Preview(), "preview is not empty for video")

	var processedAssertions int

	// our list that we will check to make sure all files are deleted here
	var resourceUrlsTo404 []string

	// assert files existence
	for _, entity := range unmarshalledResources {
		for _, u := range entity.FullUrls() {
			downloadUrl := u.FullUrl()
			require.True(t, testing_tools.FileExists(downloadUrl), "processed file exists in bucket")
			resourceUrlsTo404 = append(resourceUrlsTo404, downloadUrl)
			processedAssertions += 1
		}

		if entity.IsVideo() {
			downloadUrl := entity.VideoThumbnailFullUrl().FullUrl()
			require.True(t, testing_tools.FileExists(downloadUrl), "video thumbnail file exists in bucket")
			resourceUrlsTo404 = append(resourceUrlsTo404, downloadUrl)
			processedAssertions += 1
		}
	}

	require.Equal(t, 4, processedAssertions, "expected to have checked 4 files")

	deleteWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.DeleteResources, mock.Anything)

	// finally, delete all resources
	_, err = grpcClient.DeleteResources(context.Background(), &loader.DeleteResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})
	require.NoError(t, err)

	// run workflow to delete resources
	deleteWorkflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	// run grpc and see that we didn't find any resources
	resources, err = grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err)
	require.Len(t, resources.Resources, 0, "should not have found any resources")

	require.Len(t, resourceUrlsTo404, 4, "should have 4 urls to check for deletion")

	for _, u := range resourceUrlsTo404 {
		require.False(t, testing_tools.FileExists(u), "file should no longer exist after being deleted")
	}
}
