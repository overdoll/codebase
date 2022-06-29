package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"math/rand"
	"overdoll/applications/sting/internal/app/workflows/activities"
	"time"
)

type PublishPostInput struct {
	PostId string
}

func PublishPost(ctx workflow.Context, input PublishPostInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.UpdatePostContentResourcePrivacy,
		activities.UpdatePostContentResourcePrivacyInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update post content resource privacy", "Error", err)
		return err
	}

	if err := workflow.ExecuteActivity(ctx, a.PublishPost,
		activities.PublishPostInput{
			PostId: input.PostId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to publish post", "Error", err)
		return err
	}

	// spawn a child workflow asynchronously to count the total posts
	// will also ensure we only have 1 of this workflow running at any time
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:        "sting.UpdatePostTagsTotalPostsCount_" + input.PostId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	}

	childCtx := workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(childCtx, UpdateTotalPostsForPostTags,
		UpdateTotalPostsForPostTagsInput{
			PostId: input.PostId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		logger.Error("failed to update total posts for post tags", "Error", err)
		return err
	}

	var payload *activities.CheckPostSupporterStatusAndSendNewPayload

	// if the post has supporter-only content, we update the club that we have created a new supporter only post
	if err := workflow.ExecuteActivity(ctx, a.CheckPostSupporterStatusAndSendNew,
		activities.CheckPostSupporterStatusAndSendNewInput{
			PostId: input.PostId,
		},
	).Get(ctx, &payload); err != nil {
		logger.Error("failed to check post supporter status and send new", "Error", err)
		return err
	}

	// if post was a supporter post, then we do this
	if payload.IsSupporter {
		childWorkflowOptions = workflow.ChildWorkflowOptions{
			WorkflowID:        "sting.NewSupporterPost_" + payload.ClubId,
			ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
		}

		childCtx = workflow.WithChildOptions(ctx, childWorkflowOptions)

		if err := workflow.ExecuteChildWorkflow(childCtx, NewSupporterPost, NewSupporterPostInput{
			ClubId: payload.ClubId,
		}).
			GetChildWorkflowExecution().
			Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			logger.Error("failed to create new supporter post", "Error", err)
			return err
		}
	}

	if !payload.ClubHasBanner {
		if err := workflow.ExecuteActivity(ctx, a.UpdateClubBanner,
			activities.UpdateClubBannerInput{
				PostId: input.PostId,
			},
		).Get(ctx, nil); err != nil {
			logger.Error("failed to update club banner", "Error", err)
			return err
		}
	}

	var tagsPayload *activities.GetTagsWithoutBannerForPostPayload

	if err := workflow.ExecuteActivity(ctx, a.GetTagsWithoutBannerForPost,
		activities.GetTagsWithoutBannerForPostInput{
			PostId: input.PostId,
		},
	).Get(ctx, &tagsPayload); err != nil {
		logger.Error("failed to get tags without banner", "Error", err)
		return err
	}

	for _, categoryId := range tagsPayload.CategoryIds {
		if err := workflow.ExecuteChildWorkflow(
			workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
				WorkflowID:        "sting.GenerateCategoryBanner_" + categoryId,
				ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
			}),
			GenerateCategoryBanner,
			GenerateCategoryBannerInput{
				CategoryId: categoryId,
				WaitPeriod: randomTimePeriod(),
			}).
			GetChildWorkflowExecution().
			Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			logger.Error("failed to update category banner", "Error", err)
			return err
		}
	}

	for _, characterId := range tagsPayload.CharacterIds {
		if err := workflow.ExecuteChildWorkflow(
			workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
				WorkflowID:        "sting.GenerateCharacterBanner_" + characterId,
				ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
			}),
			GenerateCharacterBanner,
			GenerateCharacterBannerInput{
				CharacterId: characterId,
				WaitPeriod:  randomTimePeriod(),
			}).
			GetChildWorkflowExecution().
			Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			logger.Error("failed to update character banner", "Error", err)
			return err
		}
	}

	for _, seriesId := range tagsPayload.SeriesIds {
		if err := workflow.ExecuteChildWorkflow(
			workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
				WorkflowID:        "sting.GenerateSeriesBanner_" + seriesId,
				ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
			}),
			GenerateSeriesBanner,
			GenerateSeriesBannerInput{
				SeriesId:   seriesId,
				WaitPeriod: randomTimePeriod(),
			}).
			GetChildWorkflowExecution().
			Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			logger.Error("failed to update series banner", "Error", err)
			return err
		}
	}

	for _, audienceId := range tagsPayload.AudienceIds {
		if err := workflow.ExecuteChildWorkflow(
			workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
				WorkflowID:        "sting.GenerateAudienceBanner_" + audienceId,
				ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
			}),
			GenerateAudienceBanner,
			GenerateAudienceBannerInput{
				AudienceId: audienceId,
				WaitPeriod: randomTimePeriod(),
			}).
			GetChildWorkflowExecution().
			Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
			logger.Error("failed to update audience banner", "Error", err)
			return err
		}
	}

	return nil
}

func randomTimePeriod() time.Duration {
	return time.Duration(rand.Intn(10-7)+7)*time.Hour*24 + time.Duration(rand.Intn(10-7)+7)*time.Hour
}
