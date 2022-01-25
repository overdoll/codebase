package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

func RejectPost(ctx workflow.Context, postAuditLogId, clubId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var isInfraction bool

	if err := workflow.ExecuteActivity(ctx, a.RejectPost, postAuditLogId).Get(ctx, &isInfraction); err != nil {
		return err
	}

	if isInfraction {
		if err := workflow.ExecuteActivity(ctx, a.IssueClubInfractionPostRejection, postAuditLogId).Get(ctx, nil); err != nil {
			return err
		}

		if err := workflow.ExecuteActivity(ctx, a.RemoveClubFromSearches, clubId).Get(ctx, nil); err != nil {
			return err
		}
	}

	return nil
}
