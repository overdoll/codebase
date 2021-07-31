package post

import (
	"errors"
	"os"

	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
)

var (
	ErrMediaNotFound = errors.New("media not found")
)

type Media struct {
	*paging.Node

	id        string
	title     string
	thumbnail string
}

func (m *Media) ID() string {
	return m.id
}

func (m *Media) Title() string {
	return m.title
}

func (m *Media) Thumbnail() string {
	return m.thumbnail
}

func (m *Media) ConvertThumbnailToURI() graphql.URI {
	var staticURL = os.Getenv("STATIC_URL")
	return graphql.NewURI(staticURL + "/thumbnails/" + m.thumbnail)
}

func NewMedia(id, title string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: "",
	}
}

func UnmarshalMediaFromDatabase(id, title, thumbnail string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}
