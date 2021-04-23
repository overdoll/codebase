package character

import (
	"os"

	"overdoll/libraries/ksuid"
)

type Media struct {
	id        ksuid.UUID
	title     string
	thumbnail string
}

func (m *Media) ID() ksuid.UUID {
	return m.id
}

func (m *Media) Title() string {
	return m.title
}

func (m *Media) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + m.thumbnail
}

func UnmarshalMediaFromDatabase(id ksuid.UUID, title string, thumbnail string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}
