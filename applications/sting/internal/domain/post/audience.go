package post

import (
	"errors"
	"os"

	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
)

var (
	ErrAudienceNotFound = errors.New("brand not found")
)

type Audience struct {
	*paging.Node

	id        string
	slug      string
	title     string
	thumbnail string

	standard bool
}

func (m *Audience) ID() string {
	return m.id
}

func (m *Audience) Slug() string {
	return m.slug
}

func (m *Audience) Title() string {
	return m.title
}

func (m *Audience) Thumbnail() string {
	return m.thumbnail
}

// a "standard" audience is an audience that the majority will consume
func (m *Audience) IsStandard() bool {
	return m.standard
}

func (m *Audience) ConvertThumbnailToURI() graphql.URI {
	var staticURL = os.Getenv("STATIC_URL")
	return graphql.NewURI(staticURL + "/thumbnails/" + m.thumbnail)
}

func UnmarshalAudienceFromDatabase(id, slug, title, thumbnail string, standard int) *Audience {
	return &Audience{
		id:        id,
		slug:      slug,
		title:     title,
		thumbnail: thumbnail,
		standard:  standard == 1,
	}
}
