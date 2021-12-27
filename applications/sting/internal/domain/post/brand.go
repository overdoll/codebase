package post

import (
	"errors"

	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrBrandNotFound = errors.New("brand not found")
)

type Brand struct {
	*paging.Node

	id        string
	slug      string
	name      *localization.Translation
	thumbnail *resource.Resource
}

func (m *Brand) ID() string {
	return m.id
}

func (m *Brand) Slug() string {
	return m.slug
}

func (m *Brand) Name() *localization.Translation {
	return m.name
}

func (m *Brand) Thumbnail() *resource.Resource {
	return m.thumbnail
}

func UnmarshalBrandFromDatabase(id, slug string, name map[string]string, thumbnail string) *Brand {
	return &Brand{
		id:        id,
		slug:      slug,
		name:      localization.UnmarshalTranslationFromDatabase(name),
		thumbnail: resource.UnmarshalResourceFromDatabase(thumbnail),
	}
}
