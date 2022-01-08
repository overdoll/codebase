package mutations

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
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

	_, err = r.Client.ExecuteWorkflow(ctx, options, workflows.AddClubMember, clubId, accountId)

	if err != nil {
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

	_, err := r.Client.ExecuteWorkflow(ctx, options, workflows.RemoveClubMember, clubId, accountId)

	if err != nil {
		return nil, err
	}

	return &types.WithdrawClubMembershipPayload{
		ClubMemberID: input.ClubID,
	}, nil
}