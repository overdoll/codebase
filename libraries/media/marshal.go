package media

import (
	"context"
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
		videoData = &proto.VideoData{
			Containers: []*proto.VideoContainer{{
				Id:       re.ProcessedId + ".mp4",
				MimeType: proto.MediaMimeType_VideoMp4,
				Bitrate:  0,
				Height:   int64(re.Height),
				Width:    int64(re.Width),
			}},
			AspectRatio: &proto.VideoAspectRatio{
				Width:  0,
				Height: 0,
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
				Red:     int32(uint8(values >> 16)),
				Green:   int32(uint8((values >> 8) & 0xFF)),
				Blue:    int32(uint8(values & 0xFF)),
			})
		}

		imageData = &proto.ImageData{
			Id:       re.ProcessedId + ".jpg",
			MimeType: proto.MediaMimeType_ImageJpeg,
			Width:    int64(re.Width),
			Height:   int64(re.Height),
			Palettes: palette,
		}
	}

	return FromProto(&proto.Media{
		Id:        re.ResourceId,
		Private:   re.IsPrivate,
		VideoData: videoData,
		ImageData: imageData,
		State: &proto.MediaState{
			Processed: re.Processed,
			Failed:    re.Failed,
		},
		Version: 0,
	}), nil
}

func MarshalMediaToDatabase(media *Media) ([]byte, error) {

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

	return marshalled, nil
}

func UnmarshalMediaFromDatabase(ctx context.Context, media []byte) (*Media, error) {

	var res proto.Media

	if err := proto2.Unmarshal(media, &res); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal media from database")
	}

	return FromProto(&res), nil
}

func UnmarshalMediaWithLegacyResourceFromDatabase(ctx context.Context, resource string, media []byte) (*Media, error) {

	if resource != "" {
		return unmarshalLegacyResourceFromDatabase(ctx, resource)
	}

	if media != nil {
		return UnmarshalMediaFromDatabase(ctx, media)
	}

	return nil, nil
}
