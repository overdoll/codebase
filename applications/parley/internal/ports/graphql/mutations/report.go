package mutations

import (
	"context"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r MutationResolver) ReportPost(ctx context.Context, input types.ReportPostInput) (*types.ReportPostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postReport, err := r.App.Commands.ReportPost.Handle(ctx, command.ReportPost{
		Principal:          principal.FromContext(ctx),
		PostId:             input.PostID.GetID(),
		PostReportReasonId: input.PostReportReason.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.ReportPostPayload{
		PostReport: types.MarshalPostReportToGraphQL(ctx, postReport),
	}, nil
}

func (r MutationResolver) CreatePostReportReason(ctx context.Context, input types.CreatePostReportReasonInput) (*types.CreatePostReportReasonPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postReportReason, err := r.App.Commands.CreatePostReportReason.Handle(ctx, command.CreatePostReportReason{
		Principal:   principal.FromContext(ctx),
		Title:       input.Title,
		Description: input.Description,
		Link:        (*string)(input.Link),
	})

	if err != nil {
		return nil, err
	}

	return &types.CreatePostReportReasonPayload{
		PostReportReason: types.MarshalPostReportReasonToGraphQL(ctx, postReportReason),
	}, nil
}

func (r MutationResolver) UpdatePostReportReasonTitle(ctx context.Context, input types.UpdatePostReportReasonTitleInput) (*types.UpdatePostReportReasonTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postReportReason, err := r.App.Commands.UpdatePostReportReasonTitle.Handle(ctx, command.UpdatePostReportReasonTitle{
		Principal:      principal.FromContext(ctx),
		ReportReasonId: input.ReportReasonID.GetID(),
		Title:          input.Title,
		Locale:         input.Locale,
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostReportReasonTitlePayload{
		PostReportReason: types.MarshalPostReportReasonToGraphQL(ctx, postReportReason),
	}, nil
}

func (r MutationResolver) UpdatePostReportReasonDescription(ctx context.Context, input types.UpdatePostReportReasonDescriptionInput) (*types.UpdatePostReportReasonDescriptionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postReportReason, err := r.App.Commands.UpdatePostReportReasonDescription.Handle(ctx, command.UpdatePostReportReasonDescription{
		Principal:      principal.FromContext(ctx),
		ReportReasonId: input.ReportReasonID.GetID(),
		Description:    input.Description,
		Locale:         input.Locale,
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostReportReasonDescriptionPayload{
		PostReportReason: types.MarshalPostReportReasonToGraphQL(ctx, postReportReason),
	}, nil
}

func (r MutationResolver) UpdatePostReportReasonLink(ctx context.Context, input types.UpdatePostReportReasonLinkInput) (*types.UpdatePostReportReasonLinkPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postReportReason, err := r.App.Commands.UpdatePostReportReasonLink.Handle(ctx, command.UpdatePostReportReasonLink{
		Principal:      principal.FromContext(ctx),
		ReportReasonId: input.ReportReasonID.GetID(),
		Link:           (*string)(input.Link),
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostReportReasonLinkPayload{
		PostReportReason: types.MarshalPostReportReasonToGraphQL(ctx, postReportReason),
	}, nil
}

func (r MutationResolver) UpdatePostReportReasonDeprecated(ctx context.Context, input types.UpdatePostReportReasonDeprecatedInput) (*types.UpdatePostReportReasonDeprecatedPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postReportReason, err := r.App.Commands.UpdatePostReportReasonDeprecated.Handle(ctx, command.UpdatePostReportReasonDeprecated{
		Principal:      principal.FromContext(ctx),
		ReportReasonId: input.ReportReasonID.GetID(),
		Deprecated:     input.Deprecated,
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdatePostReportReasonDeprecatedPayload{
		PostReportReason: types.MarshalPostReportReasonToGraphQL(ctx, postReportReason),
	}, nil
}
