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

func seriesByIds(app *app.Application) *dataloader.Loader[string, *types.Series] {
	return dataloader.NewBatchedLoader[string, *types.Series](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Series] {
			return graphql.DataloaderHelper[*types.Series](
				"series",
				func(keys []string) ([]graphql.Mapping[*types.Series], error) {
					results, err := app.Queries.SeriesByIds.Handle(ctx, query.SeriesByIds{
						Ids: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping[*types.Series]

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping[*types.Series]{
							Data: types.MarshalSeriesToGraphQL(ctx, result),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Series](time.Millisecond*5))
}

func (i *DataLoader) GetSeriesById(ctx context.Context, id string) (*types.Series, error) {

	thunk := i.seriesByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
