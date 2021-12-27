package post

import (
	"errors"

	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrAudienceNotFound = errors.New("brand not found")
)

type Audience struct {
	*paging.Node

	id        string
	slug      string
	title     *localization.Translation
	thumbnail *resource.Resource

	standard bool
}

func (m *Audience) ID() string {
	return m.id
}

func (m *Audience) Slug() string {
	return m.slug
}

func (m *Audience) Title() *localization.Translation {
	return m.title
}

func (m *Audience) Thumbnail() *resource.Resource {
	return m.thumbnail
}

// a "standard" audience is an audience that the majority will consume
func (m *Audience) IsStandard() bool {
	return m.standard
}

func UnmarshalAudienceFromDatabase(id, slug string, title map[string]string, thumbnail string, standard int) *Audience {
	return &Audience{
		id:        id,
		slug:      slug,
		title:     localization.UnmarshalTranslationFromDatabase(title),
		thumbnail: resource.UnmarshalResourceFromDatabase(thumbnail),
		standard:  standard == 1,
	}
}
