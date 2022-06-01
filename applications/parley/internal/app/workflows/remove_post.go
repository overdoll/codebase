package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

type RemovePostInput struct {
	AccountId string
	PostId    string
	ClubId    string
	RuleId    string
	Notes     *string
}

func RemovePost(ctx workflow.Context, input RemovePostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.CreateRemovedPostAuditLog,
		activities.CreateRemovedPostAuditLogInput{
			AccountId: input.AccountId,
			PostId:    input.PostId,
			RuleId:    input.RuleId,
			Notes:     input.Notes,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create removed post audit log", "Error", err)
		return err
	}

	var rule *activities.GetRuleDetailsPayload

	// get rule details
	if err := workflow.ExecuteActivity(ctx, a.GetRuleDetails,
		activities.GetRuleDetailsInput{
			RuleId: input.RuleId,
		},
	).Get(ctx, &rule); err != nil {
		logger.Error("failed to get rule details", "Error", err)
		return err
	}

	if rule.IsInfraction {

		var clubSuspensionLength int64

		if err := workflow.ExecuteActivity(ctx, a.IssueClubInfractionPostRemoval,
			activities.IssueClubInfractionPostRemovalInput{
				AccountId: input.AccountId,
				ClubId:    input.ClubId,
				RuleId:    input.RuleId,
			},
		).Get(ctx, &clubSuspensionLength); err != nil {
			logger.Error("failed to issue club infraction post removal", "Error", err)
			return err
		}

		if err := workflow.ExecuteActivity(ctx, a.SuspendClub,
			activities.SuspendClubInput{
				ClubId:            input.ClubId,
				Duration:          clubSuspensionLength,
				IsPostRemoval:     true,
				IsModerationQueue: false,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to suspend club", "Error", err)
			return err
		}
	}

	// remove this post
	if err := workflow.ExecuteActivity(ctx, a.RemovePost,
		activities.RemovePostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove post", "Error", err)
		return err
	}

	return nil
}
