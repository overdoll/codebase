package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/parley/internal/app/workflows/activities"
	"overdoll/libraries/support"
	"time"
)

type RejectPostInput struct {
	AccountId  string
	PostId     string
	ClubId     string
	RuleId     string
	Notes      *string
	RejectedAt time.Time
}

func RejectPost(ctx workflow.Context, input RejectPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	auditLogId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.CreateRejectedPostAuditLog,
		activities.CreateRejectedPostAuditLogInput{
			Id:         auditLogId,
			AccountId:  input.AccountId,
			PostId:     input.PostId,
			RuleId:     input.RuleId,
			Notes:      input.Notes,
			RejectedAt: input.RejectedAt,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to create rejected post audit log", "Error", err)
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
			logger.Error("failed to issue club infraction", "Error", err)
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
			logger.Error("failed to suspend club", "Error", err)
			return err
		}

		if err := workflow.ExecuteActivity(ctx, a.DiscardPost,
			activities.DiscardPostInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to discard post", "Error", err)
			return err
		}

	} else {
		// otherwise, just reject this post
		if err := workflow.ExecuteActivity(ctx, a.RejectPost,
			activities.RejectPostInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to reject post", "Error", err)
			return err
		}
	}

	if err := workflow.ExecuteActivity(ctx, a.RemovePostFromModeratorQueue,
		activities.RemovePostFromModeratorQueueInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to remove post from moderator queue", "Error", err)
		return err
	}

	return nil
}
