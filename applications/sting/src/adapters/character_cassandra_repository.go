package adapters

import (
	"overdoll/libraries/ksuid"
)

type Character struct {
	Id        ksuid.UUID `db:"id"`
	Name      string     `db:"name"`
	Thumbnail string     `db:"thumbnail"`
	MediaId   ksuid.UUID `db:"media_id"`
}

type Media struct {
	Id        ksuid.UUID `db:"id"`
	Title     string     `db:"title"`
	Thumbnail string     `db:"thumbnail"`
}
