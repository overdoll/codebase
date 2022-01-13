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
	totalPosts          int
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

func (c *Category) TotalPosts() int {
	return c.totalPosts
}

func (c *Category) UpdateTotalPosts(totalPosts int) error {
	c.totalPosts = totalPosts
	return nil
}

func (c *Category) UpdateTotalLikes(totalLikes int) error {
	c.totalLikes = totalLikes
	return nil
}

func UnmarshalCategoryFromDatabase(id, slug string, title map[string]string, thumbnail string, totalLikes, totalPosts int) *Category {
	return &Category{
		id:                  id,
		slug:                slug,
		title:               localization.UnmarshalTranslationFromDatabase(title),
		thumbnailResourceId: thumbnail,
		totalLikes:          totalLikes,
		totalPosts:          totalPosts,
	}
}
