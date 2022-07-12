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

func charactersByIds(app *app.Application) *dataloader.Loader[string, *types.Character] {
	return dataloader.NewBatchedLoader[string, *types.Character](
		func(ctx context.Context, keys []string) []*dataloader.Result[*types.Character] {
			return graphql.DataloaderHelper[*types.Character](
				"character",
				func(keys []string) ([]graphql.Mapping, error) {
					results, err := app.Queries.CharactersByIds.Handle(ctx, query.CharactersByIds{
						Ids: keys,
					})

					if err != nil {
						return nil, err
					}

					var mapping []graphql.Mapping

					for _, result := range results {
						mapping = append(mapping, graphql.Mapping{
							Data: types.MarshalCharacterToGraphQL(ctx, result),
							Id:   result.ID(),
						})
					}

					return mapping, nil
				}, ctx, keys)
		}, dataloader.WithWait[string, *types.Character](time.Millisecond*5))
}

func (i *DataLoader) GetCharacterById(ctx context.Context, id string) (*types.Character, error) {

	thunk := i.charactersByIds.Load(ctx, id)
	result, err := thunk()

	if err != nil {
		return nil, err
	}

	return result, nil
}
