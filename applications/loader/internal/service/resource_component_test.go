package service_test

import (
	"bytes"
	"context"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/converter"
	"google.golang.org/protobuf/types/known/emptypb"
	"os/exec"
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
		MediaProgress types.MediaProgress `graphql:"... on MediaProgress"`
	} `graphql:"_entities(representations: $representations)"`
}

func queryMediaProgress(t *testing.T, itemId, resourceId string) types.MediaProgress {
	client := getGraphqlClient(t)

	var progress MediaProgress

	err := client.Query(context.Background(), &progress, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "MediaProgress",
				"id":         relay.MarshalRelayId(relay.NewID(types.MediaProgress{}, itemId, resourceId)),
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
	imageFileId2 := uploadFileWithTus(t, tusClient, "applications/loader/internal/service/file_fixtures/test_file_1_360x360.jpg")

	imageId := strings.Split(imageFileId, "+")[0]
	videoId := strings.Split(videoFileId, "+")[0]
	imageId2 := strings.Split(imageFileId2, "+")[0]

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

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, getWorkflowEnvironment(), workflows.ProcessMedia,
		workflows.ProcessMediaInput{
			Source: "STING",
			SourceMedia: &proto.Media{
				Id:               imageId2,
				IsUpload:         true,
				OriginalFileName: "test_file_1_360x360.jpg",
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
	}).Return(&emptypb.Empty{}, nil).Times(3)

	// start processing of files by calling grpc endpoint
	_, err := grpcClient.ProcessMediaFromUploads(context.Background(), &loader.ProcessMediaFromUploadsRequest{
		Link: &proto.MediaLink{
			Id:   itemId,
			Type: proto.MediaLinkType_POST_CONTENT,
		},
		Source:    proto.SOURCE_STING,
		UploadIds: []string{imageFileId, videoFileId, imageId2},
	})

	require.NoError(t, err, "no error creating new resources from uploads")

	require.NoError(t, err, "no error getting resources")

	require.Len(t, finalMedia, 3, "should have 3 media")
	require.True(t, finalMedia[0].State.Failed, "should have failed processing image")
	require.False(t, finalMedia[0].State.Processed, "should not be processed")

	require.True(t, finalMedia[1].State.Failed, "should have failed processing video")
	require.False(t, finalMedia[1].State.Processed, "should not be processed")

	require.False(t, finalMedia[2].State.Failed, "should have failed processing video")
	require.True(t, finalMedia[2].State.Processed, "should be processed")
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
				if result.State == types.MediaProgressStateFinalizing {
					didCheckResourceFirst = true
				}
			} else {
				if result.State == types.MediaProgressStateStarted {
					didCheckResourceFirst = true
				}
			}
		}
	})

	var finalMedia []*proto.Media

	application.StingCallbackClient.On("UpdateMedia", mock.Anything, mock.Anything).Run(func(args mock.Arguments) {
		finalMedia = append(finalMedia, args[1].(*proto.UpdateMediaRequest).Media)
	}).Return(&emptypb.Empty{}, nil).Times(5)

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

	require.Equal(t, proto.MediaMimeType_ImageJpeg, newImageMedia.ImageMimeType(), "expected to be a png image")

	require.Len(t, newImageMedia.ColorPalettes(), 3, "should have 2 color palettes")

	// correct dimensions
	require.Equal(t, 532, newImageMedia.LegacyImageHeight(), "should be the correct height")
	require.Equal(t, 656, newImageMedia.LegacyImageWidth(), "should be the correct width")

	require.Len(t, newVideoMedia.VideoContainers(), 2, "should have 2 video containers")

	require.Equal(t, proto.MediaMimeType_VideoMpegUrl, newVideoMedia.VideoContainers()[0].MimeType(), "should be the correct mime type")
	require.Equal(t, proto.MediaDeviceType_Universal, *newVideoMedia.VideoContainers()[0].Device(), "should be the correct mime type")

	// correct dimensions
	require.Equal(t, 360, newVideoMedia.VideoContainers()[1].Height(), "should be the correct height")
	require.Equal(t, 640, newVideoMedia.VideoContainers()[1].Width(), "should be the correct width")
	require.Equal(t, proto.MediaMimeType_VideoMp4, newVideoMedia.VideoContainers()[1].MimeType(), "should be the correct mime type")

	// correct duration
	require.Equal(t, 13347, newVideoMedia.VideoDuration(), "should be the correct duration")

	require.Equal(t, proto.MediaMimeType_ImageJpeg, newVideoMedia.ImageMimeType(), "expected video thumbnail to be jpg")
	require.False(t, newVideoMedia.HasAudio(), "expected video to have no audio track")

	require.Len(t, newVideoMedia.ColorPalettes(), 3, "should have 3 color palettes")

	require.Len(t, newVideoMedia2.VideoContainers(), 3, "should have 2 video containers")

	require.Equal(t, proto.MediaMimeType_VideoMpegUrl, newVideoMedia2.VideoContainers()[0].MimeType(), "should be the correct mime type")
	require.Equal(t, proto.MediaDeviceType_Desktop, *newVideoMedia2.VideoContainers()[0].Device(), "should be the correct mime type")
	require.Equal(t, proto.MediaDeviceType_Mobile, *newVideoMedia2.VideoContainers()[1].Device(), "should be the correct mime type")
	require.Equal(t, proto.MediaMimeType_VideoMpegUrl, newVideoMedia2.VideoContainers()[1].MimeType(), "should be the correct mime type")

	// correct dimensions
	require.Equal(t, 720, newVideoMedia2.VideoContainers()[2].Height(), "should be the correct height")
	require.Equal(t, 1280, newVideoMedia2.VideoContainers()[2].Width(), "should be the correct width")
	require.Equal(t, proto.MediaMimeType_VideoMp4, newVideoMedia2.VideoContainers()[2].MimeType(), "should be the correct mime type")

	// correct duration
	require.GreaterOrEqual(t, newVideoMedia2.VideoDuration(), 5700, "should be the correct duration")
	require.Equal(t, proto.MediaMimeType_ImageJpeg, newVideoMedia2.ImageMimeType(), "expected video thumbnail to be jpg")
	require.True(t, newVideoMedia2.HasAudio(), "expected video to have an audio track")

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

				cmd := exec.CommandContext(context.Background(), "ffprobe", container.Url())
				buf := bytes.NewBuffer(nil)
				cmd.Stdout = buf
				cmd.Stderr = buf
				err := cmd.Run()
				t.Log(string(buf.Bytes()))
				require.NoError(t, err, "no error probing video file")

				processedAssertions += 1
			}
		}

		// check hashes of both video thumbnail + images for processed
		if entity.IsVideo() {

			if entity.ID() == videoFileId {
				//	checkImageHash(t, imageMediaUrl, "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_2_processed.jpg")
			}

			if entity.ID() == videoFileId2 {
				//	checkImageHash(t, imageMediaUrl, "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_3_audio_processed.jpg")
			}

		} else {
			checkImageHash(t, imageMediaUrl, "image/jpeg", "", "applications/loader/internal/service/file_fixtures/test_file_1_processed.jpg")
		}
	}

	pixelate := 20

	testing_tools.NewEagerMockWorkflowWithArgs(t, application.TemporalClient, getWorkflowEnvironment(), workflows.ProcessMedia, mock.Anything)
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
