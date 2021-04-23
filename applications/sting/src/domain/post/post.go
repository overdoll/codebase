package post

import (
	"time"

	"overdoll/libraries/ksuid"
)

type Post struct {
	id ksuid.UUID
	artistId ksuid.UUID
	contributorId ksuid.UUID
	content []string
	categories []ksuid.UUID
	characters []ksuid.UUID
	postedAt time.Time
}

