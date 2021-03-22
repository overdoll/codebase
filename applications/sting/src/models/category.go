package models

import (
	"overdoll/libraries/ksuid"
)

type Category struct {
	Id        ksuid.UUID `db:"id"`
	Title     string     `db:"title"`
	Thumbnail Thumbnail  `db:"thumbnail"`
}