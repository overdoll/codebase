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

func (c *Category) Category() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}
