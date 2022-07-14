package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

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
