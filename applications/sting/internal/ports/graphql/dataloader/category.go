package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/errors/domainerror"
	"time"
)

func categoriesByIds(app *app.Application) *dataloader.Loader {
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

			res, err := app.Queries.CategoriesByIds.Handle(ctx, query.CategoriesByIds{
				Ids: keyIds,
			})

			if err != nil {
				return []*dataloader.Result{{Data: nil, Error: err}}
			}
			// construct an output array of dataloader results
			results := make([]*dataloader.Result, len(keys))

			// enumerate records, put into output
			for _, record := range res {

				ix, ok := keyOrder[record.ID()]
				// if found, remove from index lookup map so we know elements were found
				if ok {
					results[ix] = &dataloader.Result{Data: types.MarshalCategoryToGraphQL(ctx, record), Error: nil}
					delete(keyOrder, record.ID())
				}
			}

			// fill array positions with errors where not found in DB
			for v, ix := range keyOrder {
				results[ix] = &dataloader.Result{Data: nil, Error: domainerror.NewNotFoundError("category", v)}
			}

			// return results
			return results
		}, dataloader.WithWait(time.Millisecond*1))
}

func (i *DataLoader) GetCategoryById(ctx context.Context, id string) (*types.Category, error) {

	thunk := i.categoriesByIds.Load(ctx, dataloader.StringKey(id))
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result.(*types.Category), nil
}
