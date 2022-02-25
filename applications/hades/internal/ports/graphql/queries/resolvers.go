package queries

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/ports/graphql/types"
)

type QueryResolver struct {
	App *app.Application
}

func (q QueryResolver) CcbillSubscriptionDetails(ctx context.Context, ccbillSubscriptionID string) (*types.CCBillSubscriptionDetails, error) {
	//TODO implement me
	panic("implement me")
}

func (q QueryResolver) AccountClubSupporterSubscriptionFinalized(ctx context.Context, locker string) (*types.AccountClubSupporterSubscription, error) {
	//TODO implement me
	panic("implement me")
}
