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

func topicsByIds(app *app.Application) *dataloader.Loader[string, *types.Topic] {
	return dataloader.NewBatchedLoader[string, *types.Topic](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Topic] {
			return graphql.DataloaderHelper[*types.Topic](
				"topic",
				func(keys []string) ([]graphql.Mapping, error) {
					results, err := app.Queries.TopicsByIds.Handle(ctx, query.TopicsByIds{
						Ids: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping{
							Data: types.MarshalTopicToGraphQL(ctx, result),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Topic](time.Millisecond*5))
}

func (i *DataLoader) GetTopicById(ctx context.Context, id string) (*types.Topic, error) {

	thunk := i.topicsByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
