package types

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/graphql/relay"
)

func MarshalResourceProgressToGraphQL(ctx context.Context, progress *resource.Progress) *ResourceProgress {

	var state ResourceProgressState

	if progress.State() == resource.Started {
		state = ResourceProgressStateStarted
	}

	if progress.State() == resource.Finalizing {
		state = ResourceProgressStateFinalizing
	}

	if progress.State() == resource.Waiting {
		state = ResourceProgressStateWaiting
	}

	return &ResourceProgress{ID: relay.NewID(&ResourceProgress{}, progress.ItemId(), progress.ResourceId()), State: state, Progress: progress.Progress()}
}
