package service_test

import (
	"context"
	"encoding/base64"
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/corona10/goimagehash"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"image/png"
	"os"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/applications/loader/internal/ports/graphql/types"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/support"
	"overdoll/libraries/testing_tools"
	"strings"
	"testing"
	"time"
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
	// create an item ID to associate the resources with
	itemId := ksuid.New().String()

	tusClient := getTusClient(t)
	// upload some files
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1.png")

	grpcClient := getGrpcClient(t)

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId},
		Private:     true,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	// process resources
	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.ProcessResources)

	env.ExecuteWorkflow(workflows.ProcessResources, itemId, res.AllResourceIds)
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
	}

	// query our resources through graphql
	err = client.Query(context.Background(), &newResources, map[string]interface{}{
		"representations": resourceEntities,
	})

	require.NoError(t, err, "no error grabbing entities")

	imageResource := resourceResults.Resources[0]

	// check results
	require.Len(t, newResources.Entities, 1, "should have found all graphql entities")

	// manually sign our url and confirm it matches
	resourcesRsa, err := support.ParseRsaPrivateKeyFromPemEnvFile(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_PAIR_PRIVATE_KEY"))
	require.NoError(t, err, "no error creating RSA key")

	resourcesSigner := sign.NewURLSigner(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_PAIR_ID"), resourcesRsa)
	signedURL, err := resourcesSigner.Sign(os.Getenv("PRIVATE_RESOURCES_URL")+"/"+imageResource.ItemId+"/"+imageResource.ProcessedId+".webp", time.Now().Add(15*time.Minute))
	require.NoError(t, err, "no error signing url")

	// validate signed url is equal to our above signed url
	targetUrl := string(newResources.Entities[0].Resource.Urls[0].URL)
	require.Equal(t, signedURL, targetUrl)
	require.True(t, testing_tools.FileExists(targetUrl), "file exists in bucket")

	// now, apply a filter
	copyResourceResults, err := grpcClient.CopyResourcesAndApplyFilter(
		context.Background(), &loader.CopyResourcesAndApplyFilterRequest{Resources: nil, Private: false, Filters: &loader.Filters{Pixelate: &loader.PixelateFilter{Size: 100}}})

	require.NoError(t, err, "no error copying resources")

	require.Len(t, copyResourceResults.Resources, 1, "should have 1 filtered resource")

	newResourceItemId := copyResourceResults.Resources[0].NewResource.ItemId
	newResourceId := copyResourceResults.Resources[0].NewResource.Id

	var filteredResources Resources

	// query our resources through graphql
	err = client.Query(context.Background(), &filteredResources, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Resource",
				"id":         convertResourceIdToRelayId(newResourceItemId, newResourceId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing new filtered resource")
	require.Len(t, filteredResources.Entities[0].Resource.Urls, 1, "only should have 1 url")

	downloadUrl := filteredResources.Entities[0].Resource.Urls[0].URL.String()
	fileName := ksuid.New().String() + ".png"

	require.Equal(t, os.Getenv("RESOURCES_URL")+"/"+newResourceItemId+"/"+newResourceId+".png", downloadUrl, "correct, non-private URL")

	err = testing_tools.DownloadFile(fileName, downloadUrl)
	require.NoError(t, err, "no error downloading the file")

	file1, _ := os.Open("applications/loader/internal/service/file_fixtures/test_file_1_pixelated.png")
	file2, _ := os.Open(fileName)
	defer file1.Close()
	defer file2.Close()

	img1, _ := png.Decode(file1)
	img2, _ := png.Decode(file2)

	hash1, _ := goimagehash.AverageHash(img1)
	hash2, _ := goimagehash.AverageHash(img2)
	distance, _ := hash1.Distance(hash2)

	require.Equal(t, 14123, distance, "should have exactly x distance")
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

	// expected image resource
	require.Equal(t, os.Getenv("UPLOADS_URL")+"/"+imageFileId, string(newImageResource.Urls[0].URL))
	require.True(t, testing_tools.FileExists(string(newImageResource.Urls[0].URL)), "image uploaded file exists in bucket")

	// expected video resource
	require.Equal(t, os.Getenv("UPLOADS_URL")+"/"+videoFileId, string(newVideoResource.Urls[0].URL))
	require.True(t, testing_tools.FileExists(string(newVideoResource.Urls[0].URL)), "video uploaded file exists in bucket")

	// finally, run the processing workflow. we will query our resources one more time to check that the proper formats and URLs are now available
	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.ProcessResources)

	env.ExecuteWorkflow(workflows.ProcessResources, itemId, resourceIds)
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
	// expected first image to be webp
	require.Equal(t, os.Getenv("RESOURCES_URL")+"/"+imageResource.ItemId+"/"+imageResource.ProcessedId+".webp", string(newImageResource.Urls[0].URL))
	require.True(t, testing_tools.FileExists(string(newImageResource.Urls[0].URL)), "image webp file exists in bucket")

	// expected second image to be a png
	require.Equal(t, os.Getenv("RESOURCES_URL")+"/"+imageResource.ItemId+"/"+imageResource.ProcessedId+".png", string(newImageResource.Urls[1].URL))
	require.True(t, testing_tools.FileExists(string(newImageResource.Urls[1].URL)), "image png file exists in bucket")

	// correct dimensions
	require.Equal(t, 532, newImageResource.Height, "should be the correct height")
	require.Equal(t, 656, newImageResource.Width, "should be the correct width")

	// expect 1 url for video
	require.Len(t, newVideoResource.Urls, 1)
	// expected video resource
	require.Equal(t, os.Getenv("RESOURCES_URL")+"/"+videoResource.ItemId+"/"+videoResource.ProcessedId+".mp4", string(newVideoResource.Urls[0].URL))
	require.True(t, testing_tools.FileExists(string(newVideoResource.Urls[0].URL)), "video mp4 file exists in bucket")

	// correct thumbnail
	require.Equal(t, os.Getenv("RESOURCES_URL")+"/"+videoResource.ItemId+"/t-"+videoResource.ProcessedId+".png", string(newVideoResource.VideoThumbnail.URL))
	require.True(t, testing_tools.FileExists(string(newVideoResource.VideoThumbnail.URL)), "video thumbnail png file exists in bucket")

	// correct dimensions
	require.Equal(t, 360, newVideoResource.Height, "should be the correct height")
	require.Equal(t, 640, newVideoResource.Width, "should be the correct width")

	// correct duration
	require.Equal(t, 13347, newVideoResource.VideoDuration, "should be the correct duration")

	// should not have gotten an error for trying to upload the same resources
	_, err = grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: newResourceIds,
	})

	require.NoError(t, err, "no error trying to upload the exact same resources")

	// finally, delete all resources
	_, err = grpcClient.DeleteResources(context.Background(), &loader.DeleteResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})
	require.NoError(t, err)

	// run workflow to delete resources
	env = getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.DeleteResources)

	env.ExecuteWorkflow(workflows.DeleteResources, itemId, resourceIds)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// run grpc and see that we didnt find any resources
	resources, err = grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err)
	require.Len(t, resources.Resources, 0, "should not have found any resources")
}
