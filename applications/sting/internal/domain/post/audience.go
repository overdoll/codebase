package post

import (
	"errors"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrAudienceNotFound = errors.New("club not found")
)

type Audience struct {
	*paging.Node

	id                  string
	slug                string
	title               *localization.Translation
	thumbnailResourceId string

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

func (m *Audience) ThumbnailResourceId() string {
	return m.thumbnailResourceId
}

// a "standard" audience is an audience that the majority will consume
func (m *Audience) IsStandard() bool {
	return m.standard
}

func UnmarshalAudienceFromDatabase(id, slug string, title map[string]string, thumbnail string, standard int) *Audience {
	return &Audience{
		id:                  id,
		slug:                slug,
		title:               localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResourceId: thumbnail,
		standard:            standard == 1,
	}
}
