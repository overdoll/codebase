package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) AddClubMember(ctx context.Context, member *club.Member) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "AddClubMember_" + member.ClubId() + "_" + member.AccountId(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddClubMember, workflows.AddClubMemberInput{
		ClubId:    member.ClubId(),
		AccountId: member.AccountId(),
		JoinedAt:  member.JoinedAt(),
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemoveClubMember(ctx context.Context, member *club.Member) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemoveClubMember_" + member.ClubId() + "_" + member.AccountId(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemoveClubMember, workflows.RemoveClubMemberInput{
		ClubId:    member.ClubId(),
		AccountId: member.AccountId(),
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "AddClubSupporter_" + clubId + "_" + accountId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddClubSupporter, workflows.AddClubSupporterInput{
		ClubId:      clubId,
		AccountId:   accountId,
		SupportedAt: supportedAt,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) RemoveClubSupporter(ctx context.Context, clubId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RemoveClubSupporter_" + clubId + "_" + accountId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemoveClubSupporter, workflows.RemoveClubSupporterInput{
		ClubId:    clubId,
		AccountId: accountId,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) SuspendClub(ctx context.Context, clubId string, accountId *string, endTime time.Time, reason string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "SuspendClub_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.SuspendClub, workflows.SuspendClubInput{
		ClubId:    clubId,
		AccountId: accountId,
		Reason:    reason,
		EndTime:   endTime,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) UnSuspendClub(ctx context.Context, clubId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "UnSuspendClub_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnSuspendClub, workflows.UnSuspendClubInput{
		ClubId:    clubId,
		AccountId: accountId,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) NewSupporterPost(ctx context.Context, clubId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewSupporterPost_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.NewSupporterPost, workflows.NewSupporterPostInput{
		ClubId: clubId,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) TerminateClub(ctx context.Context, clubId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "TerminateClub_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.TerminateClub, workflows.TerminateClubInput{
		ClubId:    clubId,
		AccountId: accountId,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) UnTerminateClub(ctx context.Context, clubId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "UnTerminateClub_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnTerminateClub, workflows.UnTerminateClubInput{
		ClubId: clubId,
	}); err != nil {
		return err
	}

	return nil
}
