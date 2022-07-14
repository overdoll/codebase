package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	postsByIds      *dataloader.Loader[string, *types.Post]
	charactersByIds *dataloader.Loader[string, *types.Character]
	audiencesByIds  *dataloader.Loader[string, *types.Audience]
	categoriesByIds *dataloader.Loader[string, *types.Category]
	seriesByIds     *dataloader.Loader[string, *types.Series]
	clubsByIds      *dataloader.Loader[string, *types.Club]
	topicsByIds     *dataloader.Loader[string, *types.Topic]
}

func NewDataLoader(app *app.Application) *DataLoader {
	return &DataLoader{
		postsByIds:      postsByIds(app),
		charactersByIds: charactersByIds(app),
		audiencesByIds:  audiencesByIds(app),
		categoriesByIds: categoriesByIds(app),
		seriesByIds:     seriesByIds(app),
		clubsByIds:      clubsByIds(app),
		topicsByIds:     topicsByIds(app),
	}
}

func For(ctx context.Context) *DataLoader {
	return ctx.Value(graphql.DataLoaderKey).(*DataLoader)
}
