package mutations

import (
	"context"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r MutationResolver) CreateClubInfractionReason(ctx context.Context, input types.CreateClubInfractionReasonInput) (*types.CreateClubInfractionReasonPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubInfractionReason, err := r.App.Commands.CreateClubInfractionReason.
		Handle(
			ctx,
			command.CreateClubInfractionReason{
				Principal: principal.FromContext(ctx),
				Reason:    input.Reason,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CreateClubInfractionReasonPayload{
		ClubInfractionReason: types.MarshalClubInfractionReasonToGraphQL(ctx, clubInfractionReason),
	}, nil
}

func (r MutationResolver) UpdateClubInfractionReasonDeprecated(ctx context.Context, input types.UpdateClubInfractionReasonDeprecatedInput) (*types.UpdateClubInfractionReasonDeprecatedUpload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubInfractionReason, err := r.App.Commands.UpdateClubInfractionReasonDeprecated.
		Handle(
			ctx,
			command.UpdateClubInfractionReasonDeprecated{
				Principal:          principal.FromContext(ctx),
				InfractionReasonId: input.ReasonID.GetID(),
				Deprecated:         input.Deprecated,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateClubInfractionReasonDeprecatedUpload{
		ClubInfractionReason: types.MarshalClubInfractionReasonToGraphQL(ctx, clubInfractionReason),
	}, nil
}

func (r MutationResolver) UpdateClubInfractionReasonText(ctx context.Context, input types.UpdateClubInfractionReasonTextInput) (*types.UpdateClubInfractionReasonTextPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubInfractionReason, err := r.App.Commands.UpdateClubInfractionReasonText.
		Handle(
			ctx,
			command.UpdateClubInfractionReasonText{
				Principal:          principal.FromContext(ctx),
				InfractionReasonId: input.ReasonID.GetID(),
				Reason:             input.Reason,
				Locale:             input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateClubInfractionReasonTextPayload{
		ClubInfractionReason: types.MarshalClubInfractionReasonToGraphQL(ctx, clubInfractionReason),
	}, nil
}

func (r MutationResolver) IssueClubInfraction(ctx context.Context, input types.IssueClubInfractionInput) (*types.IssueClubInfractionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubInfractionHistory, err := r.App.Commands.IssueClubInfraction.
		Handle(
			ctx,
			command.IssueClubInfraction{
				Principal:          principal.FromContext(ctx),
				InfractionReasonId: input.InfractionReasonID.GetID(),
				ClubId:             input.ClubID.GetID(),
				CustomEndTime:      input.CustomEndTime,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.IssueClubInfractionPayload{
		ClubInfractionHistory: types.MarshalClubInfractionHistoryToGraphQL(ctx, clubInfractionHistory),
	}, nil
}

func (r MutationResolver) RemoveClubInfractionHistory(ctx context.Context, input types.RemoveClubInfractionHistoryInput) (*types.RemoveClubInfractionHistoryPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.RemoveClubInfractionHistory.
		Handle(
			ctx,
			command.RemoveClubInfractionHistory{
				Principal: principal.FromContext(ctx),
				HistoryId: input.ClubInfractionHistoryID.GetCompositePartID(0),
				ClubId:    input.ClubInfractionHistoryID.GetCompositePartID(1),
			},
		); err != nil {
		return nil, err
	}

	return &types.RemoveClubInfractionHistoryPayload{
		ClubInfractionHistoryID: input.ClubInfractionHistoryID,
	}, nil
}
