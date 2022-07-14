package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"time"
)

func categoriesByIds(app *app.Application) *dataloader.Loader[string, *types.Category] {
	return dataloader.NewBatchedLoader[string, *types.Category](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Category] {
			return graphql.DataloaderHelper[*types.Category](
				"category",
				func(keys []string) ([]graphql.Mapping[*types.Category], error) {
					results, err := app.Queries.CategoriesByIds.Handle(ctx, query.CategoriesByIds{
						Ids: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping[*types.Category]

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping[*types.Category]{
							Data: types.MarshalCategoryToGraphQL(ctx, result),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Category](time.Millisecond*5))
}

func (i *DataLoader) GetCategoryById(ctx context.Context, id string) (*types.Category, error) {

	thunk := i.categoriesByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
