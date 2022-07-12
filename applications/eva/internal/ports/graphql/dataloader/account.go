package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"time"
)

func accountsByIds(app *app.Application) *dataloader.Loader[string, *types.Account] {
	return dataloader.NewBatchedLoader[string, *types.Account](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Account] {
			return graphql.DataloaderHelper[*types.Account](
				"account",
				func(keys []string) ([]graphql.Mapping, error) {
					results, err := app.Queries.AccountsByIds.Handle(ctx, query.AccountsByIds{
						AccountIds: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping{
							Data: types.MarshalAccountToGraphQL(ctx, result),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Account](time.Millisecond*5))
}

func (i *DataLoader) GetAccountById(ctx context.Context, id string) (*types.Account, error) {

	thunk := i.accountsByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
