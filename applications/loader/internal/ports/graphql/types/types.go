// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"strconv"
)

// A resource represents an image or a video format that contains an ID to uniquely identify it,
// and urls to access the resources. We have many urls in order to provide a fallback for older browsers
//
// We also identify the type of resource (image or video) to make it easy to distinguish them
type Resource struct {
	ID   relay.ID       `json:"id"`
	Type ResourceType   `json:"type"`
	Urls []*ResourceURL `json:"urls"`
}

func (Resource) IsNode()   {}
func (Resource) IsEntity() {}

// A type representing a url to the resource and the mimetype
type ResourceURL struct {
	URL      graphql1.URI `json:"url"`
	MimeType string       `json:"mimeType"`
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
