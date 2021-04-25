package character

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCharactersById(context.Context, []ksuid.UUID) ([]*Character, error)
	GetCharacters(context.Context) ([]*Character, error)
	CreateCharacters(context.Context, []*Character) error

	CreateMedias(context.Context, []*Media) error
	GetMediasById(context.Context, []ksuid.UUID) ([]*Media, error)
	GetMedias(context.Context) ([]*Media, error)
}
