package service_test

import (
	"context"
	"encoding/base64"
	"github.com/corona10/goimagehash"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"image/png"
	"os"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/applications/loader/internal/ports/graphql/types"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"strings"
	"testing"
)

type Resources struct {
	Entities []struct {
		Resource types.Resource `graphql:"... on Resource"`
	} `graphql:"_entities(representations: $representations)"`
}

type _Any map[string]interface{}

func convertResourceIdToRelayId(itemId, resourceId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Resource{}, itemId, resourceId))))
}

func TestUploadResourcesAndProcessPrivate_and_apply_filter(t *testing.T) {

	t.Parallel()

	// create an item ID to associate the resources with
	itemId := ksuid.New().String()

	tusClient := getTusClient(t)
	// upload some files
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1.png")
	videoFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_2.mp4")

	grpcClient := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.ProcessResources, itemId, mock.Anything)

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
		Private:     true,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	env := getWorkflowEnvironment(t)

	workflowExecution.FindAndExecuteWorkflow(t, env)

	require.True(t, env.IsWorkflowCompleted(), "processed resources")
	require.NoError(t, env.GetWorkflowError(), "processed resources without error")

	resourceResults, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: res.AllResourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	require.True(t, resourceResults.Resources[0].Private, "should be private")

	client := getGraphqlClient(t)

	var newResources Resources

	resourceEntities := []_Any{
		{
			"__typename": "Resource",
			"id":         convertResourceIdToRelayId(itemId, res.AllResourceIds[0]),
		},
		{
			"__typename": "Resource",
			"id":         convertResourceIdToRelayId(itemId, res.AllResourceIds[1]),
		},
	}

	// query our resources through graphql
	err = client.Query(context.Background(), &newResources, map[string]interface{}{
		"representations": resourceEntities,
	})

	require.NoError(t, err, "no error grabbing entities")

	// check results
	require.Len(t, newResources.Entities, 2, "should have found all graphql entities")

	var assertions int

	// validate all urls that the files are accessible
	for _, entity := range newResources.Entities {

		for _, u := range entity.Resource.Urls {
			assertions += 1
			require.True(t, testing_tools.FileExists(u.URL.String()), "file exists in bucket")
		}

		if entity.Resource.Type == types.ResourceTypeVideo {
			assertions += 1
			require.True(t, testing_tools.FileExists(entity.Resource.VideoThumbnail.URL.String()), "video thumbnail file exists in bucket")
		}
	}

	require.Equal(t, 4, assertions, "should have checked 3 urls in total")

	// now, apply a filter
	copyResourceResults, err := grpcClient.CopyResourcesAndApplyFilter(
		context.Background(),
		&loader.CopyResourcesAndApplyFilterRequest{
			Resources: []*loader.ResourceIdentifier{
				{
					Id:     res.AllResourceIds[0],
					ItemId: itemId,
				},
				{
					Id:     res.AllResourceIds[1],
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
		if r.OldResource.Id == res.AllResourceIds[0] {
			originalImageFileNewId = r.NewResource.Id
		} else if r.OldResource.Id == res.AllResourceIds[1] {
			originalVideoFileNewId = r.NewResource.Id
		}
	}

	var filteredResources Resources

	// query our resources through graphql
	err = client.Query(context.Background(), &filteredResources, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Resource",
				"id":         convertResourceIdToRelayId(itemId, copyResourceResults.Resources[0].NewResource.Id),
			},
			{
				"__typename": "Resource",
				"id":         convertResourceIdToRelayId(itemId, copyResourceResults.Resources[1].NewResource.Id),
			},
		},
	})

	require.NoError(t, err, "no error grabbing new filtered resource")

	require.Len(t, filteredResources.Entities, 2, "should have 2 entities")

	// validate all urls that the files are accessible, and check hashes
	for _, entity := range filteredResources.Entities {

		var downloadUrl string
		var referenceFile string

		decoded, _ := base64.StdEncoding.DecodeString(entity.Resource.ID.GetID())

		resourceId := relay.NewID(string(decoded)).GetID()

		if resourceId == originalImageFileNewId {
			for _, u := range entity.Resource.Urls {
				downloadUrl = u.URL.String()
				targ, _ := testing_tools.NormalizedPathFromBazelTarget("applications/loader/internal/service/file_fixtures/test_file_1_pixelated.png")
				referenceFile = targ
			}
		}

		if resourceId == originalVideoFileNewId {
			for _, u := range entity.Resource.Urls {
				downloadUrl = u.URL.String()
				targ, _ := testing_tools.NormalizedPathFromBazelTarget("applications/loader/internal/service/file_fixtures/test_file_2_pixelated.png")
				referenceFile = targ
			}
		}

		require.True(t, testing_tools.FileExists(downloadUrl), "filtered file exists in bucket and is accessible")

		// now, perform hash checks against each file
		fileName := ksuid.New().String() + ".png"
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
	itemId := ksuid.New().String()

	tusClient := getTusClient(t)
	// upload some files
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1.png")
	videoFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_2.mp4")

	grpcClient := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.ProcessResources, itemId, mock.Anything)

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
		Private:     false,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	resourceIds := res.AllResourceIds
	videoFileId = strings.Split(videoFileId, "+")[0]
	imageFileId = strings.Split(imageFileId, "+")[0]

	// get resources and see that they are not processed yet (we did not run the workflow)
	resources, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	// should have 2 elements
	require.Len(t, resources.Resources, 2, "should have 2 elements in res")

	var imageResource *loader.Resource
	var videoResource *loader.Resource

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

	client := getGraphqlClient(t)

	var newResources Resources

	resourceEntities := []_Any{
		{
			"__typename": "Resource",
			"id":         convertResourceIdToRelayId(imageResource.ItemId, imageResource.Id),
		},
		{
			"__typename": "Resource",
			"id":         convertResourceIdToRelayId(videoResource.ItemId, videoResource.Id),
		},
	}

	// query our resources through graphql
	err = client.Query(context.Background(), &newResources, map[string]interface{}{
		"representations": resourceEntities,
	})

	require.NoError(t, err, "no error grabbing entities")

	// check results
	require.Len(t, newResources.Entities, 2, "should have found all graphql entities")

	var newImageResource types.Resource
	var newVideoResource types.Resource

	for _, res := range newResources.Entities {
		if res.Resource.Type == types.ResourceTypeVideo {
			newVideoResource = res.Resource
		}

		if res.Resource.Type == types.ResourceTypeImage {
			newImageResource = res.Resource
		}
	}

	var assertions int

	for _, entity := range newResources.Entities {
		for _, u := range entity.Resource.Urls {
			require.True(t, testing_tools.FileExists(u.URL.String()), "uploaded file exists in bucket")
			assertions += 1
		}
	}

	require.Equal(t, 2, assertions, "expected to have checked 2 files")

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "processed resources")
	require.NoError(t, env.GetWorkflowError(), "processed resources without error")

	// then, run grpc call once again to make sure its processed
	resources, err = grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	// should have 2 elements
	require.Len(t, resources.Resources, 2, "should have 2 elements")

	for _, res := range resources.Resources {
		if res.Id == videoFileId {
			videoResource = res
		}

		if res.Id == imageFileId {
			imageResource = res
		}
	}

	// first element is processed
	require.True(t, imageResource.Processed, "should be processed #1")

	// second element is processed
	require.True(t, videoResource.Processed, "should be processed #2")

	// run graphql call and see that the resources are updated
	err = client.Query(context.Background(), &newResources, map[string]interface{}{
		"representations": resourceEntities,
	})

	// check results
	require.Len(t, newResources.Entities, 2, "should have found all graphql entities")

	// save the new IDs for later
	var newResourceIds []string

	for _, res := range newResources.Entities {

		// weird bug, we have to base64 decode first
		sDec, _ := base64.StdEncoding.DecodeString(res.Resource.ID.GetID())
		newResourceIds = append(newResourceIds, relay.ID(sDec).GetID())

		if res.Resource.Type == types.ResourceTypeVideo {
			newVideoResource = res.Resource
		}

		if res.Resource.Type == types.ResourceTypeImage {
			newImageResource = res.Resource
		}
	}

	// expect 2 urls for image
	require.Len(t, newImageResource.Urls, 2)

	require.Equal(t, "image/webp", newImageResource.Urls[0].MimeType, "expected first image to be webp")
	require.Equal(t, "image/png", newImageResource.Urls[1].MimeType, "expected second image to be png")

	// correct dimensions
	require.Equal(t, 532, newImageResource.Height, "should be the correct height")
	require.Equal(t, 656, newImageResource.Width, "should be the correct width")

	// expect 1 url for video
	require.Len(t, newVideoResource.Urls, 1)

	// correct dimensions
	require.Equal(t, 360, newVideoResource.Height, "should be the correct height")
	require.Equal(t, 640, newVideoResource.Width, "should be the correct width")

	// correct duration
	require.Equal(t, 13347, newVideoResource.VideoDuration, "should be the correct duration")

	require.Equal(t, "video/mp4", newVideoResource.Urls[0].MimeType, "expected video to be mp4")
	require.Equal(t, "image/png", newVideoResource.VideoThumbnail.MimeType, "expected video thumbnail to be png")

	var processedAssertions int

	// our list that we will check to make sure all files are deleted here
	var resourceUrlsTo404 []string

	// assert files existence
	for _, entity := range newResources.Entities {
		for _, u := range entity.Resource.Urls {
			downloadUrl := u.URL.String()
			require.True(t, testing_tools.FileExists(downloadUrl), "processed file exists in bucket")
			resourceUrlsTo404 = append(resourceUrlsTo404, downloadUrl)
			processedAssertions += 1
		}

		if entity.Resource.Type == types.ResourceTypeVideo {
			downloadUrl := entity.Resource.VideoThumbnail.URL.String()
			require.True(t, testing_tools.FileExists(entity.Resource.VideoThumbnail.URL.String()), "video thumbnail file exists in bucket")
			resourceUrlsTo404 = append(resourceUrlsTo404, downloadUrl)
			processedAssertions += 1
		}
	}

	require.Equal(t, 4, processedAssertions, "expected to have checked 4 files")

	deleteWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.DeleteResources, itemId, mock.Anything)

	// finally, delete all resources
	_, err = grpcClient.DeleteResources(context.Background(), &loader.DeleteResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})
	require.NoError(t, err)

	// run workflow to delete resources
	env = getWorkflowEnvironment(t)
	deleteWorkflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "deleted resources")
	require.NoError(t, env.GetWorkflowError(), "deleted resources without error")

	// run grpc and see that we didnt find any resources
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
