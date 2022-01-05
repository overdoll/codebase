package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"testing"
)

type ClubModified struct {
	ID          string
	Reference   string
	Slug        string
	Name        string
	SlugAliases []struct {
		Slug string
	}
	SlugAliasesLimit int
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

type CreateClub struct {
	CreateClub *struct {
		Club *ClubModified
	} `graphql:"createClub(input: $input)"`
}

func TestCreateClub(t *testing.T) {
	t.Parallel()

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

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

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")
	clb := seedClub(t)
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

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")
	clb := seedClub(t)
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
