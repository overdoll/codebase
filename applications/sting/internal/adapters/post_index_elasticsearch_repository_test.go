package adapters_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"sort"
	"testing"
	"time"

	"overdoll/libraries/bootstrap"
)

func TestPostsIndexElasticSearchRepository_SearchPosts_cursor(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepository(t)
	postIndexRepo := newPostIndexRepository(t)

	// create x new posts
	createNewPosts := 6
	testClubId := uuid.New().String()
	testAccountId := uuid.New().String()

	ctx := context.Background()

	// create x new posts
	for i := 1; i <= createNewPosts; i++ {

		postTime := time.Now()

		id, _ := ksuid.NewRandomWithTime(postTime)

		newPost :=
			post.UnmarshalPostFromDatabase(
				id.String(),
				"published",
				0,
				&testClubId,
				testAccountId,
				nil,
				testClubId,
				post.UnmarshalAudienceFromDatabase(
					uuid.New().String(),
					"test",
					nil,
					"",
					0,
					0,
					0,
				),
				nil,
				nil,
				time.Now(),
				&postTime,
				&postTime,
			)

		// create the new post
		err := postRepo.CreatePost(ctx, newPost)
		require.NoError(t, err, "no error creating a new post")

		// index the post
		err = postIndexRepo.IndexPost(ctx, newPost)
		require.NoError(t, err, "no error indexing the post")

		err = postIndexRepo.RefreshPostIndex(ctx)
		require.NoError(t, err, "no error refreshing post index")
	}

	firstItems := 5

	emptyCursor, err := paging.NewCursor(nil, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating empty cursor")

	state := "published"

	// filters so we don't get conflicts
	filters, err := post.NewPostFilters(
		"new",
		&state,
		nil,
		nil,
		[]string{testClubId},
		nil,
		nil,
		nil,
		nil,
	)

	require.NoError(t, err, "no error creating empty filters")

	principalItem := principal.NewPrincipal(testAccountId, nil, false, false)

	// get first 5 posts
	results, err := postIndexRepo.SearchPosts(ctx, principalItem, emptyCursor, filters)

	require.NoError(t, err, "no error searching posts")

	// (cursors grab whatever the length was, added 1 to see if there are more items after that cursor)
	require.Len(t, results, 6, "should have found 6 posts")

	var orderedPostsCursors []string

	// get all the posts, ordered
	// we use this later to make sure the list is reversed
	for _, p := range results {
		orderedPostsCursors = append(orderedPostsCursors, p.Cursor())
	}

	// get last cursor
	lastCursor := results[4].Cursor()

	// search after the last post to find the last post
	newCursor, err := paging.NewCursor(&lastCursor, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating new cursor")

	// get the next set of posts
	results, err = postIndexRepo.SearchPosts(ctx, principalItem, newCursor, filters)
	require.NoError(t, err, "no error searching posts")

	require.Len(t, results, 1, "should have found only the last post")

	// now, do backwards pagination
	backwardsCursor, err := paging.NewCursor(nil, nil, nil, &firstItems)
	require.NoError(t, err, "no error creating backwards cursor")

	results, err = postIndexRepo.SearchPosts(ctx, principalItem, backwardsCursor, filters)
	require.NoError(t, err, "no error searching posts")

	require.Len(t, results, 6, "should have found 6 posts")

	// reverse list
	sort.Sort(sort.Reverse(sort.StringSlice(orderedPostsCursors)))

	var newOrderedPostsCursors []string

	for _, p := range results {
		newOrderedPostsCursors = append(newOrderedPostsCursors, p.Cursor())
	}

	// go through list and see that it's backwards now
	// 	require.Equal(t, newOrderedPostsCursors, orderedPostsCursors, "expected the list to be in reverse order")

	// get last cursor
	lastCursor = results[4].Cursor()

	// get last post
	backwardsCursorWithCursor, err := paging.NewCursor(nil, &lastCursor, nil, &firstItems)
	require.NoError(t, err, "no error creating backwards cursor")

	results, err = postIndexRepo.SearchPosts(ctx, principalItem, backwardsCursorWithCursor, filters)
	require.NoError(t, err, "no error searching posts")

	require.Len(t, results, 1, "should have found only the last post")
}

func newPostIndexRepository(t *testing.T) adapters.PostsIndexElasticSearchRepository {
	session := bootstrap.InitializeDatabaseSession()
	client := bootstrap.InitializeElasticSearchSession()

	return adapters.NewPostsIndexElasticSearchRepository(client, session)
}

func newPostRepository(t *testing.T) adapters.PostsCassandraRepository {
	session := bootstrap.InitializeDatabaseSession()

	return adapters.NewPostsCassandraRepository(session)
}
