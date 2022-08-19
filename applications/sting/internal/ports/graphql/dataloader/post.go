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

func postsByIds(app *app.Application) *dataloader.Loader[string, *types.Post] {
	return dataloader.NewBatchedLoader[string, *types.Post](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Post] {
			return graphql.DataloaderHelper[*types.Post](
				"post",
				func(keys []string) ([]graphql.Mapping[*types.Post], error) {
					results, err := app.Queries.PostsByIds.Handle(ctx, query.PostsByIds{
						Ids: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping[*types.Post]

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping[*types.Post]{
							Data: types.MarshalPostToGraphQL(ctx, result, nil),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Post](time.Millisecond*5))
}

func (i *DataLoader) GetPostById(ctx context.Context, id string) (*types.Post, error) {

	thunk := i.postsByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
