package post

import (
	"errors"

	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/paging"
	"overdoll/libraries/translations"
)

var (
	ErrCharacterNotFound = errors.New("character not found")
)

type Character struct {
	*paging.Node

	id        string
	slug      string
	name      *translations.Translation
	thumbnail *resource.Resource
	series    *Series
}

func (c *Character) ID() string {
	return c.id
}

func (c *Character) Slug() string {
	return c.slug
}

func (c *Character) Name() *translations.Translation {
	return c.name
}

func (c *Character) Series() *Series {
	return c.series
}

func (c *Character) Thumbnail() *resource.Resource {
	return c.thumbnail
}

func UnmarshalCharacterFromDatabase(id, slug string, name map[string]string, thumbnail string, media *Series) *Character {
	return &Character{
		id:        id,
		slug:      slug,
		name:      translations.UnmarshalTranslationFromDatabase(name),
		thumbnail: resource.UnmarshalResourceFromDatabase(thumbnail),
		series:    media,
	}
}
