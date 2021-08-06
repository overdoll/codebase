package post

import (
	"errors"

	"overdoll/applications/sting/internal/domain/resource"
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
	thumbnail *resource.Resource
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

func (m *Brand) Thumbnail() *resource.Resource {
	return m.thumbnail
}

func UnmarshalBrandFromDatabase(id, slug, name string, thumbnail string) *Brand {
	return &Brand{
		id:        id,
		slug:      slug,
		name:      name,
		thumbnail: resource.UnmarshalResourceFromDatabase(thumbnail),
	}
}
