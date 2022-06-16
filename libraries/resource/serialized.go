package resource

import (
	"context"
	"encoding/json"
	"github.com/99designs/gqlgen/graphql"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/aws/aws-sdk-go/service/s3"
	"go.uber.org/zap"
	"os"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/errors"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/support"
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
	Width                  int      `json:"width"`
	Height                 int      `json:"height"`
	Preview                string   `json:"preview"`
}

type Serializer struct {
	aws             *session.Session
	resourcesSigner *sign.URLSigner
}

func NewSerializer() *Serializer {

	awsSession := bootstrap.InitializeAWSSession()

	resourcesRsa, err := support.ParseRsaPrivateKeyFromPemEnvFile(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_PAIR_PRIVATE_KEY"))

	if err != nil {
		zap.S().Fatalw("failed to parse RSA private key", zap.Error(err))
	}

	resourcesSigner := sign.NewURLSigner(os.Getenv("AWS_PRIVATE_RESOURCES_KEY_PAIR_ID"), resourcesRsa)

	return &Serializer{
		aws:             awsSession,
		resourcesSigner: resourcesSigner,
	}
}

func unmarshalResourceFromDatabase(itemId, resourceId string, tp int, isPrivate bool, mimeTypes []string, processed bool, processedId string, videoDuration int, videoThumbnail, videoThumbnailMimeType string, width, height int, urls []*Url, videoThumbnailUrl *Url, preview string) *Resource {
	typ, _ := TypeFromInt(tp)
	return &Resource{
		id:                     resourceId,
		itemId:                 itemId,
		videoDuration:          videoDuration,
		isPrivate:              isPrivate,
		videoThumbnail:         videoThumbnail,
		videoThumbnailMimeType: videoThumbnailMimeType,
		width:                  width,
		height:                 height,
		processedId:            processedId,
		mimeTypes:              mimeTypes,
		resourceType:           typ,
		processed:              processed,
		urls:                   urls,
		videoThumbnailUrl:      videoThumbnailUrl,
		preview:                preview,
	}
}

func MarshalResourceToDatabase(resources *Resource) (string, error) {

	if resources == nil {
		return "", nil
	}

	data, err := json.Marshal(&serializedResource{
		ItemId:                 resources.itemId,
		ResourceId:             resources.id,
		Type:                   resources.resourceType.Int(),
		MimeTypes:              resources.MimeTypes(),
		Processed:              resources.processed,
		ProcessedId:            resources.processedId,
		IsPrivate:              resources.isPrivate,
		VideoDuration:          resources.videoDuration,
		VideoThumbnail:         resources.videoThumbnail,
		VideoThumbnailMimeType: resources.videoThumbnailMimeType,
		Width:                  resources.width,
		Height:                 resources.height,
		Preview:                resources.preview,
	})

	if err != nil {
		return "", err
	}

	return string(data), nil
}

func (c Serializer) unmarshalResources(ctx context.Context, resourcesList []string) ([]*Resource, error) {

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

func UnmarshalResourcesFromProto(ctx context.Context, resource []*proto.Resource) ([]*Resource, error) {

	var resources []*Resource

	for _, item := range resource {
		resources = append(resources, UnmarshalResourceFromProto(ctx, item))
	}

	return resources, nil
}

func UnmarshalResourceFromProto(ctx context.Context, resource *proto.Resource) *Resource {

	var tp Type

	if resource.Type == proto.ResourceType_IMAGE {
		tp = Image
	}

	if resource.Type == proto.ResourceType_VIDEO {
		tp = Video
	}

	return &Resource{
		itemId:                 resource.ItemId,
		id:                     resource.Id,
		processed:              resource.Processed,
		processedId:            resource.ProcessedId,
		urls:                   nil,
		videoThumbnailUrl:      nil,
		isPrivate:              resource.Private,
		videoThumbnail:         resource.VideoThumbnail,
		videoThumbnailMimeType: resource.VideoThumbnailMimeType,
		width:                  int(resource.Width),
		height:                 int(resource.Height),
		videoDuration:          int(resource.VideoDuration),
		mimeTypes:              resource.MimeTypes,
		resourceType:           tp,
		preview:                resource.Preview,
		token:                  resource.Token,
	}
}

func (c *Serializer) UnmarshalResourceFromProto(ctx context.Context, resource *proto.Resource) (*Resource, error) {
	result, err := c.UnmarshalResourcesFromProto(ctx, []*proto.Resource{resource})

	if err != nil {
		return nil, err
	}

	return result[0], nil
}

func (c *Serializer) UnmarshalResourcesFromProto(ctx context.Context, resource []*proto.Resource) ([]*Resource, error) {

	var resources []string

	for _, item := range resource {

		var tp int

		if item.Type == proto.ResourceType_IMAGE {
			tp = 1
		}

		if item.Type == proto.ResourceType_VIDEO {
			tp = 2
		}

		data, err := json.Marshal(&serializedResource{
			ItemId:                 item.ItemId,
			ResourceId:             item.Id,
			Type:                   tp,
			MimeTypes:              item.MimeTypes,
			Processed:              item.Processed,
			ProcessedId:            item.ProcessedId,
			IsPrivate:              item.Private,
			VideoDuration:          int(item.VideoDuration),
			VideoThumbnail:         item.VideoThumbnail,
			VideoThumbnailMimeType: item.VideoThumbnailMimeType,
			Width:                  int(item.Width),
			Height:                 int(item.Height),
			Preview:                item.Preview,
		})

		if err != nil {
			return nil, err
		}

		resources = append(resources, string(data))
	}

	return c.UnmarshalResourcesFromDatabase(ctx, resources)
}

func (c *Serializer) UnmarshalResourceFromDatabase(ctx context.Context, serializedResources string) (*Resource, error) {

	if serializedResources == "" {
		return nil, nil
	}

	if graphql.HasOperationContext(ctx) {

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
	), nil
}

func (c *Serializer) UnmarshalResourcesFromDatabase(ctx context.Context, serializedResources []string) ([]*Resource, error) {

	var targets []*Resource

	if graphql.HasOperationContext(ctx) {

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
			))
		}
	}

	return targets, nil
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

			signedURL, err := c.resourcesSigner.Sign(os.Getenv("PRIVATE_RESOURCES_URL")+key, time.Now().Add(60*time.Minute))

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

			signedURL, err := c.resourcesSigner.Sign(os.Getenv("PRIVATE_RESOURCES_URL")+"/"+i.ItemId+"/"+i.VideoThumbnail+format, time.Now().Add(60*time.Minute))

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
	), nil
}
