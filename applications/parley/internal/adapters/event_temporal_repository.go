package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
	"overdoll/applications/parley/internal/app/workflows"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) PutPostIntoModeratorQueue(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "PutPostIntoModeratorQueue_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.PutPostIntoModeratorQueue, workflows.PutPostIntoModeratorQueueInput{
		PostId: postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute put post into moderation queue workflow")
	}

	return nil
}

func (r EventTemporalRepository) ReportPost(ctx context.Context, report *report.PostReport) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "ReportPost_" + report.PostId() + "_" + report.ReportingAccountId(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ReportPost, workflows.ReportPostInput{
		AccountId: report.ReportingAccountId(),
		PostId:    report.PostId(),
		RuleId:    report.RuleId(),
		CreatedAt: report.CreatedAt(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute report post workflow")
	}

	return nil
}

func (r EventTemporalRepository) IssueClubInfraction(ctx context.Context, requester *principal.Principal, clubId string, rule *rule.Rule) error {

	if err := club_infraction.CanIssueInfraction(requester, rule); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "IssueClubInfraction_" + clubId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.IssueClubInfraction, workflows.IssueClubInfractionInput{
		AccountId: requester.AccountId(),
		ClubId:    clubId,
		RuleId:    rule.ID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute issue club infraction workflow")
	}

	return nil
}

func (r EventTemporalRepository) RejectPost(ctx context.Context, requester *principal.Principal, moderator *moderator.PostModerator, clubId, postId string, rule *rule.Rule, notes *string) error {

	if err := moderator.CanRejectPost(requester, rule); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RejectPost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RejectPost, workflows.RejectPostInput{
		AccountId: requester.AccountId(),
		PostId:    postId,
		ClubId:    clubId,
		RuleId:    rule.ID(),
		Notes:     notes,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute reject post workflow")
	}

	return nil
}

func (r EventTemporalRepository) RemovePost(ctx context.Context, requester *principal.Principal, clubId, postId string, rule *rule.Rule, notes *string) error {

	if err := post_audit_log.CanRemovePost(requester, rule); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemovePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePost, workflows.RemovePostInput{
		AccountId: requester.AccountId(),
		PostId:    postId,
		RuleId:    rule.ID(),
		ClubId:    clubId,
		Notes:     notes,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute remove post workflow")
	}

	return nil
}

func (r EventTemporalRepository) ApprovePost(ctx context.Context, requester *principal.Principal, moderator *moderator.PostModerator, postId string) error {

	if err := moderator.CanApprovePost(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ApprovePost_" + postId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ApprovePost, workflows.ApprovePostInput{
		AccountId: requester.AccountId(),
		PostId:    postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute approve post workflow")
	}

	return nil
}
