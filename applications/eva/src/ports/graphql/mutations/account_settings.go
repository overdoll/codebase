package mutations

import (
	"context"

	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

func (r *MutationResolver) AddAccountEmail(ctx context.Context, email string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	validation, err := r.App.Commands.AddAccountEmail.Handle(ctx, pass.AccountID(), email)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) ModifyAccountUsername(ctx context.Context, username string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	validation, err := r.App.Commands.ModifyAccountUsername.Handle(ctx, pass.AccountID(), username)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) RevokeAccountSession(ctx context.Context, id string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	err := r.App.Commands.RevokeAccountSession.Handle(ctx, pass.AccountID(), id)

	if err != nil {
		return nil, err
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}

func (r *MutationResolver) MakeAccountEmailPrimary(ctx context.Context, email string) (*types.Response, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	validation, err := r.App.Commands.MakeAccountEmailPrimary.Handle(ctx, pass.AccountID(), email)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return &types.Response{
			Validation: &types.Validation{Code: validation},
			Ok:         false,
		}, nil
	}

	return &types.Response{
		Validation: nil,
		Ok:         true,
	}, nil
}
