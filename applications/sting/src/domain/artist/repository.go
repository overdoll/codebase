package artist

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetArtistById(context.Context, ksuid.UUID) (*Artist, error)
	CreateArtist(context.Context, *Artist) error
	CreateArtists(context.Context, []*Artist) error
}
