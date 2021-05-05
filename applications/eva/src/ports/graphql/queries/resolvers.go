package queries

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type QueryResolver struct {
	App app.Application
}

func (r *QueryResolver) RedeemCookie(ctx context.Context, cookie string) (*types.Cookie, error) {

	ck, err := r.App.Commands.RedeemCookie.Handle(ctx, cookie)

	if err != nil {
		return nil, err
	}

	return &types.Cookie{
		SameSession: false,
		Registered:  false,
		Redeemed:    true,
		Session:     ck.Session(),
		Email:       ck.Email(),
		Invalid:     false,
	}, nil
}

func (r *QueryResolver) Authentication(ctx context.Context) (*types.Authentication, error) {
	return r.App.Commands.Authentication.Handle(ctx)
}
