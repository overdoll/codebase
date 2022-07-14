package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	accountsByIds *dataloader.Loader[string, *types.Account]
}

func NewDataLoader(app *app.Application) *DataLoader {
	return &DataLoader{
		accountsByIds: accountsByIds(app),
	}
}

func For(ctx context.Context) *DataLoader {
	return ctx.Value(graphql.DataLoaderKey).(*DataLoader)
}
