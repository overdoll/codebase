package post

import (
	"os"

	sting "overdoll/applications/sting/proto"
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

func NewMedia(id string, title string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: "",
	}
}

func UnmarshalMediaFromDatabase(id string, title string, thumbnail string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}

func UnmarshalMediaFromProtoArray(medi []*sting.Media) ([]*Media, error) {
	var media []*Media

	for _, med := range medi {
		media = append(media, &Media{
			id:        med.Id,
			title:     med.Title,
			thumbnail: med.Thumbnail,
		})
	}

	return media, nil
}
