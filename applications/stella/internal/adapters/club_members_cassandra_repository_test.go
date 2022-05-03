package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/paging"
	"overdoll/libraries/testing_tools"
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
	principalItem := testing_tools.NewDefaultPrincipal(testAccountId)

	// create a new club for testing
	err := clubRepo.CreateClub(ctx, club.UnmarshalClubFromDatabase(testClubId, testClubId, nil, nil, nil, 0, testAccountId, false, nil))
	require.NoError(t, err, "no error creating a club")

	// add members
	createNewMembers := 6

	// create x new members
	for i := 1; i <= createNewMembers; i++ {

		newAccountId := uuid.New().String()

		newMember :=
			club.UnmarshalMemberFromDatabase(
				newAccountId,
				testClubId,
				time.Now().Add(time.Hour*time.Duration(i)),
				false,
				nil,
			)

		// create the new member
		err = clubRepo.CreateClubMember(ctx, newMember)
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

	require.Len(t, results, 2, "should have found the last 2 club members")
}

func newClubRepository(t *testing.T) adapters.ClubCassandraElasticsearchRepository {
	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	return adapters.NewClubCassandraElasticsearchRepository(session, esClient)
}
