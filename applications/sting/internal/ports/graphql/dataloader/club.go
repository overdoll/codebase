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

func clubsByIds(app *app.Application) *dataloader.Loader[string, *types.Club] {
	return dataloader.NewBatchedLoader[string, *types.Club](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Club] {
			return graphql.DataloaderHelper[*types.Club](
				"club",
				func(keys []string) ([]graphql.Mapping[*types.Club], error) {
					results, err := app.Queries.ClubsByIds.Handle(ctx, query.ClubsByIds{
						ClubIds: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping[*types.Club]

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping[*types.Club]{
							Data: types.MarshalClubToGraphQL(ctx, result),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Club](time.Millisecond*5))
}

func (i *DataLoader) GetClubById(ctx context.Context, id string) (*types.Club, error) {

	thunk := i.clubsByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
