package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"time"
)

func topicsByIds(app *app.Application) *dataloader.Loader {
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

			// construct an output array of dataloader results
			results := make([]*dataloader.Result, len(keys))

			res, err := app.Queries.TopicsByIds.Handle(ctx, query.TopicsByIds{
				Ids: keyIds,
			})

			if err != nil {
				for _, ix := range keyOrder {
					results[ix] = &dataloader.Result{Data: nil, Error: err}
				}
				return results
			}

			// enumerate records, put into output
			for _, record := range res {

				ix, ok := keyOrder[record.ID()]
				// if found, remove from index lookup map so we know elements were found
				if ok {
					results[ix] = &dataloader.Result{Data: types.MarshalTopicToGraphQL(ctx, record), Error: nil}
					delete(keyOrder, record.ID())
				}
			}

			// fill array positions with errors where not found in DB
			for v, ix := range keyOrder {
				results[ix] = &dataloader.Result{Data: nil, Error: apperror.NewNotFoundError("topic", v)}
			}

			// return results
			return results
		}, dataloader.WithWait(time.Millisecond*1))
}

func (i *DataLoader) GetTopicById(ctx context.Context, id string) (*types.Topic, error) {

	thunk := i.topicsByIds.Load(ctx, dataloader.StringKey(id))
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result.(*types.Topic), nil
}
