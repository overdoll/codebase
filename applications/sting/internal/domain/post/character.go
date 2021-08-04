package post

import (
	"errors"
	"os"

	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
)

var (
	ErrCharacterNotFound = errors.New("character not found")
)

type Character struct {
	*paging.Node

	id        string
	slug      string
	name      string
	thumbnail string
	series    *Series
}

func (c *Character) ID() string {
	return c.id
}

func (c *Character) Slug() string {
	return c.slug
}

func (c *Character) Name() string {
	return c.name
}

func (c *Character) Series() *Series {
	return c.series
}

func (c *Character) Thumbnail() string {
	return c.thumbnail
}

func (c *Character) ConvertThumbnailToURI() graphql.URI {
	var staticURL = os.Getenv("STATIC_URL")
	return graphql.NewURI(staticURL + "/thumbnails/" + c.thumbnail)
}

func UnmarshalCharacterFromDatabase(id, slug, name, thumbnail string, media *Series) *Character {
	return &Character{
		id:        id,
		slug:      slug,
		name:      name,
		thumbnail: thumbnail,
		series:    media,
	}
}
