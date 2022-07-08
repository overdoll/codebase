package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader"
	"overdoll/applications/sting/internal/app"
	"overdoll/libraries/graphql"
)

type DataLoader struct {
	postsByIds      *dataloader.Loader
	charactersByIds *dataloader.Loader
	audiencesByIds  *dataloader.Loader
	categoriesByIds *dataloader.Loader
	seriesByIds     *dataloader.Loader
	clubsByIds      *dataloader.Loader
	topicsByIds     *dataloader.Loader
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
