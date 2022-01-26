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
		Principal: principal.FromContext(ctx),
		PostId:    input.PostID.GetID(),
		RuleId:    input.RuleID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.ReportPostPayload{
		PostReport: types.MarshalPostReportToGraphQL(ctx, postReport),
	}, nil
}
