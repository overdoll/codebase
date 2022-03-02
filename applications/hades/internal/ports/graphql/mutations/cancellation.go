package mutations

import (
	"context"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateCancellationReason(ctx context.Context, input types.CreateCancellationReasonInput) (*types.CreateCancellationReasonPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	reason, err := r.App.Commands.CreateCancellationReason.
		Handle(
			ctx,
			command.CreateCancellationReason{
				Principal: principal.FromContext(ctx),
				Title:     input.Title,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CreateCancellationReasonPayload{
		CancellationReason: types.MarshalCancellationReasonToGraphQL(ctx, reason),
	}, nil
}

func (r *MutationResolver) UpdateCancellationReasonTitle(ctx context.Context, input types.UpdateCancellationReasonTitleInput) (*types.UpdateCancellationReasonTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	reason, err := r.App.Commands.UpdateCancellationReasonTitle.
		Handle(
			ctx,
			command.UpdateCancellationReasonTitle{
				Principal: principal.FromContext(ctx),
				ReasonId:  input.CancellationReasonID.GetID(),
				Title:     input.Title,
				Locale:    input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCancellationReasonTitlePayload{
		CancellationReason: types.MarshalCancellationReasonToGraphQL(ctx, reason),
	}, nil
}

func (r *MutationResolver) UpdateCancellationReasonDeprecated(ctx context.Context, input types.UpdateCancellationReasonDeprecatedInput) (*types.UpdateCancellationReasonDeprecatedPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	reason, err := r.App.Commands.UpdateCancellationReasonDeprecated.
		Handle(
			ctx,
			command.UpdateCancellationReasonDeprecated{
				Principal:  principal.FromContext(ctx),
				ReasonId:   input.CancellationReasonID.GetID(),
				Deprecated: input.Deprecated,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateCancellationReasonDeprecatedPayload{
		CancellationReason: types.MarshalCancellationReasonToGraphQL(ctx, reason),
	}, nil
}
