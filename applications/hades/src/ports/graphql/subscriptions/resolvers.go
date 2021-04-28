package subscriptions

import (
	"context"

	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/ports/graphql/types"
)

type SubscriptionResolver struct {
	App app.Application
}

func (r *SubscriptionResolver) AuthListener(ctx context.Context) (<-chan *types.AuthListener, error) {

	channel := make(chan *types.AuthListener)

	err := r.App.Queries.ListenAuthentication.Handle(ctx, channel)

	if err != nil {
		return nil, err
	}

	return channel, nil
}
