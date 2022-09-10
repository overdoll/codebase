package media

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/aws/aws-sdk-go/service/s3"
	proto2 "github.com/golang/protobuf/proto"
	"go.uber.org/zap"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/support"
	"strconv"
	"sync"
	"time"
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

var serializer *Serializer

func init() {
	rsa, err := support.ParseRsaPrivateKeyFromPemEnvFile(os.Getenv("AWS_PRIVATE_MEDIA_KEY_PAIR_PRIVATE_KEY"))

	if err != nil {
		zap.S().Panicw("failed to parse RSA private key", zap.Error(err))
	}

	resourcesSigner := sign.NewURLSigner(os.Getenv("AWS_PRIVATE_MEDIA_KEY_PAIR_ID"), rsa)

	serializer = &Serializer{signer: resourcesSigner}
}

type Serializer struct {
	signer *sign.URLSigner
}

func (c Serializer) unmarshalResources(ctx context.Context, resourcesList []string) ([]*Media, error) {

	var res []serializedResource

	for _, rString := range resourcesList {

		var re serializedResource

		if err := json.Unmarshal([]byte(rString), &re); err != nil {
			return nil, err
		}

		res = append(res, re)
	}

	var wg sync.WaitGroup

	wg.Add(len(res))

	errs := make(chan error)

	resourcesResult := make([]*Resource, len(res))

	for i, z := range res {
		go func(index int, z serializedResource) {
			defer wg.Done()
			result, err := c.unmarshalResourceFromDatabaseWithSignedUrls(z)

			if err == nil {
				resourcesResult[index] = result
			} else {
				errs <- errors.Wrap(err, "error unmarshalling resource")
			}
		}(i, z)
	}

	go func() {
		wg.Wait()
		close(errs)
	}()

	// return the first error
	for err := range errs {
		if err != nil {
			return nil, err
		}
	}

	return resourcesResult, nil
}

func (c *Serializer) UnmarshalResourceFromDatabase(ctx context.Context, serializedResources string) (*Resource, error) {

	if serializedResources == "" {
		return nil, nil
	}

	if true {

		target, err := c.unmarshalResources(ctx, []string{serializedResources})

		if err != nil {
			return nil, err
		}

		return target[0], nil
	}

	var i serializedResource

	if err := json.Unmarshal([]byte(serializedResources), &i); err != nil {
		return nil, err
	}

	return unmarshalResourceFromDatabase(
		i.ItemId,
		i.ResourceId,
		i.Type,
		i.IsPrivate,
		i.MimeTypes,
		i.Processed,
		i.ProcessedId,
		i.VideoDuration,
		i.VideoThumbnail,
		i.VideoThumbnailMimeType,
		i.Width,
		i.Height,
		nil,
		nil,
		i.Preview,
		i.Failed,
		i.VideoNoAudio,
	), nil
}

func (c *Serializer) UnmarshalResourcesFromDatabase(ctx context.Context, serializedResources []string) ([]*Resource, error) {

	var targets []*Resource

	if true {

		var valueString []string

		for _, r := range serializedResources {
			valueString = append(valueString, r)
		}

		target, err := c.unmarshalResources(ctx, valueString)

		if err != nil {
			return nil, err
		}

		targets = target
	} else {
		for _, resourceString := range serializedResources {

			var i serializedResource

			if err := json.Unmarshal([]byte(resourceString), &i); err != nil {
				return nil, err
			}

			// otherwise, use regular
			targets = append(targets, unmarshalResourceFromDatabase(
				i.ItemId,
				i.ResourceId,
				i.Type,
				i.IsPrivate,
				i.MimeTypes,
				i.Processed,
				i.ProcessedId,
				i.VideoDuration,
				i.VideoThumbnail,
				i.VideoThumbnailMimeType,
				i.Width,
				i.Height,
				nil,
				nil,
				i.Preview,
				i.Failed,
				i.VideoNoAudio,
			))
		}
	}

	return targets, nil
}

func (c *Serializer) createSignedUrl(url string) (string, error) {

	timestamp := time.Now()

	year := timestamp.Year()
	month := timestamp.Month()
	day := timestamp.Day()

	loc, err := time.LoadLocation("UTC")

	if err != nil {
		return "", err
	}

	if day >= 24 {
		day = 1

		if month == time.December {
			month = time.January
		} else {
			month += 1
		}

	}

	dayBucket := 5

	if day >= 4 {
		dayBucket = 10
	}

	if day >= 9 {
		dayBucket = 15
	}

	if day >= 14 {
		dayBucket = 20
	}

	if day >= 19 {
		dayBucket = 25
	}

	newTimestamp := time.Date(year, month, dayBucket, 0, 0, 0, 0, loc)

	signedURL, err := c.signer.Sign(url, newTimestamp)

	if err != nil {
		return "", errors.Wrap(err, "could not generate video thumbnail signed url")
	}

	return signedURL, nil
}

func (c *Serializer) unmarshalResourceFromDatabaseWithSignedUrls(i serializedResource) (*Resource, error) {

	s3Client := s3.New(c.aws)

	bucket := os.Getenv("UPLOADS_BUCKET")

	if i.Processed {
		bucket = os.Getenv("RESOURCES_BUCKET")
	}

	if i.Processed && i.IsPrivate {
		bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
	}

	var urls []*Url

	for _, mime := range i.MimeTypes {

		key := "/" + i.ResourceId

		extension := ""

		format, err := ExtensionByType(mime)

		if err == nil && i.Processed {
			extension = format
		}

		if i.Processed {
			key = "/" + i.ItemId + "/" + i.ProcessedId + extension
		}

		var url string

		if i.IsPrivate && i.Processed {

			signedURL, err := c.createSignedUrl(os.Getenv("PRIVATE_RESOURCES_URL") + key)

			if err != nil {
				return nil, errors.Wrap(err, "could not generate signed url")
			}

			url = signedURL

		} else if !i.IsPrivate && !i.Processed {

			req, _ := s3Client.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String(bucket),
				Key:    aws.String(key),
			})

			urlStr, err := req.Presign(15 * time.Minute)

			if err != nil {
				return nil, errors.Wrap(err, "could not generate signed url")
			}

			url = urlStr
		} else if !i.IsPrivate && i.Processed {

			domain := os.Getenv("UPLOADS_URL")

			if i.Processed {
				domain = os.Getenv("RESOURCES_URL")
			}

			url = domain + key
		}

		urls = append(urls, unmarshalUrlFromDatabase(
			url,
			mime,
		))
	}

	var videoThumbnail *Url

	if i.VideoThumbnail != "" {

		format, _ := ExtensionByType(i.VideoThumbnailMimeType)

		if i.IsPrivate {

			signedURL, err := c.createSignedUrl(os.Getenv("PRIVATE_RESOURCES_URL") + "/" + i.ItemId + "/" + i.VideoThumbnail + format)

			if err != nil {
				return nil, errors.Wrap(err, "could not generate video thumbnail signed url")
			}

			videoThumbnail = unmarshalUrlFromDatabase(
				signedURL,
				i.VideoThumbnailMimeType,
			)
		} else {
			videoThumbnail = unmarshalUrlFromDatabase(
				os.Getenv("RESOURCES_URL")+"/"+i.ItemId+"/"+i.VideoThumbnail+format,
				i.VideoThumbnailMimeType,
			)
		}

	}

	return unmarshalResourceFromDatabase(
		i.ItemId,
		i.ResourceId,
		i.Type,
		i.IsPrivate,
		i.MimeTypes,
		i.Processed,
		i.ProcessedId,
		i.VideoDuration,
		i.VideoThumbnail,
		i.VideoThumbnailMimeType,
		i.Width,
		i.Height,
		urls,
		videoThumbnail,
		i.Preview,
		i.Failed,
		i.VideoNoAudio,
	), nil
}

func unmarshalLegacyResourceFromDatabase(ctx context.Context, resource string) (*Media, error) {

	var re serializedResource

	if err := json.Unmarshal([]byte(resource), &re); err != nil {
		return nil, err
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
		values, err := strconv.ParseUint(re.Preview, 16, 32)

		if err != nil {
			return nil, err
		}

		imageData = &proto.ImageData{
			Id:       re.ProcessedId + ".jpg",
			MimeType: proto.MediaMimeType_ImageJpeg,
			Width:    int64(re.Width),
			Height:   int64(re.Height),
			Palettes: []*proto.ColorPalette{{
				Percent: 100,
				Red:     int32(uint8(values >> 16)),
				Green:   int32(uint8((values >> 8) & 0xFF)),
				Blue:    int32(uint8(values & 0xFF)),
			}},
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

func MarshalMediaToDatabase(media *Media) (*string, error) {

	marshalled, err := proto2.Marshal(media.proto)

	if err != nil {
		return nil, err
	}

	str := string(marshalled)

	return &str, nil
}

func UnmarshalMediaFromDatabase(ctx context.Context, media *string) (*Media, error) {

	var res *proto.Media

	if err := proto2.Unmarshal([]byte(*media), res); err != nil {
		return nil, err
	}

	return FromProto(res), nil
}

func UnmarshalMediaWithLegacyResourceFromDatabase(ctx context.Context, resource string, media *string) (*Media, error) {

	if media == nil {
		return unmarshalLegacyResourceFromDatabase(ctx, resource)
	}

	return UnmarshalMediaFromDatabase(ctx, media)
}
