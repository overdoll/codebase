package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
	"time"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) PublishPost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.PublishPost_" + postId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.PublishPost, workflows.PublishPostInput{
		PostId: postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to run publish post workflow")
	}

	return nil
}

func (r EventTemporalRepository) DiscardPost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.DiscardPost_" + postId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DiscardPost, workflows.DiscardPostInput{
		PostId: postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute discard post workflow")
	}

	return nil
}

func (r EventTemporalRepository) DeletePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanDelete(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.DeletePost_" + pst.ID(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeletePost, workflows.DeletePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute delete post workflow")
	}

	return nil
}

func (r EventTemporalRepository) ArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanArchive(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.ArchivePost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ArchivePost, workflows.ArchivePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute archive post workflow")
	}

	return nil
}

func (r EventTemporalRepository) UnArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error {

	if err := pst.CanUnArchive(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.UnArchivePost_" + pst.ID(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnArchivePost, workflows.UnArchivePostInput{
		PostId: pst.ID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute un archive post workflow")
	}

	return nil
}

func (r EventTemporalRepository) RemovePost(ctx context.Context, postId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.RemovePost_" + postId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePost, workflows.RemovePostInput{
		PostId: postId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute remove post workflow")
	}

	return nil
}

func (r EventTemporalRepository) SubmitPost(ctx context.Context, requester *principal.Principal, pst *post.Post, submitTime time.Time) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "sting.SubmitPost_" + pst.ID(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.SubmitPost, workflows.SubmitPostInput{
		PostId:   pst.ID(),
		PostDate: submitTime,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute submit post workflow")
	}

	return nil
}

func (r EventTemporalRepository) AddPostLike(ctx context.Context, like *post.Like) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.AddPostLike_" + like.PostId() + "_" + like.AccountId(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddPostLike, workflows.AddPostLikeInput{
		PostId:    like.PostId(),
		AccountId: like.AccountId(),
		LikedAt:   like.LikedAt(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute add post like workflow")
	}

	return nil
}

func (r EventTemporalRepository) RemovePostLike(ctx context.Context, like *post.Like) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.RemovePostLike_" + like.PostId() + "_" + like.AccountId(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemovePostLike, workflows.RemovePostLikeInput{
		PostId:    like.PostId(),
		AccountId: like.AccountId(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute remove post like workflow")
	}

	return nil
}

func (r EventTemporalRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.DeleteAccountData_" + accountId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeleteAccountData, workflows.DeleteAccountDataInput{
		AccountId: accountId,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute delete account data workflow")
	}

	return nil
}

func (r EventTemporalRepository) AddClubMember(ctx context.Context, member *club.Member) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.AddClubMember_" + member.ClubId() + "_" + member.AccountId(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddClubMember, workflows.AddClubMemberInput{
		ClubId:    member.ClubId(),
		AccountId: member.AccountId(),
		JoinedAt:  member.JoinedAt(),
	}); err != nil {
		return errors.Wrap(err, "failed to execute AddClubMember workflow")
	}

	return nil
}

func (r EventTemporalRepository) RemoveClubMember(ctx context.Context, member *club.Member) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.RemoveClubMember_" + member.ClubId() + "_" + member.AccountId(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemoveClubMember, workflows.RemoveClubMemberInput{
		ClubId:    member.ClubId(),
		AccountId: member.AccountId(),
	}); err != nil {
		return errors.Wrap(err, "failed to execute RemoveClubMember workflow")
	}

	return nil
}

func (r EventTemporalRepository) AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.AddClubSupporter_" + clubId + "_" + accountId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.AddClubSupporter, workflows.AddClubSupporterInput{
		ClubId:      clubId,
		AccountId:   accountId,
		SupportedAt: supportedAt,
	}); err != nil {
		return errors.Wrap(err, "failed to execute AddClubSupporter workflow")
	}

	return nil
}

func (r EventTemporalRepository) RemoveClubSupporter(ctx context.Context, clubId, accountId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.RemoveClubSupporter_" + clubId + "_" + accountId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.RemoveClubSupporter, workflows.RemoveClubSupporterInput{
		ClubId:    clubId,
		AccountId: accountId,
	}); err != nil {
		return errors.Wrap(err, "failed to execute RemoveClubSupporter workflow")
	}

	return nil
}

func (r EventTemporalRepository) SuspendClub(ctx context.Context, requester *principal.Principal, club *club.Club, endTime time.Time, reason string) error {

	if err := club.CanSuspend(requester, endTime); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.SuspendClub_" + club.ID(),
	}

	accId := requester.AccountId()

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.SuspendClub, workflows.SuspendClubInput{
		ClubId:    club.ID(),
		AccountId: &accId,
		Reason:    reason,
		EndTime:   endTime,
	}); err != nil {
		return errors.Wrap(err, "failed to execute SuspendClub workflow")
	}

	return nil
}

func (r EventTemporalRepository) SuspendClubOperator(ctx context.Context, club *club.Club, accountId *string, endTime time.Time, reason string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.SuspendClub_" + club.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.SuspendClub, workflows.SuspendClubInput{
		ClubId:    club.ID(),
		AccountId: accountId,
		Reason:    reason,
		EndTime:   endTime,
	}); err != nil {
		return errors.Wrap(err, "failed to execute SuspendClubOperator workflow")
	}

	return nil
}

func (r EventTemporalRepository) WaitForClubToBeReady(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	workflowId := "sting.CreateClub_" + clb.OwnerAccountId()

	// wait for club to be created
	if err := r.client.GetWorkflow(ctx, workflowId, "").Get(ctx, nil); err != nil {
		return errors.Wrap(err, "failed to get workflow WaitForClubToBeReady %s", workflowId)
	}

	return nil
}

func (r EventTemporalRepository) CreateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	workflowId := "sting.CreateClub_" + clb.OwnerAccountId()

	// should only have 1 create club workflow running at a time for any account
	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        workflowId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CreateClub, workflows.CreateClubInput{
		ClubId:         clb.ID(),
		Slug:           clb.Slug(),
		Name:           clb.Name().TranslateDefault(""),
		OwnerAccountId: clb.OwnerAccountId(),
	}); err != nil {
		return errors.Wrap(err, "failed to execute CreateClub workflow")
	}

	return nil
}

func (r EventTemporalRepository) UnSuspendClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	if err := clb.CanUnSuspend(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.UnSuspendClub_" + clb.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnSuspendClub, workflows.UnSuspendClubInput{
		ClubId:    clb.ID(),
		AccountId: requester.AccountId(),
	}); err != nil {
		return errors.Wrap(err, "failed to execute UnSuspendClub workflow")
	}

	return nil
}

func (r EventTemporalRepository) NewSupporterPost(ctx context.Context, clubId string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.NewSupporterPost_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.NewSupporterPost, workflows.NewSupporterPostInput{
		ClubId: clubId,
	}); err != nil {
		return errors.Wrap(err, "failed to execute NewSupporterPost workflow")
	}

	return nil
}

func (r EventTemporalRepository) TerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	if err := clb.CanTerminate(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.TerminateClub_" + clb.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.TerminateClub, workflows.TerminateClubInput{
		ClubId:    clb.ID(),
		AccountId: requester.AccountId(),
	}); err != nil {
		return errors.Wrap(err, "failed to execute TerminateClub workflow")
	}

	return nil
}

func (r EventTemporalRepository) UnTerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error {

	if err := clb.CanUnTerminate(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "sting.UnTerminateClub_" + clb.ID(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.UnTerminateClub, workflows.UnTerminateClubInput{
		ClubId: clb.ID(),
	}); err != nil {
		return errors.Wrap(err, "failed to execute UnTerminateClub workflow")
	}

	return nil
}
