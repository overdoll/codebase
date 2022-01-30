package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/loader/internal/app"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	resourceById *dataloader.Loader
}

func NewDataLoader(app *app.Application) *DataLoader {
	return &DataLoader{
		resourceById: resourcesByIds(app),
	}
}

func For(ctx context.Context) *DataLoader {
	return ctx.Value(graphql.DataLoaderKey).(*DataLoader)
}
