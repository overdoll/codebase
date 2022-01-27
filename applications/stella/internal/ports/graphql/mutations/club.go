package mutations

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type MutationResolver struct {
	App    *app.Application
	Client client.Client
}

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

func (r *MutationResolver) BecomeClubMember(ctx context.Context, input types.BecomeClubMemberInput) (*types.BecomeClubMemberPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubId := input.ClubID.GetID()
	accountId := principal.FromContext(ctx).AccountId()

	clb, err := r.App.Commands.BecomeClubMember.
		Handle(
			ctx,
			command.BecomeClubMember{
				Principal: principal.FromContext(ctx),
				ClubId:    clubId,
			},
		)

	if err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "AddClubMember_" + clubId + "_" + accountId,
	}

	if _, err = r.Client.ExecuteWorkflow(ctx, options, workflows.AddClubMember, clubId, accountId); err != nil {
		return nil, err
	}

	return &types.BecomeClubMemberPayload{
		ClubMember: types.MarshalClubMemberToGraphql(ctx, clb),
	}, nil
}

func (r *MutationResolver) WithdrawClubMembership(ctx context.Context, input types.WithdrawClubMembershipInput) (*types.WithdrawClubMembershipPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubId := input.ClubID.GetID()
	accountId := principal.FromContext(ctx).AccountId()

	if err := r.App.Commands.WithdrawClubMembership.
		Handle(
			ctx,
			command.WithdrawClubMembership{
				Principal: principal.FromContext(ctx),
				ClubId:    clubId,
			},
		); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemoveClubMember_" + clubId + "_" + accountId,
	}

	if _, err := r.Client.ExecuteWorkflow(ctx, options, workflows.RemoveClubMember, clubId, accountId); err != nil {
		return nil, err
	}

	return &types.WithdrawClubMembershipPayload{
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
