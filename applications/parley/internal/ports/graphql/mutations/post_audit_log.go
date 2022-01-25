package mutations

import (
	"context"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r MutationResolver) CreatePostRejectionReason(ctx context.Context, input types.CreatePostRejectionReasonInput) (*types.CreatePostRejectionReasonPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var clubInfractionReasonId *string

	if input.ClubInfractionReason != nil {
		id := input.ClubInfractionReason.GetID()
		clubInfractionReasonId = &id
	}

	postRejectionReason, err := r.App.Commands.CreatePostRejectionReason.
		Handle(
			ctx,
			command.CreatePostRejectionReason{
				Principal:              principal.FromContext(ctx),
				Reason:                 input.Reason,
				ClubInfractionReasonId: clubInfractionReasonId,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CreatePostRejectionReasonPayload{
		PostRejectionReason: types.MarshalPostRejectionReasonToGraphQL(ctx, postRejectionReason),
	}, nil
}

func (r MutationResolver) UpdatePostRejectionReasonDeprecated(ctx context.Context, input types.UpdatePostRejectionReasonDeprecatedInput) (*types.UpdatePostRejectionReasonDeprecatedPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postRejectionReason, err := r.App.Commands.UpdatePostRejectionReasonDeprecated.
		Handle(
			ctx,
			command.UpdatePostRejectionReasonDeprecated{
				Principal:         principal.FromContext(ctx),
				RejectionReasonId: input.RejectionReasonID.GetID(),
				Deprecated:        input.Deprecated,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostRejectionReasonDeprecatedPayload{
		PostRejectionReason: types.MarshalPostRejectionReasonToGraphQL(ctx, postRejectionReason),
	}, nil
}

func (r MutationResolver) UpdatePostRejectionReasonText(ctx context.Context, input types.UpdatePostRejectionReasonTextInput) (*types.UpdatePostRejectionReasonTextPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postRejectionReason, err := r.App.Commands.UpdatePostRejectionReasonText.
		Handle(
			ctx,
			command.UpdatePostRejectionReasonText{
				Principal:         principal.FromContext(ctx),
				RejectionReasonId: input.RejectionReasonID.GetID(),
				Locale:            input.Locale,
				Reason:            input.Reason,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostRejectionReasonTextPayload{
		PostRejectionReason: types.MarshalPostRejectionReasonToGraphQL(ctx, postRejectionReason),
	}, nil
}

func (r MutationResolver) UpdatePostRejectionReasonClubInfractionReason(ctx context.Context, input types.UpdatePostRejectionReasonClubInfractionReasonInput) (*types.UpdatePostRejectionReasonClubInfractionReasonPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var clubInfractionReasonId string

	if input.ClubInfractionReason != nil {
		clubInfractionReasonId = input.ClubInfractionReason.GetID()
	}

	postRejectionReason, err := r.App.Commands.UpdatePostRejectionReasonClubInfractionReason.
		Handle(
			ctx,
			command.UpdatePostRejectionReasonClubInfractionReason{
				Principal:              principal.FromContext(ctx),
				RejectionReasonId:      input.RejectionReasonID.GetID(),
				ClubInfractionReasonId: clubInfractionReasonId,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostRejectionReasonClubInfractionReasonPayload{
		PostRejectionReason: types.MarshalPostRejectionReasonToGraphQL(ctx, postRejectionReason),
	}, nil
}
