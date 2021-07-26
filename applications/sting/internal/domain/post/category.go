package post

import (
	"os"

	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
)

type Category struct {
	*paging.Node

	id        string
	title     string
	thumbnail string
}

func (c *Category) ID() string {
	return c.id
}

func (c *Category) Title() string {
	return c.title
}

func (c *Category) Thumbnail() string {
	return c.thumbnail
}

func (c *Category) ConvertThumbnailToURI() graphql.URI {
	var staticURL = os.Getenv("STATIC_URL")
	return graphql.NewURI(staticURL + "/thumbnails/" + c.thumbnail)
}

func NewCategory(id, title string) *Category {
	return &Category{
		id:        id,
		title:     title,
		thumbnail: "",
	}
}

func UnmarshalCategoryFromDatabase(id, title, thumbnail string) *Category {
	return &Category{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}
