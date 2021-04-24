package character

import (
	"context"
)

type IndexRepository interface {
	BulkIndexCharacters(context.Context, []*Character) error
	DeleteIndexCharacters(context.Context) error

	BulkIndexMedia(context.Context, []*Media) error
	DeleteIndexMedia(context.Context) error
}
