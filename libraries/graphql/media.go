package graphql

import (
	"context"
	"fmt"
	"io"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"strconv"
)

// Identifies the type of media
type MediaDeviceType string

const (
	MediaDeviceTypeMobile    MediaDeviceType = "MOBILE"
	MediaDeviceTypeDesktop   MediaDeviceType = "DESKTOP"
	MediaDeviceTypeUniversal MediaDeviceType = "UNIVERSAL"
)

var AllMediaDeviceType = []MediaDeviceType{
	MediaDeviceTypeMobile,
	MediaDeviceTypeDesktop,
	MediaDeviceTypeUniversal,
}

func (e MediaDeviceType) IsValid() bool {
	switch e {
	case MediaDeviceTypeMobile, MediaDeviceTypeDesktop, MediaDeviceTypeUniversal:
		return true
	}
	return false
}

func (e MediaDeviceType) String() string {
	return string(e)
}

func (e *MediaDeviceType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = MediaDeviceType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid MediaDeviceType", str)
	}
	return nil
}

func (e MediaDeviceType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// An application/x-mpegURL video container.
type HLSVideoContainer struct {
	// The URL used to access the container.
	URL URI `json:"url"`

	// The MediaDeviceType used to access the container.
	TargetDevice MediaDeviceType `json:"targetDevice"`
}

func (HLSVideoContainer) IsVideoContainer() {}

type ImageMedia struct {
	// An ID uniquely identifying this media.
	ID relay.ID `json:"id"`
	// All available variants for this media.
	Variants *ImageMediaVariants `json:"variants"`
	// Color palettes for this image.
	ColorPalettes []*ColorPalette `json:"colorPalettes"`
}

type ColorPalette struct {
	Percent float64 `json:"percent"`
	Red     int     `json:"red"`
	Green   int     `json:"green"`
	Blue    int     `json:"blue"`
}

func (ImageMedia) IsMedia() {}

// Type used to access a specific image.
type ImageMediaAccess struct {
	// The width of the image.
	Width int `json:"width"`
	// The height of the image.
	Height int `json:"height"`
	// The URL used to access the image.
	URL URI `json:"url"`
}

// All variants available for an image.
type ImageMediaVariants struct {
	// 50x50 crop of an image. Suitable for mini icons.
	Mini *ImageMediaAccess `json:"mini"`
	// 100x100 crop of an image. Suitable for icons.
	Icon *ImageMediaAccess `json:"icon"`
	// 150x150 crop of an image. Suitable for small previews.
	Thumbnail *ImageMediaAccess `json:"thumbnail"`
	// 680px width or height resize.
	Small *ImageMediaAccess `json:"small"`
	// 1200px width or height resize.
	Medium *ImageMediaAccess `json:"medium"`
	// 2048px width or height resize.
	Large *ImageMediaAccess `json:"large"`
	// 4096px width or height resize.
	Hd *ImageMediaAccess `json:"hd"`
	// 720px width or height resize.
	Banner *ImageMediaAccess `json:"banner"`
	// 360px width or height resize.
	SmallBanner *ImageMediaAccess `json:"smallBanner"`
}

// A video/mp4 video container.
type MP4VideoContainer struct {
	// The URL used to access the container.
	URL URI `json:"url"`
	// The bitrate of the video.
	Bitrate int `json:"bitrate"`
	// The width of the video.
	Width int `json:"width"`
	// The height of the video.
	Height int `json:"height"`
}

func (MP4VideoContainer) IsVideoContainer() {}

type MediaProgress struct {
	// An ID identifying this progress.
	ID relay.ID `json:"id"`
}

func (MediaProgress) IsEntity() {}

// RawMedia represents an unprocessed media object.
//
// While a media object is RawMedia, it is still in the process of processing.
type RawMedia struct {
	// An ID uniquely identifying this media.
	ID relay.ID `json:"id"`
	// The name of the original file, when it was uploaded.
	OriginalFileName string `json:"originalFileName"`
	// Whether or not the media failed processing.
	Failed bool `json:"failed"`
	// The current progress of the media processing.
	Progress *MediaProgress `json:"progress"`
}

func (RawMedia) IsMedia() {}

type VideoMedia struct {
	// An ID uniquely identifying this media.
	ID relay.ID `json:"id"`
	// The cover for this image media.
	Cover *ImageMedia `json:"cover"`
	// The aspect ratio of the media.
	AspectRatio *AspectRatio `json:"aspectRatio"`
	// The container for videos.
	//
	// A video can have multiple containers, for example, an HLS video for general playback, and an .mp4 video as fallback.
	Containers []VideoContainer `json:"containers"`
	// The video duration, in milliseconds.
	Duration int `json:"duration"`
	// Whether or not the video has audio.
	HasAudio bool `json:"hasAudio"`
}

func (VideoMedia) IsMedia() {}

// Data about the aspect ratio.
type AspectRatio struct {
	// The width.
	Width int `json:"width"`
	// The height.
	Height int `json:"height"`
}

// A container used to access the video.
type VideoContainer interface {
	IsVideoContainer()
}

type Media interface {
	IsMedia()
}

func marshalImageAccessToGraphQL(ctx context.Context, variant *media.ImageMediaAccess) *ImageMediaAccess {
	return &ImageMediaAccess{
		Width:  variant.Width(),
		Height: variant.Height(),
		URL:    URI(variant.Url()),
	}
}

func marshalImageMediaToGraphQL(ctx context.Context, res *media.Media) *ImageMedia {

	var palettes []*ColorPalette

	for _, palette := range res.ColorPalettes() {
		palettes = append(palettes, &ColorPalette{
			Percent: palette.Percent(),
			Red:     palette.Red(),
			Green:   palette.Green(),
			Blue:    palette.Blue(),
		})
	}

	return &ImageMedia{
		ID: relay.NewID(ImageMedia{}, res.UniqueId()),
		Variants: &ImageMediaVariants{
			Mini:        marshalImageAccessToGraphQL(ctx, res.MiniImageMediaAccess()),
			Icon:        marshalImageAccessToGraphQL(ctx, res.IconImageMediaAccess()),
			Thumbnail:   marshalImageAccessToGraphQL(ctx, res.ThumbnailImageMediaAccess()),
			Small:       marshalImageAccessToGraphQL(ctx, res.SmallImageMediaAccess()),
			Medium:      marshalImageAccessToGraphQL(ctx, res.MediumImageMediaAccess()),
			Large:       marshalImageAccessToGraphQL(ctx, res.LargeImageMediaAccess()),
			Hd:          marshalImageAccessToGraphQL(ctx, res.HdImageMediaAccess()),
			Banner:      marshalImageAccessToGraphQL(ctx, res.BannerImageMediaAccess()),
			SmallBanner: marshalImageAccessToGraphQL(ctx, res.SmallBannerImageMediaAccess()),
		},
		ColorPalettes: palettes,
	}
}

func MarshaMediaToGraphQL(ctx context.Context, res *media.Media) Media {

	if res == nil {
		return nil
	}

	if !res.IsProcessed() {
		return &RawMedia{
			ID:               relay.NewID(RawMedia{}, res.UniqueId()),
			OriginalFileName: res.OriginalFileName(),
			Failed:           res.IsFailed(),
			Progress:         &MediaProgress{ID: relay.NewID(MediaProgress{}, res.LinkedId(), res.ID())},
		}
	}

	if res.IsVideo() {

		var containers []VideoContainer

		for _, container := range res.VideoContainers() {
			if container.MimeType() == proto.MediaMimeType_VideoMp4 {
				containers = append(containers, &MP4VideoContainer{
					URL:     URI(container.Url()),
					Bitrate: container.Bitrate(),
					Width:   container.Width(),
					Height:  container.Height(),
				})
			}

			if container.MimeType() == proto.MediaMimeType_VideoMpegUrl {

				var mediaDeviceType MediaDeviceType

				if *container.Device() == proto.MediaDeviceType_Mobile {
					mediaDeviceType = MediaDeviceTypeMobile
				}

				if *container.Device() == proto.MediaDeviceType_Desktop {
					mediaDeviceType = MediaDeviceTypeDesktop
				}

				if *container.Device() == proto.MediaDeviceType_Universal {
					mediaDeviceType = MediaDeviceTypeUniversal
				}

				containers = append(containers, &HLSVideoContainer{
					URL:          URI(container.Url()),
					TargetDevice: mediaDeviceType,
				})
			}
		}

		return &VideoMedia{
			ID:    relay.NewID(VideoMedia{}, res.UniqueId()),
			Cover: marshalImageMediaToGraphQL(ctx, res),
			AspectRatio: &AspectRatio{
				Width:  res.VideoAspectRatioWidth(),
				Height: res.VideoAspectRatioHeight(),
			},
			Containers: containers,
			Duration:   res.VideoDuration(),
			HasAudio:   res.HasAudio(),
		}
	}

	return marshalImageMediaToGraphQL(ctx, res)
}
