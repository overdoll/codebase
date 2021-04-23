package character

import (
	"os"

	"overdoll/libraries/ksuid"
)

type Media struct {
	id        ksuid.UUID
	title     string
	thumbnail string
}

func (m *Media) Thumbnail() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/thumbnails/" + m.thumbnail
}
