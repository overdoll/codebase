package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/stella/internal/app"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	clubsByIds *dataloader.Loader
}

func NewDataLoader(app *app.Application) *DataLoader {
	return &DataLoader{
		clubsByIds: clubsByIds(app),
	}
}

func For(ctx context.Context) *DataLoader {
	return ctx.Value(graphql.DataLoaderKey).(*DataLoader)
}
