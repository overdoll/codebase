package graphql

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/libraries/errors/apperror"
)

const DataLoaderKey = "dataloaders"

type Mapping struct {
	Data any
	Id   string
}

func DataloaderHelper[V any](notFoundKey string, getData func(keys []string) ([]Mapping, error), ctx context.Context, keys []string) []*dataloader.Result[V] {
	// create a map for remembering the order of keys passed in
	keyOrder := make(map[string]int, len(keys))

	// collect the keys to search for
	var keyIds []string
	for ix, key := range keys {
		keyIds = append(keyIds, key)
		keyOrder[key] = ix
	}

	// construct an output array of dataloader results
	results := make([]*dataloader.Result[V], len(keys))

	res, err := getData(keys)

	if err != nil {
		for _, ix := range keyOrder {
			results[ix] = &dataloader.Result[V]{Data: nil, Error: err}
		}
		return results
	}

	// enumerate records, put into output
	for _, record := range res {

		ix, ok := keyOrder[record.Id]
		// if found, remove from index lookup map so we know elements were found
		if ok {
			results[ix] = &dataloader.Result[V]{Data: record.Data, Error: nil}
			delete(keyOrder, record.Id)
		}
	}

	// fill array positions with errors where not found in DB
	for v, ix := range keyOrder {
		results[ix] = &dataloader.Result[V]{Data: nil, Error: apperror.NewNotFoundError(notFoundKey, v)}
	}

	// return results
	return results
}
