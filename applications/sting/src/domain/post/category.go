package post

import (
	"os"
)

type Category struct {
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

func (c *Category) RawThumbnail() string {
	return c.thumbnail
}

func (c *Category) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}

func NewCategory(id string, title string) *Category {
	return &Category{
		id:        id,
		title:     title,
		thumbnail: "",
	}
}

func UnmarshalCategoryFromDatabase(id string, title string, thumbnail string) *Category {
	return &Category{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}
