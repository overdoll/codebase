package post

import (
	"os"
)

type Media struct {
	id        string
	title     string
	thumbnail string
}

func (m *Media) ID() string {
	return m.id
}

func (m *Media) Title() string {
	return m.title
}

func (m *Media) RawThumbnail() string {
	return m.thumbnail
}

func (m *Media) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + m.thumbnail
}

func NewMedia(id, title string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: "",
	}
}

func UnmarshalMediaFromDatabase(id, title, thumbnail string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}
