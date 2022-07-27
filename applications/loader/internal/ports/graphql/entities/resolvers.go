package entities

import (
	"context"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindResourceProgressByID(ctx context.Context, id relay.ID) (*types.ResourceProgress, error) {

	progress, err := e.App.Queries.ResourceProgressById.Handle(ctx, query.ResourceProgressById{
		ItemId:     id.GetCompositePartID(1),
		ResourceId: id.GetCompositePartID(0),
	})

	if err != nil {
		return nil, err
	}

	var state types.ResourceProgressState

	if progress.State() == resource.Started {
		state = types.ResourceProgressStateStarted
	}

	if progress.State() == resource.Finalizing {
		state = types.ResourceProgressStateFinalizing
	}

	if progress.State() == resource.Waiting {
		state = types.ResourceProgressStateWaiting
	}

	return &types.ResourceProgress{ID: id, State: state, Progress: progress.Progress()}, nil
}
