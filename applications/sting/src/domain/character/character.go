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

func (c *Character) ID() ksuid.UUID {
	return c.id
}

func (c *Character) Name() string {
	return c.name
}

func (c *Character) Media() Media {
	return c.media
}

func (c *Character) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}

func NewCharacter(id ksuid.UUID, name string, thumbnail string, mediaId ksuid.UUID, mediaTitle string, mediaThumbnail string, ) *Character {
	return &Character{
		id:        id,
		name:      name,
		thumbnail: thumbnail,
		media: Media{
			id:        mediaId,
			title:     mediaTitle,
			thumbnail: mediaThumbnail,
		},
	}
}
