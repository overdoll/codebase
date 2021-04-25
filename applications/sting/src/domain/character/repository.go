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

type IndexRepository interface {
	BulkIndexCharacters(context.Context, []*Character) error
	DeleteIndexCharacters(context.Context) error

	BulkIndexMedia(context.Context, []*Media) error
	DeleteIndexMedia(context.Context) error
}

type EventRepository interface {
	CharactersCreated(context.Context, []*Character) error
	MediaCreated(context.Context, []*Media) error
}
