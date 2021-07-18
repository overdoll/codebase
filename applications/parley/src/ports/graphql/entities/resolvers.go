package entities

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	panic("implement me")
}

func (r EntityResolver) FindAccountInfractionHistoryByID(ctx context.Context, id relay.ID) (*types.AccountInfractionHistory, error) {
	panic("implement me")
}

func (r EntityResolver) FindPendingPostAuditLogByID(ctx context.Context, id relay.ID) (*types.PendingPostAuditLog, error) {
	panic("implement me")
}

func (r EntityResolver) FindPendingPostRejectionReasonByID(ctx context.Context, id relay.ID) (*types.PendingPostRejectionReason, error) {
	panic("implement me")
}
