package character

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCharactersById(ctx context.Context, chars []ksuid.UUID) ([]*Character, error)
	GetCharacters(context.Context) ([]*Character, error)
	CreateMedias(ctx context.Context, medias []*Media) error

	GetMediasById(ctx context.Context, chars []ksuid.UUID) ([]*Media, error)
	GetMedias(ctx context.Context) ([]*Media, error)
	CreateCharacters(ctx context.Context, characters []*Character) error
}
