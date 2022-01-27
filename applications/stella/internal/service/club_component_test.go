package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/segmentio/ksuid"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/ports/graphql/types"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/graphql/relay"
	"testing"
	"time"
)

type ClubModified struct {
	ID          string
	Reference   string
	Slug        string
	Name        string
	SlugAliases []struct {
		Slug string
	}
	Thumbnail *struct {
		ID relay.ID
	}
	SlugAliasesLimit int
	Suspension       *types.ClubSuspension
}

type Club struct {
	Club *ClubModified `graphql:"club(slug: $slug)"`
}

func getClub(t *testing.T, client *graphql.Client, id string) Club {

	var club Club

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err)

	return club
}

type AccountClubs struct {
	Entities []struct {
		Account struct {
			ID         string
			ClubsLimit int
			ClubsCount int
			Clubs      *struct {
				Edges []*struct {
					Node struct {
						ID    string
						Owner struct {
							ID string
						}
					}
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}
type _Any map[string]interface{}

type CreateClub struct {
	CreateClub *struct {
		Club *ClubModified
	} `graphql:"createClub(input: $input)"`
}

func TestCreateClub_and_check_permission(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var createClub CreateClub

	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err)

	err = client.Mutate(context.Background(), &createClub, map[string]interface{}{
		"input": types.CreateClubInput{
			Slug: fake.Slug,
			Name: fake.Name,
		},
	})

	require.NoError(t, err)

	newClb := getClub(t, client, fake.Slug)
	require.Equal(t, newClb.Club.Slug, fake.Slug, "should see club with correct slug")

	// refresh index or else we don't see it
	refreshClubESIndex(t)

	grpcClient := getGrpcClient(t)

	// check permissions
	res, err := grpcClient.CanAccountCreatePostUnderClub(context.Background(), &stella.CanAccountCreatePostUnderClubRequest{
		ClubId:    newClb.Club.Reference,
		AccountId: testingAccountId,
	})

	require.NoError(t, err, "no error checking permission")
	require.True(t, res.Allowed, "should be allowed")

	_, err = grpcClient.GetClubById(context.Background(), &stella.GetClubByIdRequest{
		ClubId: newClb.Club.Reference,
	})
	require.NoError(t, err, "no error getting club")

	var accountClubs AccountClubs
	err = client.Query(context.Background(), &accountClubs, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(testingAccountId),
			},
		},
	})

	require.NoError(t, err)
	require.Equal(t, 1, len(accountClubs.Entities[0].Account.Clubs.Edges), "should have 1 club")
	require.Equal(t, 1, accountClubs.Entities[0].Account.ClubsCount, "should have 1 count")
	require.Equal(t, 3, accountClubs.Entities[0].Account.ClubsLimit, "should have 3 limit")
}

type AddClubSlugAlias struct {
	AddClubSlugAlias *struct {
		Club *ClubModified
	} `graphql:"addClubSlugAlias(input: $input)"`
}

type PromoteClubSlugAliasToDefault struct {
	PromoteClubSlugAliasToDefault *struct {
		Club *ClubModified
	} `graphql:"promoteClubSlugAliasToDefault(input: $input)"`
}

type RemoveClubSlugAlias struct {
	RemoveClubSlugAlias *struct {
		Club *ClubModified
	} `graphql:"removeClubSlugAlias(input: $input)"`
}

// TestCreatClub_and_edit_slugs - create a club and edit its slugs
func TestCreateClub_edit_slugs(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	oldSlug := clb.Slug()

	// create a test slug we can use
	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake data for club")

	newSlug := fake.Slug

	// add the alias
	var addClubSlugAlias AddClubSlugAlias
	err = client.Mutate(context.Background(), &addClubSlugAlias, map[string]interface{}{
		"input": types.AddClubSlugAliasInput{
			ID:   relayId,
			Slug: newSlug,
		},
	})
	require.NoError(t, err, "no error adding slug")

	updatedClb := getClub(t, client, newSlug)
	require.NotNil(t, updatedClb.Club, "can find club using new slug")

	foundNewAlias := false
	for _, alias := range updatedClb.Club.SlugAliases {
		if alias.Slug == newSlug {
			foundNewAlias = true
		}
	}
	require.True(t, foundNewAlias, "found alias in list")

	// promote the slug to primary
	var promoteClubSlugAliasToDefault PromoteClubSlugAliasToDefault
	err = client.Mutate(context.Background(), &promoteClubSlugAliasToDefault, map[string]interface{}{
		"input": types.PromoteClubSlugAliasToDefaultInput{
			ID:   relayId,
			Slug: newSlug,
		},
	})
	require.NoError(t, err, "no error promoting slug to primary")

	// should be new slug
	updatedClb = getClub(t, client, newSlug)
	require.Equal(t, newSlug, updatedClb.Club.Slug)

	// find old slug in list
	foundOldAlias := false
	for _, alias := range updatedClb.Club.SlugAliases {
		if alias.Slug == oldSlug {
			foundOldAlias = true
		}
	}
	require.True(t, foundOldAlias, "found old alias in list")

	// should be able to find club with old slug
	updatedClb = getClub(t, client, oldSlug)
	require.NotNil(t, updatedClb.Club, "can find club using old slug")

	// promote the slug to primary
	var removeClubSlugAlias RemoveClubSlugAlias
	err = client.Mutate(context.Background(), &removeClubSlugAlias, map[string]interface{}{
		"input": types.RemoveClubSlugAliasInput{
			ID:   relayId,
			Slug: oldSlug,
		},
	})
	require.NoError(t, err, "no error removing old slug")

	// make sure you cannot find club using that slug anymore
	updatedClb = getClub(t, client, oldSlug)
	require.Nil(t, updatedClb.Club, "cannot find club after removing slug")

	// make sure it doesn't exist in the list
	updatedClb = getClub(t, client, newSlug)

	require.Len(t, updatedClb.Club.SlugAliases, 0, "alias list should be 0 now")
}

type UpdateClubName struct {
	UpdateClubName *struct {
		Club *ClubModified
	} `graphql:"updateClubName(input: $input)"`
}

// TestCreateClub_edit_name - create a club and edit the name
func TestCreateClub_edit_name(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	// create a test name
	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake data for club")

	newName := fake.Name

	var updateClubName UpdateClubName
	err = client.Mutate(context.Background(), &updateClubName, map[string]interface{}{
		"input": types.UpdateClubNameInput{
			ID:   relayId,
			Name: newName,
		},
	})
	require.NoError(t, err, "no error updating name")

	// make sure name is updated
	updatedClb := getClub(t, client, clb.Slug())
	require.Equal(t, newName, updatedClb.Club.Name)
}

type UpdateClubThumbnail struct {
	UpdateClubName *struct {
		Club *ClubModified
	} `graphql:"updateClubThumbnail(input: $input)"`
}

// TestCreateClub_edit_thumbnail - create a club and edit the thumbnail
func TestCreateClub_edit_thumbnail(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	thumbnailId := "test-thumbnail"

	var updateClubThumbnail UpdateClubThumbnail
	err := client.Mutate(context.Background(), &updateClubThumbnail, map[string]interface{}{
		"input": types.UpdateClubThumbnailInput{
			ID:        relayId,
			Thumbnail: thumbnailId,
		},
	})

	require.NoError(t, err, "no error updating thumbnail")

	// make sure thumbnail is set
	updatedClb := getClub(t, client, clb.Slug())
	require.NotNil(t, updatedClb.Club.Thumbnail, "thumbnail is not nil")
}

type SuspendClub struct {
	SuspendClub *struct {
		Club *ClubModified
	} `graphql:"suspendClub(input: $input)"`
}

type UnSuspendClub struct {
	UnSuspendClub *struct {
		Club *ClubModified
	} `graphql:"unSuspendClub(input: $input)"`
}

func TestSuspendClub_and_unsuspend(t *testing.T) {
	t.Parallel()

	staffAccountId := "1q7MJ5IyRTV0X4J27F3m5wGD5mj"

	client := getGraphqlClientWithAuthenticatedAccount(t, staffAccountId)
	grpcClient := getGrpcClient(t)
	clb := seedClub(t, staffAccountId)
	relayId := convertClubIdToRelayId(clb.ID())
	clubId := clb.ID()

	var suspendClub SuspendClub
	err := client.Mutate(context.Background(), &suspendClub, map[string]interface{}{
		"input": types.SuspendClubInput{
			ClubID:  relayId,
			EndTime: time.Now().Add(time.Hour * 24 * 30),
		},
	})

	require.NoError(t, err, "no error suspending club")

	refreshClubESIndex(t)

	// make sure thumbnail is set
	updatedClb := getClub(t, client, clb.Slug())
	require.NotNil(t, updatedClb.Club.Suspension, "club is suspended")

	// check permissions
	res, err := grpcClient.CanAccountViewPostUnderClub(context.Background(), &stella.CanAccountViewPostUnderClubRequest{
		ClubId:    clubId,
		AccountId: staffAccountId,
	})

	require.NoError(t, err, "no error getting permission")
	require.True(t, res.Allowed, "should be allowed to view")

	// check permissions for a random account
	res, err = grpcClient.CanAccountViewPostUnderClub(context.Background(), &stella.CanAccountViewPostUnderClubRequest{
		ClubId:    clubId,
		AccountId: ksuid.New().String(),
	})

	require.NoError(t, err, "no error getting permission")
	require.False(t, res.Allowed, "should not be allowed to view")

	// check permissions for a random account
	suspendedRes, err := grpcClient.GetSuspendedClubs(context.Background(), &stella.GetSuspendedClubsRequest{})
	require.NoError(t, err, "no error getting suspended clubs")
	require.GreaterOrEqual(t, len(suspendedRes.ClubIds), 1, "should have at least 1")

	var foundClubId string
	for _, id := range suspendedRes.ClubIds {
		if id == clubId {
			foundClubId = clubId
			break
		}
	}

	require.Equal(t, foundClubId, clubId, "should have found our club in the suspended list")

	_, err = grpcClient.SuspendClub(context.Background(), &stella.SuspendClubRequest{
		ClubId:      clubId,
		EndTimeUnix: time.Now().Add(time.Hour * 24).Unix(),
	})
	require.NoError(t, err, "no error suspending club")

	var unSuspendClub UnSuspendClub
	err = client.Mutate(context.Background(), &unSuspendClub, map[string]interface{}{
		"input": types.UnSuspendClubInput{
			ClubID: relayId,
		},
	})

	require.NoError(t, err, "no error un suspending club")

	updatedClb = getClub(t, client, clb.Slug())
	require.Nil(t, updatedClb.Club.Suspension, "club is no longer suspended")
}
