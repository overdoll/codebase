package service_test

import (
	"context"
	"encoding/base64"
	graphql2 "github.com/99designs/gqlgen/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/converter"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/applications/loader/internal/ports/graphql/types"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/resource"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"strings"
	"testing"
)

type _Any map[string]interface{}

type ResourceProgress struct {
	Entities []struct {
		ResourceProgress types.ResourceProgress `graphql:"... on ResourceProgress"`
	} `graphql:"_entities(representations: $representations)"`
}

func queryResourceProgress(t *testing.T, itemId, resourceId string) types.ResourceProgress {
	client := getGraphqlClient(t)

	var progress ResourceProgress

	err := client.Query(context.Background(), &progress, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "ResourceProgress",
				"id":         base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.ResourceProgress{}, itemId, resourceId))),
			},
		},
	})

	require.NoError(t, err)

	return progress.Entities[0].ResourceProgress
}

const previewRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"

func TestUploadResourcesAndProcessFailed(t *testing.T) {
	t.Parallel()

	// create an item ID to associate the resources with
	itemId := uuid.New().String()

	tusClient := getTusClient(t)
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1_broken.png")
	videoFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_2_broken.mp4")

	imageId := strings.Split(imageFileId, "+")[0]
	videoId := strings.Split(videoFileId, "+")[0]

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: imageId, Source: "STING"})
	workflowExecution2 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: videoId, Source: "STING"})

	grpcClient := getGrpcClient(t)

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
		Private:     true,
		Source:      proto.SOURCE_STING,
		Config: &loader.Config{
			Width:  0,
			Height: 0,
		},
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
	workflowExecution2.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	resourceResults, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: []string{res.Resources[0].Id, res.Resources[1].Id},
	})

	require.NoError(t, err, "no error getting resources")

	require.Len(t, resourceResults.Resources, 2, "should have only 2 resources")
	require.True(t, resourceResults.Resources[0].Failed, "should have failed processing image")
	require.False(t, resourceResults.Resources[0].Processed, "should not be processed")

	require.True(t, resourceResults.Resources[1].Failed, "should have failed processing video")
	require.False(t, resourceResults.Resources[1].Processed, "should not be processed")
}

func TestUploadResourcesAndProcessPrivate_and_update_privacy(t *testing.T) {
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

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: imageId, Source: "STING"})
	workflowExecution2 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: videoId, Source: "STING"})

	videoEnv := getWorkflowEnvironment()

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
		Private:     true,
		Source:      proto.SOURCE_STING,
		Config: &loader.Config{
			Width:  0,
			Height: 0,
		},
	})

	didCheckResourceFirst := false
	didCheckResourceSecond := false

	videoEnv.SetOnActivityCompletedListener(func(activityInfo *activity.Info, details converter.EncodedValue, err error) {

		if activityInfo.ActivityType.Name == "ProcessResources" {
			result := queryResourceProgress(t, itemId, videoId)

			if result.Progress == 100 {
				require.Equal(t, types.ResourceProgressStateFinalizing, result.State, "should have the correct state")
				require.Equal(t, float64(100), result.Progress, "should have the correct progress")
			} else {
				require.Equal(t, types.ResourceProgressStateStarted, result.State, "should have the correct state")
				// we don't know what the progress will be - sometimes it can reach 100 but sometimes its 99, or 80, so we make sure it's just greater than 0
				require.GreaterOrEqual(t, result.Progress, float64(0), "should have the correct progress")
				didCheckResourceFirst = true
			}

			didCheckResourceFirst = true
		}

		if activityInfo.ActivityType.Name == "SendCallback" {
			result := queryResourceProgress(t, itemId, videoId)
			require.Equal(t, types.ResourceProgressStateFinalizing, result.State, "should have the correct state")
			require.Equal(t, float64(100), result.Progress, "should have the correct progress")
			didCheckResourceSecond = true
		}
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
	workflowExecution2.FindAndExecuteWorkflow(t, videoEnv)

	require.True(t, didCheckResourceFirst, "should have checked the resource")
	require.True(t, didCheckResourceSecond, "should have checked the resource")

	resourceResults, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: []string{res.Resources[0].Id, res.Resources[1].Id},
	})

	require.NoError(t, err, "no error getting resources")

	// create serializer instance
	serializer := resource.NewSerializer()

	unmarshalledResourcesOld, err := serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), resourceResults.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	// now, take the resources and change the privacy from private: true to private: false
	updateResourcePrivacyResults, err := grpcClient.UpdateResourcePrivacy(
		context.Background(),
		&loader.UpdateResourcePrivacyRequest{
			Resources: []*loader.ResourceIdentifier{
				{
					Id:     imageId,
					ItemId: itemId,
				},
				{
					Id:     videoId,
					ItemId: itemId,
				}},
			Private: false,
		},
	)

	require.NoError(t, err, "no error updating resource privacy")
	require.Len(t, updateResourcePrivacyResults.Resources, 2, "should have 2 updated resources")

	unmarshalledResources, err := serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), updateResourcePrivacyResults.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	var assertions int

	// validate all urls that the files are accessible, and check hashes
	for _, entity := range unmarshalledResources {

		require.False(t, entity.IsPrivate())

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

	assertions = 0

	// check all previous URLS (after moving) to ensure that they are no longer valid
	for _, entity := range unmarshalledResourcesOld {
		for _, u := range entity.FullUrls() {
			assertions += 1
			require.False(t, testing_tools.FileExists(u.FullUrl()), "file does not exist in bucket")
		}

		if entity.IsVideo() {
			assertions += 1
			require.False(t, testing_tools.FileExists(entity.VideoThumbnailFullUrl().FullUrl()), "video thumbnail does not exist bucket")
		}
	}

	require.Equal(t, 4, assertions, "should have checked 4 urls in total")

	result := queryResourceProgress(t, itemId, videoId)
	require.Equal(t, types.ResourceProgressStateFinalizing, result.State, "should have the correct state")
	require.Equal(t, float64(100), result.Progress, "should have the correct progress")
}

func TestUploadResourcesAndApplyWidths(t *testing.T) {
	t.Parallel()

	itemId := uuid.New().String()

	tusClient := getTusClient(t)
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1.png")

	grpcClient := getGrpcClient(t)

	imageId := strings.Split(imageFileId, "+")[0]

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, Width: 360, Height: 360, ResourceId: imageId, Source: "STING"})

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId},
		Private:     true,
		Config: &loader.Config{
			Width:  360,
			Height: 360,
		},
		Source: proto.SOURCE_STING,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	resourceResults, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: []string{res.Resources[0].Id},
	})

	require.NoError(t, err, "no error getting resources")

	require.Equal(t, int64(360), resourceResults.Resources[0].Width, "correct width for resource")
	require.Equal(t, int64(360), resourceResults.Resources[0].Height, "correct height for resource")

	serializer := resource.NewSerializer()
	unmarshalledResources, err := serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), resourceResults.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	// validate all urls that the files are accessible, and check hashes
	for _, entity := range unmarshalledResources {

		require.NotEmpty(t, entity.Preview(), "preview not empty")

		for _, u := range entity.FullUrls() {
			checkImageHash(t, u.FullUrl(), u.MimeType(), "applications/loader/internal/service/file_fixtures/test_file_1_360x360.webp", "applications/loader/internal/service/file_fixtures/test_file_1_360x360.jpg")
		}
	}
}

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

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: imageId, Width: 0, Height: 0, Source: "STING"})
	workflowExecution2 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: videoId, Width: 0, Height: 0, Source: "STING"})

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId},
		Private:     true,
		Config: &loader.Config{
			Width:  0,
			Height: 0,
		},
		Source: proto.SOURCE_STING,
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
	workflowExecution2.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

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

		if entity.IsImage() {
		}

		if entity.IsVideo() {
			assertions += 1
			require.True(t, testing_tools.FileExists(entity.VideoThumbnailFullUrl().FullUrl()), "video thumbnail file exists in bucket")
		}
	}

	require.Equal(t, 4, assertions, "should have checked 3 urls in total")

	pixelate := 20

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResourcesWithFiltersFromCopy, mock.Anything)

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
			NewItemId: itemId,
			Private:   false,
			Config: &loader.Config{
				Width:  0,
				Height: 0,
			},
			Filters: &loader.Filters{
				Pixelate: &loader.PixelateFilter{Size: int64(pixelate)},
			}},
	)

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

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

		require.NotEmpty(t, entity.Preview(), "preview not empty")

		if entity.ID() == originalImageFileNewId {
			require.Regexp(t, previewRegex, entity.Preview(), "should be a hex code")
			for _, u := range entity.FullUrls() {
				checkImageHash(t, u.FullUrl(), u.MimeType(), "applications/loader/internal/service/file_fixtures/test_file_1_pixelated.webp", "applications/loader/internal/service/file_fixtures/test_file_1_pixelated.jpg")
			}
		}

		if entity.ID() == originalVideoFileNewId {
			require.Regexp(t, previewRegex, entity.Preview(), "should be a hex code")
			for _, u := range entity.FullUrls() {
				checkImageHash(t, u.FullUrl(), u.MimeType(), "applications/loader/internal/service/file_fixtures/test_file_2_pixelated.webp", "applications/loader/internal/service/file_fixtures/test_file_2_pixelated.jpg")
			}
		}
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
	videoFileId2 := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_3_audio.mp4")

	imageId := strings.Split(imageFileId, "+")[0]
	videoId := strings.Split(videoFileId, "+")[0]
	videoId2 := strings.Split(videoFileId2, "+")[0]

	grpcClient := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: imageId, Source: "STING"})
	workflowExecution2 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: videoId, Source: "STING"})
	workflowExecution3 := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.ProcessResources, workflows.ProcessResourcesInput{ItemId: itemId, ResourceId: videoId2, Source: "STING"})

	// start processing of files by calling grpc endpoint
	res, err := grpcClient.CreateOrGetResourcesFromUploads(context.Background(), &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId:      itemId,
		ResourceIds: []string{imageFileId, videoFileId, videoFileId2},
		Private:     false,
		Source:      proto.SOURCE_STING,
		Config: &loader.Config{
			Width:  0,
			Height: 0,
		},
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	videoFileId = strings.Split(videoFileId, "+")[0]
	imageFileId = strings.Split(imageFileId, "+")[0]
	videoFileId2 = strings.Split(videoFileId2, "+")[0]

	resourceIds := []string{res.Resources[0].Id, res.Resources[1].Id, res.Resources[2].Id}

	// get resources and see that they are not processed yet (we did not run the workflow)
	resources, err := grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	// should have 2 elements
	require.Len(t, resources.Resources, 3, "should have 2 elements in res")

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

	require.Equal(t, 3, assertions, "expected to have checked 3 files")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
	workflowExecution2.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
	workflowExecution3.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	// then, run grpc call once again to make sure its processed
	resources, err = grpcClient.GetResources(context.Background(), &loader.GetResourcesRequest{
		ItemId:      itemId,
		ResourceIds: resourceIds,
	})

	require.NoError(t, err, "no error getting resources")

	unmarshalledResources, err = serializer.UnmarshalResourcesFromProto(graphql2.WithOperationContext(context.Background(), &graphql2.OperationContext{}), resources.Resources)
	require.NoError(t, err, "no error unmarshalling resources from proto")

	// should have 2 elements
	require.Len(t, unmarshalledResources, 3, "should have 2 elements")

	var newImageResource *resource.Resource
	var newVideoResource *resource.Resource
	var newVideoResource2 *resource.Resource

	for _, res := range unmarshalledResources {
		if res.ID() == videoFileId {
			newVideoResource = res
		}

		if res.ID() == imageFileId {
			newImageResource = res
		}

		if res.ID() == videoFileId2 {
			newVideoResource2 = res
		}
	}

	// first element is processed
	require.True(t, newImageResource.IsProcessed(), "should be processed #1")

	// second element is processed
	require.True(t, newVideoResource.IsProcessed(), "should be processed #2")

	// second element is processed
	require.True(t, newVideoResource2.IsProcessed(), "should be processed #3")

	// expect 2 urls for image
	require.Len(t, newImageResource.FullUrls(), 2)

	require.Equal(t, "image/webp", newImageResource.FullUrls()[0].MimeType(), "expected first image to be webp")
	require.Equal(t, "image/jpeg", newImageResource.FullUrls()[1].MimeType(), "expected second image to be jpg")

	require.Regexp(t, previewRegex, newImageResource.Preview(), "should be a hex code")

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
	require.Equal(t, "image/jpeg", newVideoResource.VideoThumbnailMimeType(), "expected video thumbnail to be jpg")
	require.True(t, newVideoResource.VideoNoAudio(), "expected video to have no audio track")

	require.Regexp(t, previewRegex, newVideoResource.Preview(), "should be a hex code")

	// second video
	require.Len(t, newVideoResource2.FullUrls(), 1)

	// correct dimensions
	require.Equal(t, 1080, newVideoResource2.Height(), "should be the correct height")
	require.Equal(t, 1920, newVideoResource2.Width(), "should be the correct width")

	// correct duration
	require.Equal(t, 5700, newVideoResource2.VideoDuration(), "should be the correct duration")
	require.Equal(t, "video/mp4", newVideoResource2.FullUrls()[0].MimeType(), "expected video to be mp4")
	require.Equal(t, "image/jpeg", newVideoResource2.VideoThumbnailMimeType(), "expected video thumbnail to be jpg")
	require.False(t, newVideoResource2.VideoNoAudio(), "expected video to have an audio track")

	require.Regexp(t, previewRegex, newVideoResource2.Preview(), "should be a hex code")

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

		// check hashes of both video thumbnail + images for processed
		if entity.IsVideo() {

			if entity.ID() == videoFileId {
				//checkVideoHash(t, entity.FullUrls()[0].FullUrl(), "applications/loader/internal/service/file_fixtures/test_file_2_processed.mp4")
				checkImageHash(t, entity.VideoThumbnailFullUrl().FullUrl(), entity.VideoThumbnailFullUrl().MimeType(), "", "applications/loader/internal/service/file_fixtures/test_file_2_processed.jpg")
			}

			if entity.ID() == videoFileId2 {
				//checkVideoHash(t, entity.FullUrls()[0].FullUrl(), "applications/loader/internal/service/file_fixtures/test_file_3_audio_processed.mp4")
				checkImageHash(t, entity.VideoThumbnailFullUrl().FullUrl(), entity.VideoThumbnailFullUrl().MimeType(), "", "applications/loader/internal/service/file_fixtures/test_file_3_audio_processed.jpg")
			}

		} else {
			for _, u := range entity.FullUrls() {
				checkImageHash(t, u.FullUrl(), u.MimeType(), "applications/loader/internal/service/file_fixtures/test_file_1_processed.webp", "applications/loader/internal/service/file_fixtures/test_file_1_processed.jpg")
			}
		}
	}

	require.Equal(t, 6, processedAssertions, "expected to have checked 4 files")

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

	require.Len(t, resourceUrlsTo404, 6, "should have 6 urls to check for deletion")

	for _, u := range resourceUrlsTo404 {
		require.False(t, testing_tools.FileExists(u), "file should no longer exist after being deleted")
	}
}
