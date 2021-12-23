package post

import (
	"errors"

	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrCategoryNotFound = errors.New("category not found")
)

type Category struct {
	*paging.Node

	id        string
	slug      string
	title     *localization.Translation
	thumbnail *resource.Resource
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

func (c *Category) Thumbnail() *resource.Resource {
	return c.thumbnail
}

func UnmarshalCategoryFromDatabase(id, slug string, title map[string]string, thumbnail string) *Category {
	return &Category{
		id:        id,
		slug:      slug,
		title:     localization.UnmarshalTranslationFromDatabase(title),
		thumbnail: resource.UnmarshalResourceFromDatabase(thumbnail),
	}
}
