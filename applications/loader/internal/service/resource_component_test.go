package service_test

import (
	"context"
	"encoding/base64"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/converter"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/applications/loader/internal/ports/graphql/types"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"strings"
	"testing"
)

type _Any map[string]interface{}

type MediaProgress struct {
	Entities []struct {
		MediaProgress types.MediaProgress `graphql:"... on ResourceProgress"`
	} `graphql:"_entities(representations: $representations)"`
}

func queryMediaProgress(t *testing.T, itemId, resourceId string) types.MediaProgress {
	client := getGraphqlClient(t)

	var progress MediaProgress

	err := client.Query(context.Background(), &progress, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "MediaProgress",
				"id":         base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.MediaProgress{}, itemId, resourceId))),
			},
		},
	})

	require.NoError(t, err)

	return progress.Entities[0].MediaProgress
}

func TestUploadMediaAndProcessFailed(t *testing.T) {
	// create an item ID to associate the resources with
	itemId := uuid.New().String()

	tusClient := getTusClient(t)
	imageFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1_broken.png")
	videoFileId := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_2_broken.mp4")

	imageId := strings.Split(imageFileId, "+")[0]
	videoId := strings.Split(videoFileId, "+")[0]

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, getWorkflowEnvironment(), workflows.ProcessMedia, workflows.ProcessMediaInput{
		Source: "STING",
		SourceMedia: &proto.Media{
			Id:               imageId,
			IsUpload:         true,
			OriginalFileName: "test_file_1_broken.png",
			Private:          true,
			Link: &proto.MediaLink{
				Id:   itemId,
				Type: proto.MediaLinkType_POST_CONTENT,
			},
			State: &proto.MediaState{
				Processed: false,
				Failed:    false,
			},
			Version: proto.MediaVersion_ONE,
		},
	})

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, getWorkflowEnvironment(), workflows.ProcessMedia,
		workflows.ProcessMediaInput{
			Source: "STING",
			SourceMedia: &proto.Media{
				Id:               videoId,
				IsUpload:         true,
				OriginalFileName: "test_file_2_broken.mp4",
				Private:          true,
				Link: &proto.MediaLink{
					Id:   itemId,
					Type: proto.MediaLinkType_POST_CONTENT,
				},
				State: &proto.MediaState{
					Processed: false,
					Failed:    false,
				},
				Version: proto.MediaVersion_ONE,
			},
		})

	grpcClient := getGrpcClient(t)

	var finalMedia []*proto.Media

	application.StingCallbackClient.On("UpdateMedia", mock.Anything, mock.Anything).Run(func(args mock.Arguments) {
		finalMedia = append(finalMedia, args[1].(*proto.UpdateMediaRequest).Media)
	}).Return(&emptypb.Empty{}, nil)

	// start processing of files by calling grpc endpoint
	_, err := grpcClient.ProcessMediaFromUploads(context.Background(), &loader.ProcessMediaFromUploadsRequest{
		Link: &proto.MediaLink{
			Id:   itemId,
			Type: proto.MediaLinkType_POST_CONTENT,
		},
		Source:    proto.SOURCE_STING,
		UploadIds: []string{imageFileId, videoFileId},
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	require.NoError(t, err, "no error getting resources")

	require.Len(t, finalMedia, 2, "should have only 2 media")
	require.True(t, finalMedia[0].State.Failed, "should have failed processing image")
	require.False(t, finalMedia[0].State.Processed, "should not be processed")

	require.True(t, finalMedia[1].State.Failed, "should have failed processing video")
	require.False(t, finalMedia[1].State.Processed, "should not be processed")
}

func TestUploadMedia(t *testing.T) {
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

	videoEnv := getWorkflowEnvironment()

	didCheckResourceFirst := false

	videoEnv.SetOnActivityCompletedListener(func(activityInfo *activity.Info, details converter.EncodedValue, err error) {
		if activityInfo.ActivityType.Name == "ProcessMediaFromUpload" {
			result := queryMediaProgress(t, itemId, videoId)

			if result.Progress == 100 {
				require.Equal(t, types.MediaProgressStateFinalizing, result.State, "should have the correct state")
				require.Equal(t, float64(100), result.Progress, "should have the correct progress")
			} else {
				require.Equal(t, types.MediaProgressStateStarted, result.State, "should have the correct state")
				// we don't know what the progress will be - sometimes it can reach 100 but sometimes its 99, or 80, so we make sure it's just greater than 0
				require.GreaterOrEqual(t, result.Progress, float64(0), "should have the correct progress")
			}

			didCheckResourceFirst = true
		}
	})

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, getWorkflowEnvironment(), workflows.ProcessMedia, workflows.ProcessMediaInput{
		Source: "STING",
		SourceMedia: &proto.Media{
			Id:               imageId,
			IsUpload:         true,
			OriginalFileName: "test_file_1.png",
			Private:          true,
			Link: &proto.MediaLink{
				Id:   itemId,
				Type: proto.MediaLinkType_POST_CONTENT,
			},
			State: &proto.MediaState{
				Processed: false,
				Failed:    false,
			},
			Version: proto.MediaVersion_ONE,
		},
	})

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, videoEnv, workflows.ProcessMedia, workflows.ProcessMediaInput{
		Source: "STING",
		SourceMedia: &proto.Media{
			Id:               videoId,
			IsUpload:         true,
			OriginalFileName: "test_file_2.mp4",
			Private:          true,
			Link: &proto.MediaLink{
				Id:   itemId,
				Type: proto.MediaLinkType_POST_CONTENT,
			},
			State: &proto.MediaState{
				Processed: false,
				Failed:    false,
			},
			Version: proto.MediaVersion_ONE,
		},
	})

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, getWorkflowEnvironment(), workflows.ProcessMedia, workflows.ProcessMediaInput{
		Source: "STING",
		SourceMedia: &proto.Media{
			Id:               videoId2,
			IsUpload:         true,
			OriginalFileName: "test_file_3_audio.mp4",
			Private:          true,
			Link: &proto.MediaLink{
				Id:   itemId,
				Type: proto.MediaLinkType_POST_CONTENT,
			},
			State: &proto.MediaState{
				Processed: false,
				Failed:    false,
			},
			Version: proto.MediaVersion_ONE,
		},
	})

	var finalMedia []*proto.Media

	application.StingCallbackClient.On("UpdateMedia", mock.Anything, mock.Anything).Run(func(args mock.Arguments) {
		finalMedia = append(finalMedia, args[1].(*proto.UpdateMediaRequest).Media)
	}).Return(&emptypb.Empty{}, nil)

	res, err := grpcClient.ProcessMediaFromUploads(context.Background(), &loader.ProcessMediaFromUploadsRequest{
		Link: &proto.MediaLink{
			Id:   itemId,
			Type: proto.MediaLinkType_POST_CONTENT,
		},
		Source:    proto.SOURCE_STING,
		UploadIds: []string{imageFileId, videoFileId, videoFileId2},
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	videoFileId = strings.Split(videoFileId, "+")[0]
	imageFileId = strings.Split(imageFileId, "+")[0]
	videoFileId2 = strings.Split(videoFileId2, "+")[0]

	// should have 3 elements
	require.Len(t, finalMedia, 3, "should have 3 elements in res")

	var imageMedia *proto.Media
	var videoMedia *proto.Media

	for _, res := range res.Media {
		if res.Id == videoFileId {
			videoMedia = res
		}

		if res.Id == imageFileId {
			imageMedia = res
		}
	}

	// first element is not processed
	require.False(t, imageMedia.State.Processed, "should not be processed #1")
	require.Equal(t, imageMedia.Link.Id, itemId, "correct item ID #1")

	// second element is not processed
	require.False(t, videoMedia.State.Processed, "should not be processed #2")
	require.Equal(t, videoMedia.Link.Id, itemId, "correct item ID #2")

	require.True(t, didCheckResourceFirst, "should have checked the resource")

	var unmarshalledMedia []*media.Media

	for _, m := range finalMedia {
		unmarshalledMedia = append(unmarshalledMedia, media.FromProto(m))
	}

	// should have 3 elements
	require.Len(t, unmarshalledMedia, 3, "should have 3 elements")

	var newImageMedia *media.Media
	var newVideoMedia *media.Media
	var newVideoMedia2 *media.Media

	for _, res := range unmarshalledMedia {
		if res.ID() == videoFileId {
			newVideoMedia = res
		}

		if res.ID() == imageFileId {
			newImageMedia = res
		}

		if res.ID() == videoFileId2 {
			newVideoMedia2 = res
		}
	}

	// first element is processed
	require.True(t, newImageMedia.IsProcessed(), "should be processed #1")

	// second element is processed
	require.True(t, newVideoMedia.IsProcessed(), "should be processed #2")

	// second element is processed
	require.True(t, newVideoMedia2.IsProcessed(), "should be processed #3")

	require.Equal(t, proto.MediaMimeType_ImagePng, newImageMedia.ImageMimeType(), "expected to be a png image")

	require.Len(t, newImageMedia.ColorPalettes(), 3, "should have 2 color palettes")

	// correct dimensions
	require.Equal(t, 532, newImageMedia.ImageHeight(), "should be the correct height")
	require.Equal(t, 656, newImageMedia.ImageWidth(), "should be the correct width")

	require.Len(t, newVideoMedia.VideoContainers(), 2, "should have 2 video containers")

	require.Equal(t, proto.MediaMimeType_VideoMpegUrl, newVideoMedia.VideoContainers()[0].MimeType(), "should be the correct mime type")

	// correct dimensions
	require.Equal(t, 360, newVideoMedia.VideoContainers()[1].Height(), "should be the correct height")
	require.Equal(t, 640, newVideoMedia.VideoContainers()[1].Width(), "should be the correct width")
	require.Equal(t, proto.MediaMimeType_VideoMp4, newVideoMedia.VideoContainers()[1].MimeType(), "should be the correct mime type")

	// correct duration
	require.Equal(t, 13347, newVideoMedia.VideoDuration(), "should be the correct duration")

	require.Equal(t, proto.MediaMimeType_ImageJpeg, newVideoMedia.ImageMimeType(), "expected video thumbnail to be jpg")
	require.True(t, newVideoMedia.VideoNoAudio(), "expected video to have no audio track")

	require.Len(t, newVideoMedia.ColorPalettes(), 3, "should have 3 color palettes")

	require.Len(t, newVideoMedia2.VideoContainers(), 2, "should have 2 video containers")

	// correct dimensions
	require.Equal(t, 1080, newVideoMedia2.VideoContainers()[1].Height(), "should be the correct height")
	require.Equal(t, 1920, newVideoMedia2.VideoContainers()[1].Width(), "should be the correct width")
	require.Equal(t, proto.MediaMimeType_VideoMp4, newVideoMedia2.VideoContainers()[1].MimeType(), "should be the correct mime type")

	// correct duration
	require.Equal(t, 5782, newVideoMedia2.VideoDuration(), "should be the correct duration")
	require.Equal(t, proto.MediaMimeType_ImageJpeg, newVideoMedia2.ImageMimeType(), "expected video thumbnail to be jpg")
	require.False(t, newVideoMedia2.VideoNoAudio(), "expected video to have an audio track")

	require.Len(t, newVideoMedia2.ColorPalettes(), 3, "should have 3 color palettes")

	var processedAssertions int

	// our list that we will check to make sure all files are deleted here

	// assert files existence
	for _, entity := range unmarshalledMedia {

		imageMediaUrl := entity.OriginalImageMediaAccess().Url()

		require.True(t, testing_tools.FileExists(imageMediaUrl), "processed file exists in bucket")
		processedAssertions += 1

		if entity.IsVideo() {
			for _, container := range entity.VideoContainers() {
				require.True(t, testing_tools.FileExists(container.Url()), "video thumbnail file exists in bucket")
				processedAssertions += 1
			}
		}

		// check hashes of both video thumbnail + images for processed
		if entity.IsVideo() {

			if entity.ID() == videoFileId {
				checkImageHash(t, imageMediaUrl, "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_2_processed.jpg")
			}

			if entity.ID() == videoFileId2 {
				checkImageHash(t, imageMediaUrl, "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_3_audio_processed.jpg")
			}

		} else {
			checkImageHash(t, imageMediaUrl, "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_1_processed.jpg")
		}
	}

	require.Equal(t, 6, processedAssertions, "expected to have checked 6 files")

	pixelate := 20

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, getWorkflowEnvironment(), workflows.ProcessMedia, mock.Anything)

	copyMediaResults, err := grpcClient.GenerateImageFromMedia(
		context.Background(),
		&loader.GenerateImageFromMediaRequest{
			Media: []*proto.Media{
				finalMedia[0],
				finalMedia[1],
			},
			Link: &proto.MediaLink{
				Id:   itemId,
				Type: proto.MediaLinkType_POST_CONTENT,
			},
			Source: 0,
			Filters: &loader.Filters{
				Pixelate: &loader.PixelateFilter{Size: int64(pixelate)},
			},
		},
	)

	finalMedia = []*proto.Media{}

	require.NoError(t, err, "no error copying resources")

	require.Len(t, copyMediaResults.Media, 2, "should have 2 filtered resources")

	var originalImageFileNewId string
	var originalVideoFileNewId string

	for _, r := range copyMediaResults.Media {
		if r.Source.SourceMediaId == imageId {
			originalImageFileNewId = r.Id
		} else if r.Source.SourceMediaId == videoId {
			originalVideoFileNewId = r.Id
		}
	}

	unmarshalledMedia = []*media.Media{}

	for _, m := range finalMedia {
		unmarshalledMedia = append(unmarshalledMedia, media.FromProto(m))
	}

	// validate all urls that the files are accessible, and check hashes
	for _, entity := range unmarshalledMedia {

		require.Len(t, entity.ColorPalettes(), 3, "contains previews")

		if entity.ID() == originalImageFileNewId {
			checkImageHash(t, entity.OriginalImageMediaAccess().Url(), "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_1_pixelated.jpg")
		}

		if entity.ID() == originalVideoFileNewId {
			checkImageHash(t, entity.OriginalImageMediaAccess().Url(), "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_2_pixelated.jpg")
		}
	}
}
