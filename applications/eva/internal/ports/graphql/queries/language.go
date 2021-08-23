package queries

import (
	"context"

	"overdoll/applications/eva/internal/ports/graphql/types"
)

func (r *QueryResolver) Languages(ctx context.Context) ([]*types.Language, error) {
	panic("implement me")
}

func (r *QueryResolver) Language(ctx context.Context) (*types.Language, error) {
	panic("implement me")
}
