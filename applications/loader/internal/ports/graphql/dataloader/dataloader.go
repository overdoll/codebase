package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	mediaProgressByIds *dataloader.Loader[string, *types.MediaProgress]
}

func NewDataLoader(app *app.Application) *DataLoader {
	return &DataLoader{
		mediaProgressByIds: mediaProgressByIds(app),
	}
}

func For(ctx context.Context) *DataLoader {
	return ctx.Value(graphql.DataLoaderKey).(*DataLoader)
}
