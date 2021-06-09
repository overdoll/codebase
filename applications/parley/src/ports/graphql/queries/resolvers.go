package queries

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (q QueryResolver) RejectionReasons(ctx context.Context) ([]*types.PendingPostRejectionReason, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	reasons, err := q.App.Queries.PendingPostRejectionReasons.Handle(ctx)

	if err != nil {
		return nil, err
	}

	var rejectionReasons []*types.PendingPostRejectionReason

	for _, reason := range reasons {
		rejectionReasons = append(rejectionReasons, &types.PendingPostRejectionReason{
			ID:         reason.ID(),
			Reason:     reason.Reason(),
			Infraction: reason.Infraction(),
		})
	}

	return rejectionReasons, nil
}
