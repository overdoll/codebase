package post

import (
	"os"

	sting "overdoll/applications/sting/proto"
)

type Character struct {
	id        string
	name      string
	thumbnail string
	media     Media
}

func (c *Character) ID() string {
	return c.id
}

func (c *Character) Name() string {
	return c.name
}

func (c *Character) Media() Media {
	return c.media
}

func (c *Character) RawThumbnail() string {
	return c.thumbnail
}

func (c *Character) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}

func NewCharacter(id string, name string, thumbnail string, mediaId string, mediaTitle string, mediaThumbnail string, ) *Character {
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

func UnmarshalCharacterFromProtoArray(chars []*sting.Character) ([]*Character, error) {
	var characters []*Character

	for _, char := range chars {
		characters = append(characters, NewCharacter(char.Id, char.Name, char.Thumbnail, char.Media.Id, char.Media.Title, char.Media.Thumbnail))
	}

	return characters, nil
}
