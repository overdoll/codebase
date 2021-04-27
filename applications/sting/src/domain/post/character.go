package post

import (
	"os"

	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/ksuid"
)

type Character struct {
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

func NewCharacter(name string, media *Media) *Character {
	return &Character{
		id:        ksuid.New().String(),
		name:      name,
		thumbnail: "",
		media:     media,
	}
}

func UnmarshalCharacterFromProtoArray(chars []*sting.Character) ([]*Character, error) {
	var characters []*Character

	for _, char := range chars {
		characters = append(characters, &Character{
			id:        char.Id,
			name:      char.Name,
			thumbnail: char.Thumbnail,
			media: &Media{
				id:        char.Media.Id,
				title:     char.Media.Title,
				thumbnail: char.Media.Thumbnail,
			},
		})
	}

	return characters, nil
}
