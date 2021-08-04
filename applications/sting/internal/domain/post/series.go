package post

import (
	"errors"
	"os"

	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
)

var (
	ErrSeriesNotFound = errors.New("series not found")
)

type Series struct {
	*paging.Node

	id        string
	slug      string
	title     string
	thumbnail string
}

func (m *Series) ID() string {
	return m.id
}

func (m *Series) Slug() string {
	return m.slug
}

func (m *Series) Title() string {
	return m.title
}

func (m *Series) Thumbnail() string {
	return m.thumbnail
}

func (m *Series) ConvertThumbnailToURI() graphql.URI {
	var staticURL = os.Getenv("STATIC_URL")
	return graphql.NewURI(staticURL + "/thumbnails/" + m.thumbnail)
}

func UnmarshalMediaFromDatabase(id, slug, title, thumbnail string) *Series {
	return &Series{
		id:        id,
		slug:      slug,
		title:     title,
		thumbnail: thumbnail,
	}
}
