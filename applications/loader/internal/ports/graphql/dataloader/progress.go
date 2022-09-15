package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/domain/progress"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"strings"
	"time"
)

func mediaProgressByIds(app *app.Application) *dataloader.Loader[string, *types.MediaProgress] {
	return dataloader.NewBatchedLoader[string, *types.MediaProgress](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.MediaProgress] {
			return graphql.DataloaderHelper[*types.MediaProgress](
				"media_progress",
				func(keys []string) ([]graphql.Mapping[*types.MediaProgress], error) {

					var itemIds []string
					var resourceIds []string

					for _, k := range keys {
						split := strings.Split(k, "-")
						itemIds = append(itemIds, split[0])
						resourceIds = append(resourceIds, split[1])
					}

					results, err := app.Queries.MediaProgressByIds.Handle(ctx, query.MediaProgressByIds{
						LinkedIds: itemIds,
						MediaIds:  resourceIds,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping[*types.MediaProgress]

					for _, k := range keys {
						found := false
						split := strings.Split(k, "-")
						itemId := split[0]
						resourceId := split[1]
						for _, result := range results {
							if result.LinkedId() == itemId && result.MediaId() == resourceId {
								mapping = append(mapping, graphql.Mapping[*types.MediaProgress]{
									Data: types.MarshalMediaProgressToGraphQL(ctx, result),
									Id:   k,
								})
								found = true
								break
							}
						}

						if !found {
							mapping = append(mapping, graphql.Mapping[*types.MediaProgress]{
								Data: types.MarshalMediaProgressToGraphQL(ctx, progress.NewWaiting(itemId, resourceId)),
								Id:   k,
							})
						}
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.MediaProgress](time.Millisecond*5))
}

func (i *DataLoader) GetMediaProgressById(ctx context.Context, itemId, resourceId string) (*types.MediaProgress, error) {

	thunk := i.mediaProgressByIds.Load(ctx, itemId+"-"+resourceId)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
