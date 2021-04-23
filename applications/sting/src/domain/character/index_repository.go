package character

import (
	"context"
)

type IndexRepository interface {
	BulkIndexCharacter(context.Context, []*Character) error
	DeleteIndexCharacter(context.Context) error

	BulkIndexMedia(context.Context, []*Media) error
	DeleteIndexMedia(context.Context) error
}
