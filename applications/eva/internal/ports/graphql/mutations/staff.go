package mutations

import (
	"context"

	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) AssignAccountModeratorRole(ctx context.Context, input types.AssignAccountModeratorRole) (*types.AssignAccountModeratorRolePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.AssignAccountModeratorRole.Handle(ctx, command.AssignAccountModeratorRole{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return &types.AssignAccountModeratorRolePayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) AssignAccountStaffRole(ctx context.Context, input types.AssignAccountStaffRole) (*types.AssignAccountStaffRolePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.AssignAccountStaffRole.Handle(ctx, command.AssignAccountStaffRole{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return &types.AssignAccountStaffRolePayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) RevokeAccountModeratorRole(ctx context.Context, input types.RevokeAccountModeratorRole) (*types.RevokeAccountModeratorRolePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.RevokeAccountModeratorRole.Handle(ctx, command.RevokeAccountModeratorRole{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return &types.RevokeAccountModeratorRolePayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}

func (r *MutationResolver) RevokeAccountStaffRole(ctx context.Context, input types.RevokeAccountStaffRole) (*types.RevokeAccountStaffRolePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	acc, err := r.App.Commands.RevokeAccountStaffRole.Handle(ctx, command.RevokeAccountStaffRole{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return &types.RevokeAccountStaffRolePayload{Account: types.MarshalAccountToGraphQL(acc)}, nil
}
