package post

import (
	"errors"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrCategoryNotFound = errors.New("category not found")
)

type Category struct {
	*paging.Node

	id                  string
	slug                string
	title               *localization.Translation
	thumbnailResourceId string
	totalLikes          int
}

func (c *Category) ID() string {
	return c.id
}

func (c *Category) Slug() string {
	return c.slug
}

func (c *Category) Title() *localization.Translation {
	return c.title
}

func (c *Category) ThumbnailResourceId() string {
	return c.thumbnailResourceId
}

func (c *Category) TotalLikes() int {
	return c.totalLikes
}

func (c *Category) IncrementTotalLikes() error {
	c.totalLikes += 1
	return nil
}

func (c *Category) DecrementTotalLikes() error {
	c.totalLikes -= 1
	return nil
}

func UnmarshalCategoryFromDatabase(id, slug string, title map[string]string, thumbnail string, totalLikes int) *Category {
	return &Category{
		id:                  id,
		slug:                slug,
		title:               localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResourceId: thumbnail,
		totalLikes:          totalLikes,
	}
}
