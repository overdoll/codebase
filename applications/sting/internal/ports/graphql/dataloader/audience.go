package dataloader

import (
	"context"
	"github.com/graph-gophers/dataloader/v7"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"time"
)

func audiencesByIds(app *app.Application) *dataloader.Loader[string, *types.Audience] {
	return dataloader.NewBatchedLoader[string, *types.Audience](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Audience] {
			return graphql.DataloaderHelper[*types.Audience](
				"audience",
				func(keys []string) ([]graphql.Mapping[*types.Audience], error) {
					results, err := app.Queries.AudiencesByIds.Handle(ctx, query.AudiencesByIds{
						Ids: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping[*types.Audience]

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping[*types.Audience]{
							Data: types.MarshalAudienceToGraphQL(ctx, result),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Audience](time.Millisecond*5))
}

func (i *DataLoader) GetAudienceById(ctx context.Context, id string) (*types.Audience, error) {

	thunk := i.audiencesByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
