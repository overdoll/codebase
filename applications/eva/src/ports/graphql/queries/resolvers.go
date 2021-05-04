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
	return r.App.Commands.RedeemCookie.Handle(ctx, cookie)
}

func (r *QueryResolver) Authentication(ctx context.Context) (*types.Authentication, error) {
	return r.App.Commands.Authentication.Handle(ctx)
}
