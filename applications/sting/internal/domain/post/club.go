package post

import (
	"errors"

	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrClubNotFound = errors.New("club not found")
)

type Club struct {
	*paging.Node

	id        string
	slug      string
	name      *localization.Translation
	thumbnail *resource.Resource
}

func (m *Club) ID() string {
	return m.id
}

func (m *Club) Slug() string {
	return m.slug
}

func (m *Club) Name() *localization.Translation {
	return m.name
}

func (m *Club) Thumbnail() *resource.Resource {
	return m.thumbnail
}

func UnmarshalClubFromDatabase(id, slug string, name map[string]string, thumbnail string) *Club {
	return &Club{
		id:        id,
		slug:      slug,
		name:      localization.UnmarshalTranslationFromDatabase(name),
		thumbnail: resource.UnmarshalResourceFromDatabase(thumbnail),
	}
}
