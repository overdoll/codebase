package post

import (
	"errors"

	"overdoll/applications/sting/internal/domain/resource"
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
	thumbnail *resource.Resource
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

func (m *Series) Thumbnail() *resource.Resource {
	return m.thumbnail
}

func UnmarshalSeriesFromDatabase(id, slug, title string, thumbnail string) *Series {
	return &Series{
		id:        id,
		slug:      slug,
		title:     title,
		thumbnail: resource.UnmarshalResourceFromDatabase(thumbnail),
	}
}
