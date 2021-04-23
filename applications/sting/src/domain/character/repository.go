package character

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCharacterById(context.Context, ksuid.UUID) (*Character, error)
	CreateCharacter(context.Context, *Character) error
	CreateCharacters(context.Context, []*Character) error

	GetMediaById(context.Context, ksuid.UUID) (*Media, error)
	CreateMedia(context.Context, *Media) error
	CreateMedias(context.Context, []*Media) error
}
