package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"strings"
	"time"
)

func resourceProgressByIds(app *app.Application) *dataloader.Loader[string, *types.ResourceProgress] {
	return dataloader.NewBatchedLoader[string, *types.ResourceProgress](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.ResourceProgress] {
			return graphql.DataloaderHelper[*types.ResourceProgress](
				"resource_progress",
				func(keys []string) ([]graphql.Mapping[*types.ResourceProgress], error) {

					var itemIds []string
					var resourceIds []string

					for _, k := range keys {
						split := strings.Split(k, "-")
						itemIds = append(itemIds, split[0])
						resourceIds = append(resourceIds, split[1])
					}

					results, err := app.Queries.ResourceProgressByIds.Handle(ctx, query.ResourceProgressByIds{
						ItemIds:     itemIds,
						ResourceIds: resourceIds,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping[*types.ResourceProgress]

					for _, k := range keys {
						found := false
						split := strings.Split(k, "-")
						itemId := split[0]
						resourceId := split[1]
						for _, result := range results {
							if result.ItemId() == itemId && result.ResourceId() == resourceId {
								mapping = append(mapping, graphql.Mapping[*types.ResourceProgress]{
									Data: types.MarshalResourceProgressToGraphQL(ctx, result),
									Id:   k,
								})
								found = true
								break
							}
						}

						if !found {
							mapping = append(mapping, graphql.Mapping[*types.ResourceProgress]{
								Data: types.MarshalResourceProgressToGraphQL(ctx, resource.NewWaiting(itemId, resourceId)),
								Id:   k,
							})
						}
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.ResourceProgress](time.Millisecond*5))
}

func (i *DataLoader) GetResourceProgressById(ctx context.Context, itemId, resourceId string) (*types.ResourceProgress, error) {

	thunk := i.resourceProgressByIds.Load(ctx, itemId+"-"+resourceId)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
