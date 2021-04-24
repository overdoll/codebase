package character

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

func MarshalMediaToProtoArray(medi []*Media) []*sting.Media {
	var media []*sting.Media

	for _, med := range medi {
		media = append(media, &sting.Media{Id: med.ID().String(), Title: med.Title(), Thumbnail: med.thumbnail})
	}

	return media
}
