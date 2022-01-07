package entities

import (
	"context"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/ports/graphql/dataloader"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/principal"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindClubByID(ctx context.Context, id relay.ID) (*types.Club, error) {
	return dataloader.For(ctx).GetClubById(ctx, id.GetID())
}

func (r EntityResolver) FindClubMemberByID(ctx context.Context, id relay.ID) (*types.ClubMember, error) {

	clubs, err := r.App.Queries.ClubMemberById.Handle(ctx, query.ClubMemberById{
		Principal: principal.FromContext(ctx),
		AccountId: id.GetCompositePartID(0),
		ClubId:    id.GetCompositePartID(1),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubMemberToGraphql(ctx, clubs), nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}
