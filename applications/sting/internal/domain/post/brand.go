package post

import (
	"errors"
	"os"

	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
)

var (
	ErrBrandNotFound = errors.New("brand not found")
)

type Brand struct {
	*paging.Node

	id        string
	slug      string
	name      string
	thumbnail string
}

func (m *Brand) ID() string {
	return m.id
}

func (m *Brand) Slug() string {
	return m.slug
}

func (m *Brand) Name() string {
	return m.name
}

func (m *Brand) Thumbnail() string {
	return m.thumbnail
}

func (m *Brand) ConvertThumbnailToURI() graphql.URI {
	var staticURL = os.Getenv("STATIC_URL")
	return graphql.NewURI(staticURL + "/thumbnails/" + m.thumbnail)
}

func UnmarshalBrandFromDatabase(id, slug, name, thumbnail string) *Brand {
	return &Brand{
		id:        id,
		slug:      slug,
		name:      name,
		thumbnail: thumbnail,
	}
}
