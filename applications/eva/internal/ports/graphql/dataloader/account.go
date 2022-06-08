package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"time"
)

func accountsByIds(app *app.Application) *dataloader.Loader {
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

			res, err := app.Queries.AccountsByIds.Handle(context.Background(), query.AccountsByIds{AccountIds: keyIds})

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
					results[ix] = &dataloader.Result{Data: types.MarshalAccountToGraphQL(record), Error: nil}
					delete(keyOrder, record.ID())
				}
			}

			// fill array positions with errors where not found in DB
			for v, ix := range keyOrder {
				results[ix] = &dataloader.Result{Data: nil, Error: apperror.NewNotFoundError("account", v)}
			}

			// return results
			return results
		}, dataloader.WithWait(time.Millisecond*1))
}

func (i *DataLoader) GetAccountById(ctx context.Context, id string) (*types.Account, error) {

	thunk := i.accountsByIds.Load(ctx, dataloader.StringKey(id))
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result.(*types.Account), nil
}
