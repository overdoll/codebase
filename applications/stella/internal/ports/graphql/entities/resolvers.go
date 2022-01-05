package entities

import (
	"context"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}

func (r EntityResolver) FindClubMemberByID(ctx context.Context, id relay.ID) (*types.ClubMember, error) {

	clb, err := r.App.Queries.ClubMemberById.Handle(ctx, query.ClubMemberById{
		ClubId:    id.GetCompositePartID(1),
		AccountId: id.GetCompositePartID(0),
	})

	if err != nil {

		if err == club.ErrClubMemberNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubMemberToGraphql(ctx, clb), nil
}

func (r EntityResolver) FindClubByID(ctx context.Context, id relay.ID) (*types.Club, error) {

	media, err := r.App.Queries.ClubById.Handle(ctx, query.ClubById{
		Id: id.GetID(),
	})

	if err != nil {

		if err == club.ErrClubNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubToGraphQL(ctx, media), nil
}
