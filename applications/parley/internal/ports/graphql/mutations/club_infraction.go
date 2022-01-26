package mutations

import (
	"context"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r MutationResolver) IssueClubInfraction(ctx context.Context, input types.IssueClubInfractionInput) (*types.IssueClubInfractionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	clubInfractionHistory, err := r.App.Commands.IssueClubInfraction.
		Handle(
			ctx,
			command.IssueClubInfraction{
				Principal:     principal.FromContext(ctx),
				RuleId:        input.RuleID.GetID(),
				ClubId:        input.ClubID.GetID(),
				CustomEndTime: input.CustomEndTime,
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
