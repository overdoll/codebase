package category

import (
	"os"

	sting "overdoll/applications/sting/proto"
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

func (c *Category) RawThumbnail() string {
	return c.thumbnail
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

func UnmarshalFromProtoArray(cats []*sting.Category) ([]*Category, error) {
	var categories []*Category

	for _, cat := range cats {
		id, err := ksuid.Parse(cat.Id)

		if err != nil {
			return nil, err
		}

		categories = append(categories, NewCategory(id, cat.Title, cat.Thumbnail))
	}

	return categories, nil
}
