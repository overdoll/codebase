package post

import (
	"os"

	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/ksuid"
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

func NewCategory(title string) *Category {
	return &Category{
		id:        ksuid.New().String(),
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

func UnmarshalFromProtoArray(cats []*sting.Category) ([]*Category, error) {
	var categories []*Category

	for _, cat := range cats {
		categories = append(categories, &Category{
			id:        cat.Id,
			title:     cat.Title,
			thumbnail: cat.Thumbnail,
		})
	}

	return categories, nil
}
