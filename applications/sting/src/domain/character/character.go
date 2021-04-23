package character

import (
	"os"

	"overdoll/libraries/ksuid"
)

type Character struct {
	id        ksuid.UUID
	name      string
	thumbnail string
	media     Media
}

func (c *Character) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + c.thumbnail
}
