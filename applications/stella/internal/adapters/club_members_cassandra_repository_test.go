package adapters_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestClubCassandraRepository_TestReadPartitions_cursor(t *testing.T) {
	t.Parallel()

	clubRepo := newClubRepository(t)

	ctx := context.Background()

	testAccountId := uuid.New().String()
	testClubId := uuid.New().String()
	principalItem := principal.NewPrincipal(testAccountId, nil, false, false)

	// create a new club for testing
	err := clubRepo.CreateClub(ctx, principalItem, club.UnmarshalClubFromDatabase(testClubId, testClubId, nil, nil, "", 0, testAccountId))
	require.NoError(t, err, "no error creating a club")

	// add members
	createNewMembers := 6

	// create x new members
	for i := 1; i <= createNewMembers; i++ {

		newAccountId := ksuid.New().String()

		newMember :=
			club.UnmarshalMemberFromDatabase(
				newAccountId,
				testClubId,
				time.Now().Add(time.Hour*time.Duration(i)),
			)

		// create the new member
		err = clubRepo.CreateClubMember(ctx, principalItem, newMember)
		require.NoError(t, err, "no error creating a new member")

		// add to list
		err = clubRepo.AddClubMemberToList(ctx, testClubId, newAccountId)
		require.NoError(t, err, "no error adding to list")
	}

	// read from partitions
	firstItems := 5

	emptyCursor, err := paging.NewCursor(nil, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating empty cursor")

	results, err := clubRepo.GetMembersForClub(ctx, principalItem, emptyCursor, testClubId)

	require.NoError(t, err, "no error searching club members")

	// (cursors grab whatever the length was, added 1 to see if there are more items after that cursor)
	require.Len(t, results, 6, "should have found 6 club members")

	// get last cursor
	lastCursor := results[4].Cursor()

	// search after the last member to find the last member
	newCursor, err := paging.NewCursor(&lastCursor, nil, &firstItems, nil)
	require.NoError(t, err, "no error creating new cursor")

	// get the next set of member
	results, err = clubRepo.GetMembersForClub(ctx, principalItem, newCursor, testClubId)
	require.NoError(t, err, "no error searching club members")

	require.Len(t, results, 1, "should have found only the last club member")
}

func newClubRepository(t *testing.T) adapters.ClubCassandraRepository {
	session := bootstrap.InitializeDatabaseSession()
	return adapters.NewClubCassandraRepository(session)
}
