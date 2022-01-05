package dataloader

import (
	"context"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"time"

	"overdoll/libraries/graphql"
)

type Loaders struct {
	ClubById ClubLoader
}

func NewLoader(app *app.Application) *Loaders {
	return &Loaders{
		ClubById: ClubLoader{
			maxBatch: 100,
			wait:     1 * time.Millisecond,
			fetch: func(ids []string) ([]*types.Club, []error) {
				clubs := make([]*types.Club, len(ids))
				clubById := map[string]*types.Club{}

				clbs, err := app.Queries.ClubsByIds.Handle(context.Background(), query.ClubsByIds{ClubIds: ids})

				if err == nil {
					for _, clb := range clbs {
						clubById[clb.ID()] = types.MarshalClubToGraphQL(context.Background(), clb)
					}
				}

				for i, id := range ids {
					clubs[i] = clubById[id]
					i++
				}

				return clubs, nil
			},
		},
	}
}

func For(ctx context.Context) *Loaders {
	return ctx.Value(graphql.DataLoaderKey).(*Loaders)
}
