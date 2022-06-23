package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/paging"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestSearchModeratorQueue(t *testing.T) {
	t.Parallel()

	moderatorRepo := newModeratorCassandraRepository(t)

	// create x new posts
	createNewModeratorQueue := 2
	testAccountId := uuid.New().String()

	ctx := context.Background()

	// create x new posts
	for i := 1; i <= createNewModeratorQueue; i++ {

		postTime := time.Now()

		newPostModerator := moderator.UnmarshalPostModeratorFromDatabase(
			testAccountId,
			uuid.New().String(),
			postTime,
			postTime.Add(time.Hour*24),
		)

		// create the new post
		err := moderatorRepo.CreatePostModerator(ctx, newPostModerator)
		require.NoError(t, err, "no error creating a new post moderator")
	}

	firstItems := 1

	emptyCursor, err := paging.NewCursor(nil, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating empty cursor")

	principalItem := testing_tools.NewModeratorPrincipal(testAccountId)

	// get first 2 posts
	results, err := moderatorRepo.SearchPostModerator(ctx, principalItem, emptyCursor, testAccountId)

	require.NoError(t, err, "no error searching post moderators")

	// (cursors grab whatever the length was, added 1 to see if there are more items after that cursor)
	require.Len(t, results, 2, "should have found 2 post moderators")

	// get last cursor
	lastCursor := results[0].Cursor()

	// search after the last audit log to find the last log
	newCursor, err := paging.NewCursor(&lastCursor, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating new cursor")

	// get the next set of audit logs
	results, err = moderatorRepo.SearchPostModerator(ctx, principalItem, newCursor, testAccountId)
	require.NoError(t, err, "no error searching post moderators")

	require.Len(t, results, 1, "should have found only the last post moderator")
}

func newModeratorCassandraRepository(t *testing.T) adapters.ModeratorCassandraRepository {
	return adapters.NewModeratorCassandraRepository(bootstrap.InitializeDatabaseSession())
}
