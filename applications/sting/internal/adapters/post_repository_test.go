package adapters_test

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"sync"
	"testing"
	"time"
)

func TestPostRepository_update_parallel_content(t *testing.T) {
	t.Parallel()

	// for this test, we perform 20 parallel updates on a post's resource content to ensure that everything updated correctly
	workersCount := 20
	workersDone := sync.WaitGroup{}
	workersDone.Add(workersCount)

	repo := newPostRepository(t)

	postId := uuid.New().String()

	var resources []*media.Media
	var resourceIds []string

	for i := 0; i < workersCount; i++ {
		resourceId := uuid.New().String()
		resourceIds = append(resourceIds, resourceId)

		resources = append(resources, media.FromProto(&proto.Media{
			Id: resourceId,
			Link: &proto.MediaLink{
				Id:   postId,
				Type: proto.MediaLinkType_POST_CONTENT,
			},
			State: &proto.MediaState{
				Processed: false,
				Failed:    false,
			},
		}))
	}

	audienceId := "1pcKiQL7dgUW8CIN7uO1wqFaMql"
	newPost :=
		post.UnmarshalPostFromDatabase(
			postId,
			"DRAFT",
			"NONE",
			0,
			uuid.New().String(),
			resourceIds,
			resources,
			nil,
			nil,
			uuid.New().String(),
			&audienceId,
			nil,
			nil,
			nil,
			time.Now(),
			time.Now(),
			nil,
			nil,
		)

	err := repo.CreatePost(context.Background(), newPost)
	require.NoError(t, err, "no error creating post")

	// closing startWorkers will unblock all workers at once,
	// thanks to that it will be more likely to have race condition
	startWorkers := make(chan struct{})
	// if post was successfully updated, send to this channel
	postsUpdated := make(chan int, workersCount)

	ctx := context.Background()

	// we are trying to do race condition, in practice only one worker should be able to finish transaction
	for worker := 0; worker < workersCount; worker++ {
		workerNum := worker

		go func() {
			defer workersDone.Done()
			<-startWorkers

			medias := []*media.Media{
				media.FromProto(&proto.Media{
					Id: resourceIds[workerNum],
					Link: &proto.MediaLink{
						Id:   postId,
						Type: proto.MediaLinkType_POST_CONTENT,
					},
					State: &proto.MediaState{
						Processed: true,
						Failed:    false,
					},
				}),
			}

			_, err := repo.UpdatePostContentOperatorMedia(ctx, postId, medias)

			if err == nil {
				// user is only created when an error is not returned
				postsUpdated <- workerNum
			} else {
				zap.S().Errorw("failed to update post content", zap.Error(err))
			}
		}()
	}

	close(startWorkers)

	// we are waiting, when all workers did the job
	workersDone.Wait()
	close(postsUpdated)

	var workersUpdatedPosts []int

	for workerNum := range postsUpdated {
		workersUpdatedPosts = append(workersUpdatedPosts, workerNum)
	}

	assert.Len(t, workersUpdatedPosts, 20, "should have completed all 20 updates successfully")

	pst, err := repo.GetPostByIdOperator(context.Background(), postId)
	require.NoError(t, err, "no error getting post by id")

	// ensure all resources are now "processed"
	for _, res := range pst.Content() {
		require.True(t, res.Media().IsProcessed(), "resource should be processed")
	}
}

func TestPostRepository_failure(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepositoryWithESFailure(t)

	postId := uuid.New().String()

	audienceId := "1pcKiQL7dgUW8CIN7uO1wqFaMql"
	newPost :=
		post.UnmarshalPostFromDatabase(
			postId,
			"DRAFT",
			"NONE",
			0,
			uuid.New().String(),
			nil,
			nil,
			nil,
			nil,
			uuid.New().String(),
			&audienceId,
			nil,
			nil,
			nil,
			time.Now(),
			time.Now(),
			nil,
			nil,
		)

	ctx := context.Background()

	requester := testing_tools.NewStaffPrincipal(uuid.New().String())

	err := postRepo.CreatePost(ctx, newPost)
	require.Error(t, err, "should have received an error while creating the post")

	_, err = postRepo.GetPostById(ctx, requester, postId)
	require.True(t, apperror.IsNotFoundError(err), "post should not have been found")
}
