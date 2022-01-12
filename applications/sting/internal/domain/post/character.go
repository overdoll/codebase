package post

import (
	"errors"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrCharacterNotFound = errors.New("character not found")
)

type Character struct {
	*paging.Node

	id                  string
	slug                string
	name                *localization.Translation
	thumbnailResourceId string
	series              *Series

	totalLikes int
	totalPosts int
}

func (c *Character) ID() string {
	return c.id
}

func (c *Character) Slug() string {
	return c.slug
}

func (c *Character) Name() *localization.Translation {
	return c.name
}

func (c *Character) Series() *Series {
	return c.series
}

func (c *Character) ThumbnailResourceId() string {
	return c.thumbnailResourceId
}

func (c *Character) TotalLikes() int {
	return c.totalLikes
}

func (c *Character) TotalPosts() int {
	return c.totalPosts
}

func (c *Character) UpdateTotalPosts(totalPosts int) error {
	c.totalPosts = totalPosts
	return nil
}

func (c *Character) UpdateTotalLikes(totalLikes int) error {
	c.totalLikes = totalLikes
	return nil
}

func UnmarshalCharacterFromDatabase(id, slug string, name map[string]string, thumbnail string, totalLikes, totalPosts int, media *Series) *Character {
	return &Character{
		id:                  id,
		slug:                slug,
		name:                localization.UnmarshalTranslationFromDatabase(name),
		thumbnailResourceId: thumbnail,
		series:              media,
		totalLikes:          totalLikes,
		totalPosts:          totalPosts,
	}
}
