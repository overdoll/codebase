package post

import (
	"os"

	sting "overdoll/applications/sting/proto"
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

func (m *Media) RawThumbnail() string {
	return m.thumbnail
}

func (m *Media) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + m.thumbnail
}

func NewMedia(id ksuid.UUID, title string, thumbnail string) *Media {
	return &Media{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}

func UnmarshalMediaFromProtoArray(medi []*sting.Media) ([]*Media, error) {
	var media []*Media

	for _, med := range medi {
		id, err := ksuid.Parse(med.Id)

		if err != nil {
			return nil, err
		}

		media = append(media, NewMedia(id, med.Title, med.Thumbnail))
	}

	return media, nil
}
