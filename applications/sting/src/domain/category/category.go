package category

import (
	"os"

	"overdoll/libraries/ksuid"
)

type Category struct {
	id        ksuid.UUID
	title     string
	thumbnail string
}

func (c *Category) ID() ksuid.UUID {
	return c.id
}

func (c *Category) Title() string {
	return c.title
}

func (c *Category) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}

func NewCategory(id ksuid.UUID, title string, thumbnail string) *Category {
	return &Category{
		id:        id,
		title:     title,
		thumbnail: thumbnail,
	}
}
