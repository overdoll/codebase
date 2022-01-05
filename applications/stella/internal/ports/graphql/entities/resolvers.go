package entities

import (
	"context"
	"overdoll/applications/stella/internal/app"
	query2 "overdoll/applications/stella/internal/app/query"
	club2 "overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/principal"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}

func (r EntityResolver) FindClubMemberByID(ctx context.Context, id relay.ID) (*types.ClubMember, error) {

	clb, err := r.App.Queries.ClubMemberById.Handle(ctx, query2.ClubMemberById{
		ClubId:    id.GetCompositePartID(1),
		AccountId: id.GetCompositePartID(0),
	})

	if err != nil {

		if err == club2.ErrClubMemberNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubMemberToGraphql(ctx, clb), nil
}

func (r EntityResolver) FindClubByID(ctx context.Context, id relay.ID) (*types.Club, error) {

	media, err := r.App.Queries.ClubById.Handle(ctx, query2.ClubById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {

		if err == club2.ErrClubNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubToGraphQL(ctx, media), nil
}
