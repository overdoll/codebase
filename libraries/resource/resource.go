package resource

import (
	_ "image/png"
	"overdoll/libraries/errors/domainerror"
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

	failed bool

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

func (r *Resource) Failed() bool {
	return r.failed
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

func (r *Resource) AsEmpty() *Resource {
	return &Resource{
		itemId:                 r.itemId,
		id:                     r.id,
		processed:              r.processed,
		processedId:            r.processedId,
		token:                  r.token,
		isPrivate:              r.isPrivate,
		width:                  r.width,
		height:                 r.height,
		mimeTypes:              r.mimeTypes,
		resourceType:           r.resourceType,
		preview:                r.preview,
		urls:                   nil,
		videoThumbnailUrl:      nil,
		videoThumbnail:         r.videoThumbnail,
		videoThumbnailMimeType: r.videoThumbnailMimeType,
		videoDuration:          r.videoDuration,
		failed:                 false,
	}
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
