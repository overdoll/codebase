package dataloader

import (
	"context"
	"time"

	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type Loaders struct {
	AccountById AccountLoader
}

func NewLoader(app *app.Application) *Loaders {
	return &Loaders{
		AccountById: AccountLoader{
			maxBatch: 100,
			wait:     1 * time.Millisecond,
			fetch: func(ids []string) ([]*types.Account, []error) {
				accounts := make([]*types.Account, len(ids))
				accountById := map[string]*types.Account{}

				accs, err := app.Queries.AccountsByIds.Handle(context.Background(), query.AccountsByIds{AccountIds: ids})

				if err == nil {
					for _, acc := range accs {
						accountById[acc.ID()] = types.MarshalAccountToGraphQL(acc)
					}
				}

				for i, id := range ids {
					accounts[i] = accountById[id]
					i++
				}

				return accounts, nil
			},
		},
	}
}

func For(ctx context.Context) *Loaders {
	return ctx.Value(graphql.DataLoaderKey).(*Loaders)
}
