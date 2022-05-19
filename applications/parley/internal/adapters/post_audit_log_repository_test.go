package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/paging"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"sort"
	"testing"
	"time"
)

func TestPostAuditLog_Search_cursor(t *testing.T) {
	t.Parallel()

	auditLogRepo := newPostAuditLogRepository(t)

	// create x new posts
	createNewAuditLogs := 6
	testAccountId := uuid.New().String()

	ctx := context.Background()

	// create x new posts
	for i := 1; i <= createNewAuditLogs; i++ {

		postTime := time.Now()

		id, _ := uuid.NewRandomWithTime(postTime)

		newAuditLog := post_audit_log.UnmarshalPostAuditLogFromDatabase(
			id.String(),
			uuid.New().String(),
			testAccountId,
			"APPROVED",
			nil,
			nil,
		)

		// create the new post
		err := auditLogRepo.CreatePostAuditLog(ctx, newAuditLog)
		require.NoError(t, err, "no error creating a new audit log")
	}

	firstItems := 5

	emptyCursor, err := paging.NewCursor(nil, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating empty cursor")

	now := time.Now()

	// filters so we don't get conflicts
	filters, err := post_audit_log.NewPostAuditLogFilters(&testAccountId, nil, &now, nil)
	require.NoError(t, err, "no error creating empty filters")

	principalItem := testing_tools.NewModeratorPrincipal(testAccountId)

	// get first 5 posts
	results, err := auditLogRepo.SearchPostAuditLogs(ctx, principalItem, emptyCursor, filters)

	require.NoError(t, err, "no error searching post audit logs")

	// (cursors grab whatever the length was, added 1 to see if there are more items after that cursor)
	require.Len(t, results, 6, "should have found 6 audit logs")

	var orderedAuditLogsCursors []string

	// get all the posts, ordered
	// we use this later to make sure the list is reversed
	for _, p := range results {
		orderedAuditLogsCursors = append(orderedAuditLogsCursors, p.Cursor())
	}

	// get last cursor
	lastCursor := results[4].Cursor()

	// search after the last audit log to find the last log
	newCursor, err := paging.NewCursor(&lastCursor, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating new cursor")

	// get the next set of audit logs
	results, err = auditLogRepo.SearchPostAuditLogs(ctx, principalItem, newCursor, filters)
	require.NoError(t, err, "no error searching audit logs")

	require.Len(t, results, 1, "should have found only the last audit log")

	// now, do backwards pagination
	backwardsCursor, err := paging.NewCursor(nil, nil, nil, &firstItems)
	require.NoError(t, err, "no error creating backwards cursor")

	results, err = auditLogRepo.SearchPostAuditLogs(ctx, principalItem, backwardsCursor, filters)
	require.NoError(t, err, "no error searching posts")

	require.Len(t, results, 6, "should have found 6 posts")

	// reverse list
	sort.Sort(sort.Reverse(sort.StringSlice(orderedAuditLogsCursors)))

	var newOrderedPostsCursors []string

	for _, p := range results {
		newOrderedPostsCursors = append(newOrderedPostsCursors, p.Cursor())
	}

	// go through list and see that it's backwards now
	//require.Equal(t, newOrderedPostsCursors, orderedAuditLogsCursors, "expected the list to be in reverse order")

	// get last cursor
	lastCursor = results[4].Cursor()

	// get last post
	backwardsCursorWithCursor, err := paging.NewCursor(nil, &lastCursor, nil, &firstItems)
	require.NoError(t, err, "no error creating backwards cursor")

	results, err = auditLogRepo.SearchPostAuditLogs(ctx, principalItem, backwardsCursorWithCursor, filters)
	require.NoError(t, err, "no error searching audit logs")

	require.Len(t, results, 1, "should have found only the last audit log")
}

func newPostAuditLogRepository(t *testing.T) adapters.PostAuditLogCassandraRepository {
	return adapters.NewPostAuditLogCassandraRepository(bootstrap.InitializeDatabaseSession())
}
