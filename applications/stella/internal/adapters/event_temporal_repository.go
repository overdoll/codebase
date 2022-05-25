package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
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

func (r EventTemporalRepository) SuspendClub(ctx context.Context, requester *principal.Principal, club *club.Club, endTime time.Time, reason string) error {

	if err := club.CanSuspend(requester, endTime); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "SuspendClub_" + club.ID(),
	}

	accId := requester.AccountId()

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.SuspendClub, workflows.SuspendClubInput{
		ClubId:    club.ID(),
		AccountId: &accId,
		Reason:    reason,
		EndTime:   endTime,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) SuspendClubOperator(ctx context.Context, club *club.Club, accountId *string, endTime time.Time, reason string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "SuspendClub_" + club.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.SuspendClub, workflows.SuspendClubInput{
		ClubId:    club.ID(),
		AccountId: accountId,
		Reason:    reason,
		EndTime:   endTime,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CreateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	workflowId := "CreateClub_" + clb.OwnerAccountId()

	// should only have 1 create club workflow running at a time for any account
	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        workflowId,
		// allow duplicates only if it has failed
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CreateClub, workflows.CreateClubInput{
		ClubId:         clb.ID(),
		Slug:           clb.Slug(),
		Name:           clb.Name().TranslateDefault(""),
		OwnerAccountId: clb.OwnerAccountId(),
	}); err != nil {
		return err
	}

	// wait for club to be created
	if err := r.client.GetWorkflow(ctx, workflowId, "").Get(ctx, nil); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) UnSuspendClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	if err := clb.CanUnSuspend(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "UnSuspendClub_" + clb.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnSuspendClub, workflows.UnSuspendClubInput{
		ClubId:    clb.ID(),
		AccountId: requester.AccountId(),
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

func (r EventTemporalRepository) TerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	if err := clb.CanTerminate(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "TerminateClub_" + clb.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.TerminateClub, workflows.TerminateClubInput{
		ClubId:    clb.ID(),
		AccountId: requester.AccountId(),
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) UnTerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	if err := clb.CanUnTerminate(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "UnTerminateClub_" + clb.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnTerminateClub, workflows.UnTerminateClubInput{
		ClubId: clb.ID(),
	}); err != nil {
		return err
	}

	return nil
}
