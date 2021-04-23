package character

import (
	"os"

	"overdoll/libraries/ksuid"
)

type Character struct {
	id        ksuid.UUID
	name      string
	thumbnail string
	media     Media
}

func (c *Character) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}

func UnmarshalCharacterFromDatabase(id ksuid.UUID, name string, thumbnail string, mediaId ksuid.UUID) *Character {
	return &Character{
		id:        id,
		name:      name,
		thumbnail: thumbnail,
		media: Media{
			id:        mediaId,
			title:     "",
			thumbnail: "",
		},
	}
}
