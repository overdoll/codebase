package resolvers

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type ClubMemberResolver struct {
	App *app.Application
}

func (c ClubMemberResolver) Club(ctx context.Context, obj *types.ClubMember) (*types.Club, error) {
	return dataloader.For(ctx).GetClubById(ctx, obj.Club.ID.GetID())
}
