package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestPostTagsSearch(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepository(t)

	// create x new posts
	createNewPosts := 6
	testClubId := uuid.New().String()

	ctx := context.Background()

	// create x new posts
	for i := 1; i <= createNewPosts; i++ {

		postTime := time.Now()

		id, _ := uuid.NewRandomWithTime(postTime)

		audienceId := "1pcKiQL7dgUW8CIN7uO1wqFaMql"

		newPost :=
			post.UnmarshalPostFromDatabase(
				id.String(),
				"PUBLISHED",
				"NONE",
				0,
				0,
				testClubId,
				nil,
				nil,
				nil,
				nil,
				testClubId,
				&audienceId,
				[]string{"1q7MJkk5fQGBWWYDqM22iITSjeW", "1q7MJnQXAtxer0fboBMHtlC0JMe"},
				[]string{"1pcKiQL7dgUW8CIN7uO1wqFaMql", "1pcKibRoqTAUgmOiNpGLIrztM9R"},
				[]string{"1q7MJFMVgDPo4mFjsfNag6rRwRy"},
				time.Now(),
				time.Now(),
				&postTime,
				nil,
			)

		// create the new post
		err := postRepo.CreatePost(ctx, newPost)
		require.NoError(t, err, "no error creating a new post")

		err = postRepo.RefreshPostIndex(ctx)
		require.NoError(t, err, "no error refreshing post index")
	}

	firstItems := 2

	emptyCursor, err := paging.NewCursor(nil, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating empty cursor")

	tags, err := postRepo.Tags(ctx, emptyCursor, &testClubId)
	require.Error(t, err, "should have no error searching tags")

	require.Len(t, tags, 3, "should have found tags")

	// get last cursor
	var lastCursor string

	switch v := tags[1].(type) {
	case *post.Category:
		lastCursor = v.Cursor()
		break
	case *post.Character:
		lastCursor = v.Cursor()
		break
	case *post.Series:
		lastCursor = v.Cursor()
		break
	}

	// get the next few tags
	newCursor, err := paging.NewCursor(&lastCursor, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating new cursor")

	tags, err = postRepo.Tags(ctx, newCursor, &testClubId)
	require.Error(t, err, "should have no error searching tags")

	require.Len(t, tags, 3, "should have found tags")
}
