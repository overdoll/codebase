package media

import (
	"context"
	"encoding/hex"
	"encoding/json"
	proto2 "github.com/golang/protobuf/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/media/proto"
	"strconv"
	"strings"
)

type serializedResource struct {
	ItemId                 string   `json:"item_id"`
	ResourceId             string   `json:"resource_id"`
	Type                   int      `json:"type"`
	MimeTypes              []string `json:"mime_types"`
	Processed              bool     `json:"processed"`
	ProcessedId            string   `json:"processed_id"`
	IsPrivate              bool     `json:"is_private"`
	VideoDuration          int      `json:"video_duration"`
	VideoThumbnail         string   `json:"video_thumbnail"`
	VideoThumbnailMimeType string   `json:"video_thumbnail_mime_type"`
	VideoNoAudio           bool     `json:"video_no_audio"`
	Width                  int      `json:"width"`
	Height                 int      `json:"height"`
	Preview                string   `json:"preview"`
	Failed                 bool     `json:"failed"`
}

func unmarshalLegacyResourceFromDatabase(ctx context.Context, resource string) (*Media, error) {

	var re serializedResource

	if err := json.Unmarshal([]byte(resource), &re); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal legacy resource")
	}

	var videoData *proto.VideoData
	var imageData *proto.ImageData

	if re.Processed && re.VideoThumbnailMimeType != "" {
		newWidth, newHeight := CalculateAspectRatio(re.Width, re.Height)
		videoData = &proto.VideoData{
			Id: re.ProcessedId,
			Containers: []*proto.VideoContainer{{
				Id:       re.ProcessedId + ".mp4",
				MimeType: proto.MediaMimeType_VideoMp4,
				Bitrate:  0,
				Height:   uint32(re.Height),
				Width:    uint32(re.Width),
			}},
			AspectRatio: &proto.VideoAspectRatio{
				Width:  uint32(newWidth),
				Height: uint32(newHeight),
			},
			DurationMilliseconds: int64(re.VideoDuration),
			HasAudio:             !re.VideoNoAudio,
		}
	}

	if re.Processed {
		var palette []*proto.ColorPalette

		if re.Preview != "" {
			values, err := strconv.ParseUint(strings.Replace(re.Preview, "#", "", 1), 16, 32)

			if err != nil {
				return nil, errors.Wrap(err, "failed to parse preview for legacy resource")
			}

			palette = append(palette, &proto.ColorPalette{
				Percent: 100,
				Red:     uint32(uint8(values >> 16)),
				Green:   uint32(uint8((values >> 8) & 0xFF)),
				Blue:    uint32(uint8(values & 0xFF)),
			})
		} else {
			palette = append(palette, &proto.ColorPalette{
				Percent: 100,
				Red:     255,
				Green:   255,
				Blue:    255,
			})
		}

		lastMimeType := re.MimeTypes[len(re.MimeTypes)-1]

		imageData = &proto.ImageData{
			Sizes: []*proto.ImageDataSize{
				{
					Id:     "",
					Width:  uint32(re.Width),
					Height: uint32(re.Height),
				},
			},
			Palettes: palette,
		}

		if lastMimeType == "image/jpeg" {
			imageData.Id = re.ProcessedId
			imageData.MimeType = proto.MediaMimeType_ImageJpeg
		} else if lastMimeType == "image/png" {
			imageData.Id = re.ProcessedId
			imageData.MimeType = proto.MediaMimeType_ImagePng
		} else {
			imageData.Id = re.ProcessedId
			imageData.MimeType = proto.MediaMimeType_ImageJpeg
		}
	}

	return &Media{
		proto: &proto.Media{
			Id:        re.ResourceId,
			Private:   re.IsPrivate,
			VideoData: videoData,
			ImageData: imageData,
			State: &proto.MediaState{
				Processed: re.Processed,
				Failed:    re.Failed,
			},
			Link: &proto.MediaLink{
				Id:   re.ItemId,
				Type: 0,
			},
			Version: 0,
		},
		legacy: resource,
	}, nil
}

func MarshalMediaToDatabase(media *Media) (*string, error) {

	if media == nil {
		return nil, nil
	}

	if media.legacy != "" {
		return nil, nil
	}

	marshalled, err := proto2.Marshal(media.proto)

	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal media to database")
	}

	// encode to hex string for storage
	res := hex.EncodeToString(marshalled)
	return &res, nil
}

func UnmarshalMediaFromDatabase(ctx context.Context, media *string) (*Media, error) {

	newData, err := hex.DecodeString(*media)
	if err != nil {
		return nil, errors.Wrap(err, "failed to decode hex string")
	}

	var res proto.Media

	if err := proto2.Unmarshal(newData, &res); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal media from database")
	}

	return FromProto(&res), nil
}

func UnmarshalMediaWithLegacyResourceFromDatabase(ctx context.Context, resource string, media *string) (*Media, error) {

	if resource != "" {
		return unmarshalLegacyResourceFromDatabase(ctx, resource)
	}

	if media != nil {
		return UnmarshalMediaFromDatabase(ctx, media)
	}

	return nil, nil
}
