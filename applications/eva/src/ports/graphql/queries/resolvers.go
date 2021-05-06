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

	// If ck is returned as nil, cookie is invalid
	if ck == nil {
		return &types.Cookie{
			SameSession: false,
			Registered:  false,
			Redeemed:    false,
			Session:     "",
			Email:       "",
			Invalid:     true,
		}, nil
	}

	return &types.Cookie{
		SameSession: ck.SameSession(),
		Registered:  ck.Consumed(),
		Redeemed:    true,
		Session:     ck.Session(),
		Email:       ck.Email(),
		Invalid:     false,
	}, nil
}

func (r *QueryResolver) Authentication(ctx context.Context) (*types.Authentication, error) {

	ck, usr, err := r.App.Commands.Authentication.Handle(ctx)

	if err != nil {
		return nil, err
	}

	if ck == nil {
		return &types.Authentication{
			Cookie: nil,
			User:   nil,
		}, nil
	}

	newCookie := &types.Cookie{
		SameSession: true,
		Registered:  usr != nil,
		Redeemed:    ck.Redeemed(),
		Session:     ck.Session(),
		Email:       ck.Email(),
		Invalid:     false,
	}

	if usr == nil {
		return &types.Authentication{
			Cookie: newCookie,
			User:   nil,
		}, nil
	}

	return &types.Authentication{
		Cookie: &types.Cookie{
			SameSession: true,
			Registered:  true,
			Redeemed:    ck.Redeemed(),
			Session:     ck.Session(),
			Email:       ck.Email(),
			Invalid:     false,
		},
		User: &types.User{Username: usr.Username()},
	}, nil
}
