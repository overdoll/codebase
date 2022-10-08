package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type MutationResolver struct {
	App *app.Application
}

func (r *MutationResolver) NewCreatorLead(ctx context.Context, input types.NewCreatorLeadInput) (*types.NewCreatorLeadPayload, error) {
	//TODO implement me
	panic("implement me")
}
