package post

import (
	"os"

	"overdoll/libraries/graphql/relay"
)

type Character struct {
	*relay.Node

	id        string
	name      string
	thumbnail string
	media     *Media
}

func (c *Character) ID() string {
	return c.id
}

func (c *Character) Name() string {
	return c.name
}

func (c *Character) Media() *Media {
	return c.media
}

func (c *Character) RawThumbnail() string {
	return c.thumbnail
}

func (c *Character) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}

func NewCharacter(id, name string, media *Media) *Character {
	return &Character{
		id:        id,
		name:      name,
		thumbnail: "",
		media:     media,
	}
}

func UnmarshalCharacterFromDatabase(id, name, thumbnail string, media *Media) *Character {
	return &Character{
		id:        id,
		name:      name,
		thumbnail: thumbnail,
		media:     media,
	}
}
