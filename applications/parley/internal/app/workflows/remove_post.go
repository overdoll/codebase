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

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.CreateRejectedPostAuditLog,
		activities.CreateRejectedPostAuditLogInput{
			AccountId: input.AccountId,
			PostId:    input.PostId,
			RuleId:    input.RuleId,
			Notes:     input.Notes,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	var rule *activities.GetRuleDetailsPayload

	// get rule details
	if err := workflow.ExecuteActivity(ctx, a.GetRuleDetails,
		activities.GetRuleDetailsInput{
			RuleId: input.RuleId,
		},
	).Get(ctx, &rule); err != nil {
		return err
	}

	if rule.IsInfraction {

		var clubSuspensionLength int64

		if err := workflow.ExecuteActivity(ctx, a.IssueClubInfractionPostModeration,
			activities.IssueClubInfractionPostModerationInput{
				AccountId: input.AccountId,
				ClubId:    input.ClubId,
				RuleId:    input.RuleId,
			},
		).Get(ctx, &clubSuspensionLength); err != nil {
			return err
		}

		if err := workflow.ExecuteActivity(ctx, a.SuspendClub,
			activities.SuspendClubInput{
				ClubId:   input.ClubId,
				Duration: clubSuspensionLength,
			},
		).Get(ctx, &clubSuspensionLength); err != nil {
			return err
		}
	}

	// remove this post
	if err := workflow.ExecuteActivity(ctx, a.RemovePost,
		activities.RemovePostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
