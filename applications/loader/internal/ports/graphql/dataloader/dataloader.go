package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	resourceProgressByIds *dataloader.Loader[string, *types.ResourceProgress]
}

func NewDataLoader(app *app.Application) *DataLoader {
	return &DataLoader{
		resourceProgressByIds: resourceProgressByIds(app),
	}
}

func For(ctx context.Context) *DataLoader {
	return ctx.Value(graphql.DataLoaderKey).(*DataLoader)
}
