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

	msgs, err := r.App.Queries.ListenAuthentication.Handle(ctx)

	channel := make(chan *types.AuthListener)

	if err != nil {
		return nil, err
	}

	go func() {

		for msg := range msgs {

			switch string(msg.Body) {

			case "SAME_SESSION":
				channel <- &types.AuthListener{SameSession: true, Cookie: cookie}
				return

			case "ANOTHER_SESSION":
				// If user exists, we can't set auth cookies here.
				// Because we can't set a cookie in websocket connections, we force the browser to refresh the current page,
				// and our root function will see that the cookie has been redeemed, and will log the user in
				channel <- &types.AuthListener{Cookie: cookie, SameSession: false}
				return
			}
		}

	}()

	return channel, nil
}
