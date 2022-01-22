package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/eva/internal/app"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	accountsByIds *dataloader.Loader
}

func NewDataLoader(app *app.Application) *DataLoader {
	return &DataLoader{
		accountsByIds: accountsByIds(app),
	}
}

func For(ctx context.Context) *DataLoader {
	return ctx.Value(graphql.DataLoaderKey).(*DataLoader)
}
