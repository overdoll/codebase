package resource

import (
	_ "image/png"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/resource/proto"
)

var (
	ErrResourceNotPresent = domainerror.NewValidation("resource is not present")
)

// Resource represents a media resource that can either be an image or a video
// it will contain an ID to identify the resource, as well as the available mimeTypes for the specific resource
// it is most often useful for static content such as posts or thumbnails for tags, where we need image & video fallbacks as
// well as a universal way to get links
type Resource struct {
	itemId string
	id     string

	processed   bool
	processedId string

	token string

	urls              []*Url
	videoThumbnailUrl *Url

	isPrivate bool

	videoThumbnail         string
	videoThumbnailMimeType string

	width  int
	height int

	videoDuration int

	mimeTypes    []string
	resourceType Type

	preview string
}

func (r *Resource) ID() string {
	return r.id
}

func (r *Resource) ItemId() string {
	return r.itemId
}

func (r *Resource) IsPrivate() bool {
	return r.isPrivate
}

func (r *Resource) MimeTypes() []string {
	return r.mimeTypes
}

func (r *Resource) LastMimeType() string {
	return r.mimeTypes[len(r.mimeTypes)-1]
}

func (r *Resource) MakeImage() error {
	r.resourceType = Image
	return nil
}

func (r *Resource) MakeVideo() error {
	r.resourceType = Video
	return nil
}

func (r *Resource) IsProcessed() bool {
	return r.processed
}

func (r *Resource) ProcessedId() string {
	return r.processedId
}

func (r *Resource) Width() int {
	return r.width
}

func (r *Resource) Height() int {
	return r.height
}

func (r *Resource) VideoDuration() int {
	return r.videoDuration
}

func (r *Resource) Preview() string {
	return r.preview
}

func (r *Resource) Token() string {
	return r.token
}

func (r *Resource) IsImage() bool {
	return r.resourceType == Image
}

func (r *Resource) IsVideo() bool {
	return r.resourceType == Video
}

func (r *Resource) VideoThumbnailMimeType() string {
	return r.videoThumbnailMimeType
}

func (r *Resource) VideoThumbnail() string {
	return r.videoThumbnail
}

func (r *Resource) VideoThumbnailFullUrl() *Url {
	return r.videoThumbnailUrl
}

func (r *Resource) FullUrls() []*Url {
	return r.urls
}

func UnmarshalResourceFromProto(resource *proto.Resource) *Resource {

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

func UnmarshalResourcesFromProto(resource []*proto.Resource) []*Resource {

	var resources []*Resource

	for _, item := range resource {
		resources = append(resources, UnmarshalResourceFromProto(item))
	}

	return resources
}
