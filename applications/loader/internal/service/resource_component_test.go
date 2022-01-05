package service_test

import (
	"context"
	"encoding/base64"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"os"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/applications/loader/internal/ports/graphql/types"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/graphql/relay"
	"testing"
)

type Resources struct {
	Entities []struct {
		Resource *types.Resource `graphql:"... on Resource"`
	} `graphql:"_entities(representations: $representations)"`
}

type _Any map[string]interface{}

func convertResourceIdToRelayId(itemId, resourceId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Resource{}, itemId, resourceId))))
}

func TestUploadResourcesAndProcessAndDelete(t *testing.T) {
	t.Parallel()

	// create an item ID to associate the resources with
	itemId := ksuid.New().String()

	tusClient := getTusClient(t)
	// upload some files
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1.png")
	videoFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_2.mp4")

	grpcClient := getGrpcClient(t)
	resourceIds := []string{imageFileId, videoFileId}

	// start processing of files by calling grpc endpoint
	_, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	// get resources and see that they are not processed yet (we did not run the workflow)
	resources, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
	})

	require.NoError(t, err, "no error getting resources")

	// should have 2 elements
	require.Len(t, resources.Resources, 2, "should have 2 elements")

	imageResource := resources.Resources[0]
	videoResource := resources.Resources[1]

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

	require.NoError(t, err)

	// check results
	require.Len(t, newResources.Entities, 2, "should have found all graphql entities")

	newImageResource := newResources.Entities[0].Resource
	newVideoResource := newResources.Entities[1].Resource

	// expected image resource
	require.Equal(t, os.Getenv("APP_URL")+"/api/upload/"+imageFileId+".png", string(newImageResource.Urls[0].URL))

	// expected video resource
	require.Equal(t, os.Getenv("APP_URL")+"/api/upload/"+videoFileId+".mp4", string(newVideoResource.Urls[0].URL))

	// finally, run the processing workflow. we will query our resources one more time to check that the proper formats and URLs are now available
	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.ProcessResources)

	env.ExecuteWorkflow(workflows.ProcessResources, itemId, resourceIds)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// then, run grpc call once again to make sure its processed
	resources, err = grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	// should have 2 elements
	require.Len(t, resources.Resources, 2, "should have 2 elements")

	imageResource = resources.Resources[0]
	videoResource = resources.Resources[1]

	// first element is processed
	require.False(t, imageResource.Processed, "should be processed #1")

	// second element is processed
	require.False(t, videoResource.Processed, "should be processed #2")

	// run graphql call and see that the resources are updated
	err = client.Query(context.Background(), &newResources, map[string]interface{}{
		"representations": resourceEntities,
	})

	// check results
	require.Len(t, newResources.Entities, 2, "should have found all graphql entities")

	newImageResource = newResources.Entities[0].Resource
	newVideoResource = newResources.Entities[1].Resource

	// expect 2 urls for image
	require.Len(t, newImageResource.Urls, 2)
	// expected first image to be webp
	require.Equal(t, os.Getenv("STATIC_URL")+"/"+imageResource.ItemId+"/"+imageResource.Id+".webp", string(newImageResource.Urls[0].URL))
	// expected second image to be a png
	require.Equal(t, os.Getenv("STATIC_URL")+"/"+imageResource.ItemId+"/"+imageResource.Id+".png", string(newImageResource.Urls[0].URL))

	// expect 1 url for video
	require.Len(t, newVideoResource.Urls, 1)
	// expected video resource
	require.Equal(t, os.Getenv("STATIC_URL")+"/"+videoResource.ItemId+"/"+videoResource.Id+".mp4", string(newVideoResource.Urls[0].URL))

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