package mutations

import (
	"context"
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateClub(ctx context.Context, input types.CreateClubInput) (*types.CreateClubPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.CreateClub.
		Handle(
			ctx,
			command.CreateClub{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				Name:      input.Name,
			},
		)

	if err != nil {

		if err == club.ErrClubSlugNotUnique {
			taken := types.CreateClubValidationSlugTaken
			return &types.CreateClubPayload{Validation: &taken}, nil
		}

		return nil, err
	}

	return &types.CreateClubPayload{
		Club: types.MarshalClubToGraphQL(ctx, pst),
	}, nil
}

func (r *MutationResolver) AddClubSlugAlias(ctx context.Context, input types.AddClubSlugAliasInput) (*types.AddClubSlugAliasPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.AddClubSlugAlias.
		Handle(
			ctx,
			command.AddClubSlugAlias{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				ClubId:    input.ID.GetID(),
			},
		)

	if err != nil {

		if err == club.ErrClubSlugNotUnique {
			taken := types.AddClubSlugAliasValidationSlugTaken
			return &types.AddClubSlugAliasPayload{Validation: &taken}, nil
		}

		return nil, err
	}

	return &types.AddClubSlugAliasPayload{
		Club: types.MarshalClubToGraphQL(ctx, pst),
	}, nil
}

func (r *MutationResolver) RemoveClubSlugAlias(ctx context.Context, input types.RemoveClubSlugAliasInput) (*types.RemoveClubSlugAliasPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.RemoveClubSlugAlias.
		Handle(
			ctx,
			command.RemoveClubSlugAlias{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				ClubId:    input.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.RemoveClubSlugAliasPayload{
		Club: types.MarshalClubToGraphQL(ctx, pst),
	}, nil
}

func (r *MutationResolver) PromoteClubSlugAliasToDefault(ctx context.Context, input types.PromoteClubSlugAliasToDefaultInput) (*types.PromoteClubSlugAliasToDefaultPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.PromoteClubSlugAliasToDefault.
		Handle(
			ctx,
			command.PromoteClubSlugAliasToDefault{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				ClubId:    input.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.PromoteClubSlugAliasToDefaultPayload{
		Club: types.MarshalClubToGraphQL(ctx, pst),
	}, nil
}

func (r *MutationResolver) UpdateClubName(ctx context.Context, input types.UpdateClubNameInput) (*types.UpdateClubNamePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.UpdateClubName.
		Handle(
			ctx,
			command.UpdateClubName{
				Principal: principal.FromContext(ctx),
				Name:      input.Name,
				ClubId:    input.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateClubNamePayload{
		Club: types.MarshalClubToGraphQL(ctx, pst),
	}, nil
}

func (r *MutationResolver) UpdateClubThumbnail(ctx context.Context, input types.UpdateClubThumbnailInput) (*types.UpdateClubThumbnailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.UpdateClubThumbnail.
		Handle(
			ctx,
			command.UpdateClubThumbnail{
				Principal: principal.FromContext(ctx),
				Thumbnail: input.Thumbnail,
				ClubId:    input.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateClubThumbnailPayload{
		Club: types.MarshalClubToGraphQL(ctx, pst),
	}, nil
}

func (r *MutationResolver) JoinClub(ctx context.Context, input types.JoinClubInput) (*types.JoinClubPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubId := input.ClubID.GetID()

	clb, err := r.App.Commands.JoinClub.
		Handle(
			ctx,
			command.JoinClub{
				Principal: principal.FromContext(ctx),
				ClubId:    clubId,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.JoinClubPayload{
		ClubMember: types.MarshalClubMemberToGraphql(ctx, clb),
	}, nil
}

func (r *MutationResolver) LeaveClub(ctx context.Context, input types.LeaveClubInput) (*types.LeaveClubPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubId := input.ClubID.GetID()

	if err := r.App.Commands.LeaveClub.
		Handle(
			ctx,
			command.LeaveClub{
				Principal: principal.FromContext(ctx),
				ClubId:    clubId,
			},
		); err != nil {
		return nil, err
	}

	return &types.LeaveClubPayload{
		ClubMemberID: input.ClubID,
	}, nil
}

func (r *MutationResolver) UnSuspendClub(ctx context.Context, input types.UnSuspendClubInput) (*types.UnSuspendClubPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubId := input.ClubID.GetID()

	result, err := r.App.Commands.UnSuspendClub.
		Handle(
			ctx,
			command.UnSuspendClub{
				Principal: principal.FromContext(ctx),
				ClubId:    clubId,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UnSuspendClubPayload{
		Club: types.MarshalClubToGraphQL(ctx, result),
	}, nil
}

func (r *MutationResolver) SuspendClub(ctx context.Context, input types.SuspendClubInput) (*types.SuspendClubPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubId := input.ClubID.GetID()

	result, err := r.App.Commands.SuspendClub.
		Handle(
			ctx,
			command.SuspendClub{
				Principal: principal.FromContext(ctx),
				ClubId:    clubId,
				EndTime:   input.EndTime,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.SuspendClubPayload{
		Club: types.MarshalClubToGraphQL(ctx, result),
	}, nil
}
