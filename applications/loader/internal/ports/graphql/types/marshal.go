package types

import (
	"context"
	"overdoll/applications/loader/internal/domain/progress"
	"overdoll/libraries/graphql/relay"
)

func MarshalMediaProgressToGraphQL(ctx context.Context, prog *progress.Progress) *MediaProgress {

	var state MediaProgressState

	if prog.State() == progress.Started {
		state = MediaProgressStateStarted
	}

	if prog.State() == progress.Finalizing {
		state = MediaProgressStateFinalizing
	}

	if prog.State() == progress.Waiting {
		state = MediaProgressStateWaiting
	}

	return &MediaProgress{ID: relay.NewID(&MediaProgress{}, prog.LinkedId(), prog.MediaId()), State: state, Progress: prog.Progress()}
}

func MarshalMediaProgressToLegacyResourceProgressGraphQL(ctx context.Context, prog *MediaProgress) *ResourceProgress {

	var state ResourceProgressState

	if prog.State == MediaProgressStateStarted {
		state = ResourceProgressStateStarted
	}

	if prog.State == MediaProgressStateFinalizing {
		state = ResourceProgressStateFinalizing
	}

	if prog.State == MediaProgressStateWaiting {
		state = ResourceProgressStateWaiting
	}

	return &ResourceProgress{ID: relay.NewID(&ResourceProgress{}, prog.ID.GetCompositePartID(1), prog.ID.GetCompositePartID(0)), State: state, Progress: prog.Progress}
}
