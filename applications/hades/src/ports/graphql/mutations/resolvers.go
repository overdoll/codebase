package mutations

import (
	"context"

	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/ports/graphql/types"
)

type MutationResolver struct {
	App app.Application
}

func (r *MutationResolver) Post(ctx context.Context, data *types.PostInput) (*types.PostResponse, error) {
	// TODO: don't depend on graphql types
	return r.App.Commands.CreatePost.Handle(ctx, data)
}

func (r *MutationResolver) Authenticate(ctx context.Context, data *types.AuthenticationInput) (bool, error) {
	return r.App.Commands.Authenticate.Handle(ctx, data.Email)
}

func (r *MutationResolver) Register(ctx context.Context, data *types.RegisterInput) (bool, error) {
	return r.App.Commands.Register.Handle(ctx, data.Username)
}

func (r *MutationResolver) Logout(ctx context.Context) (bool, error) {
	return r.App.Commands.Logout.Handle(ctx)
}
