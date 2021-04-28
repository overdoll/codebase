package search

import (
	"context"
	"encoding/json"
)

type Repository interface {
	SearchMedias(context.Context, string) ([]json.RawMessage, error)
	SearchCategories(context.Context, string) ([]json.RawMessage, error)
	SearchCharacters(context.Context, string) ([]json.RawMessage, error)
	SearchArtists(context.Context, string) ([]json.RawMessage, error)
}
