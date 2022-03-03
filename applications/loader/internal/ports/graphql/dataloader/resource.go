package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"strings"
	"time"
)

func resourcesByIds(app *app.Application) *dataloader.Loader {
	return dataloader.NewBatchedLoader(
		func(ctx context.Context, keys dataloader.Keys) []*dataloader.Result {
			// create a map for remembering the order of keys passed in
			keyOrder := make(map[string]int, len(keys))

			// collect the keys to search for
			var keyIds []string
			for ix, key := range keys {
				keyIds = append(keyIds, key.String())
				keyOrder[key.String()] = ix
			}

			var itemIds []string
			var resourceIds []string

			for _, id := range keyIds {
				res := strings.Split(id, "|")
				itemIds = append(itemIds, res[0])
				resourceIds = append(resourceIds, res[1])
			}

			res, err := app.Queries.ResourcesByIdsWithUrls.Handle(ctx, query.ResourcesByIdsWithUrls{
				ItemIds:     itemIds,
				ResourceIds: resourceIds,
			})

			if err != nil {
				return []*dataloader.Result{{Data: nil, Error: err}}
			}

			// construct an output array of dataloader results
			results := make([]*dataloader.Result, len(keys))
			// enumerate records, put into output
			for _, record := range res {

				id := record.ItemId() + "|" + record.ID()

				ix, ok := keyOrder[id]
				// if found, remove from index lookup map so we know elements were found
				if ok {
					results[ix] = &dataloader.Result{Data: types.MarshalResourceToGraphQL(ctx, record), Error: nil}
					delete(keyOrder, id)
				}
			}

			// fill array positions with errors where not found in DB
			for _, ix := range keyOrder {
				results[ix] = &dataloader.Result{Data: nil, Error: resource.ErrResourceNotFound}
			}

			// return results
			return results
		}, dataloader.WithWait(time.Millisecond*1))
}

func (i *DataLoader) GetResourceById(ctx context.Context, itemId, resourceId string) (*types.Resource, error) {

	thunk := i.resourceById.Load(ctx, dataloader.StringKey(itemId+"|"+resourceId))
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result.(*types.Resource), err
}
