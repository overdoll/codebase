package graphql

import (
	"context"
	"fmt"
	"io"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/media"
	"strconv"
)

type ResourceProgress struct {
	// An ID uniquely identifying this resource progress.
	ID relay.ID `json:"id"`
}

func (ResourceProgress) IsEntity() {}

// A resource represents an image or a video format that contains an ID to uniquely identify it,
// and urls to access the resources. We have many urls in order to provide a fallback for older browsers
//
// We also identify the type of resource (image or video) to make it easy to distinguish them
type Resource struct {
	// An ID uniquely identifying this resource.
	ID relay.ID `json:"id"`
	// The type of resource - either an image or a video.
	Type ResourceType `json:"type"`
	// Whether or not the resource is processed. Can be used for additional permission checks.
	Processed bool `json:"processed"`
	// URLs to access the resource.
	Urls []*ResourceURL `json:"urls"`
	// The width.
	Width int `json:"width"`
	// The height.
	Height int `json:"height"`
	// Duration, if video.
	VideoDuration int `json:"videoDuration"`
	// Video thumbnail, if video.
	VideoThumbnail *ResourceURL `json:"videoThumbnail"`
	// The additional 10x10 base64-encoded image that can be used as a preview.
	Preview string `json:"preview"`
	//  Whether or not this resource failed to process.
	//
	//  A failure can happen if:
	//  - The supplied image is an unsupported format. This can happen if for example, someone submits a JPEG (unsupported) that was renamed to a PNG (supported)
	//  - The supplied image is corrupted.
	//  - The supplied video is invalid or corrupted.
	Failed bool `json:"failed"`

	// Whether or not the video has audio.
	VideoNoAudio bool `json:"videoNoAudio"`

	Progress *ResourceProgress `json:"progress"`
}

// A type representing a url to the resource and the mimetype
type ResourceURL struct {
	URL      URI    `json:"url"`
	MimeType string `json:"mimeType"`
}

// Identifies the type of resource
type ResourceType string

const (
	ResourceTypeImage ResourceType = "IMAGE"
	ResourceTypeVideo ResourceType = "VIDEO"
)

var AllResourceType = []ResourceType{
	ResourceTypeImage,
	ResourceTypeVideo,
}

func (e ResourceType) IsValid() bool {
	switch e {
	case ResourceTypeImage, ResourceTypeVideo:
		return true
	}
	return false
}

func (e ResourceType) String() string {
	return string(e)
}

func (e *ResourceType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ResourceType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ResourceType", str)
	}
	return nil
}

func (e ResourceType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

func MarshaMediaToLegacyResourceGraphQL(ctx context.Context, res *media.Media) *Resource {
	return nil
}
