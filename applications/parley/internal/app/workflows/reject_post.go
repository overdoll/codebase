package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
)

type RejectPostInput struct {
	AccountId string
	PostId    string
	ClubId    string
	RuleId    string
	Notes     *string
}

func RejectPost(ctx workflow.Context, input RejectPostInput) error {

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

	// if infraction, issue a club infraction, suspend the club and discard the post
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
				ClubId:            input.ClubId,
				Duration:          clubSuspensionLength,
				IsPostRemoval:     false,
				IsModerationQueue: true,
			},
		).Get(ctx, nil); err != nil {
			return err
		}

		if err := workflow.ExecuteActivity(ctx, a.DiscardPost,
			activities.DiscardPostInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}

	} else {

		// otherwise, just reject this post
		if err := workflow.ExecuteActivity(ctx, a.RejectPost,
			activities.RejectPostInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}
	}

	if err := workflow.ExecuteActivity(ctx, a.RemovePostFromModeratorQueue,
		activities.RemovePostFromModeratorQueueInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
