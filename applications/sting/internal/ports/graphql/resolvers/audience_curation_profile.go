package resolvers

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type AudienceCurationProfileResolver struct {
	App *app.Application
}

func (r AudienceCurationProfileResolver) Audiences(ctx context.Context, obj *types.AudienceCurationProfile) ([]*types.Audience, error) {

	var audiences []*types.Audience

	for _, c := range obj.Audiences {
		cat, err := dataloader.For(ctx).GetAudienceById(ctx, c.ID.GetID())

		if err != nil {
			return nil, err
		}

		audiences = append(audiences, cat)
	}

	return audiences, nil
}
