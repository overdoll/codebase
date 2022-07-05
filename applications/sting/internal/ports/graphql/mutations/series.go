package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateSeries(ctx context.Context, input types.CreateSeriesInput) (*types.CreateSeriesPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	series, err := r.App.Commands.CreateSeries.
		Handle(
			ctx,
			command.CreateSeries{
				Principal: principal.FromContext(ctx),
				Slug:      input.Slug,
				Title:     input.Title,
			},
		)

	if err != nil {

		if err == post.ErrSeriesSlugNotUnique {
			taken := types.CreateSeriesValidationSlugTaken
			return &types.CreateSeriesPayload{
				Validation: &taken,
			}, nil
		}

		return nil, err
	}

	return &types.CreateSeriesPayload{
		Series: types.MarshalSeriesToGraphQL(ctx, series),
	}, err
}

func (r *MutationResolver) UpdateSeriesTitle(ctx context.Context, input types.UpdateSeriesTitleInput) (*types.UpdateSeriesTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	series, err := r.App.Commands.UpdateSeriesTitle.
		Handle(
			ctx,
			command.UpdateSeriesTitle{
				Principal: principal.FromContext(ctx),
				SeriesId:  input.ID.GetID(),
				Title:     input.Title,
				Locale:    input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateSeriesTitlePayload{
		Series: types.MarshalSeriesToGraphQL(ctx, series),
	}, err
}

func (r *MutationResolver) UpdateSeriesThumbnail(ctx context.Context, input types.UpdateSeriesThumbnailInput) (*types.UpdateSeriesThumbnailPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	series, err := r.App.Commands.UpdateSeriesThumbnail.
		Handle(
			ctx,
			command.UpdateSeriesThumbnail{
				Principal: principal.FromContext(ctx),
				SeriesId:  input.ID.GetID(),
				Thumbnail: input.Thumbnail,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateSeriesThumbnailPayload{
		Series: types.MarshalSeriesToGraphQL(ctx, series),
	}, err
}
