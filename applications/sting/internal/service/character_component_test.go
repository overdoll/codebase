package service_test

import (
	"context"
	"encoding/base64"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	graphql2 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/uuid"
	"testing"
)

type CharacterModified struct {
	Id        relay.ID
	Name      string
	Reference string
	Slug      string
	Series    *SeriesModified
	Club      *ClubModified
	Thumbnail *graphql2.Resource
	Banner    *graphql2.Resource
}

type SearchCharacters struct {
	Characters struct {
		Edges []struct {
			Node CharacterModified
		}
	} `graphql:"characters(name: $name)"`
}

type CharacterSeries struct {
	Character *CharacterModified `graphql:"character(slug: $slug, seriesSlug: $seriesSlug)"`
}

type CreateCharacter struct {
	CreateCharacter *struct {
		Character *CharacterModified
	} `graphql:"createCharacter(input: $input)"`
}

type UpdateCharacterName struct {
	UpdateCharacterName *struct {
		Character *CharacterModified
	} `graphql:"updateCharacterName(input: $input)"`
}

type UpdateCharacterThumbnail struct {
	UpdateCharacterThumbnail *struct {
		Character *CharacterModified
	} `graphql:"updateCharacterThumbnail(input: $input)"`
}

type TestCharacter struct {
	Name string `faker:"username"`
	Slug string `faker:"username"`
}

func refreshCharacterIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.CharacterReaderIndex).Do(context.Background())
	require.NoError(t, err)
}

func getSeriesCharacterBySlug(t *testing.T, client *graphql.Client, slug string) *CharacterModified {
	var getCharacter CharacterSeries

	err := client.Query(context.Background(), &getCharacter, map[string]interface{}{
		"slug":       graphql.String(slug),
		"seriesSlug": graphql.String("ForeignerOnMars"),
	})

	require.NoError(t, err)

	return getCharacter.Character
}

// Get a single character by slug
func TestCreateSeriesCharacter_update_and_search(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	fake := TestCharacter{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake category")
	currentCharacterSlug := fake.Slug

	seriesId := "1pcKiQL7dgUW8CIN7uO1wqFaMql"

	var createCharacter CreateCharacter

	seriesIdRelay := relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Series{}, seriesId))))

	err = client.Mutate(context.Background(), &createCharacter, map[string]interface{}{
		"input": types.CreateCharacterInput{
			SeriesID: &seriesIdRelay,
			Slug:     currentCharacterSlug,
			Name:     fake.Name,
		},
	})

	require.NoError(t, err, "no error creating character")

	seedPublishedPostWithCharacter(t, createCharacter.CreateCharacter.Character.Reference, seriesId)

	refreshCharacterIndex(t)

	character := getSeriesCharacterBySlug(t, client, currentCharacterSlug)

	require.NotNil(t, character, "found character")
	require.Equal(t, fake.Name, character.Name, "correct name")

	var searchCharacters SearchCharacters

	err = client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"name": graphql.String(fake.Name),
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters.Edges, 1, "only found 1 result")
	require.Equal(t, fake.Name, searchCharacters.Characters.Edges[0].Node.Name, "correct name")

	fake = TestCharacter{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error generating category")

	var updateCharacterName UpdateCharacterName

	err = client.Mutate(context.Background(), &updateCharacterName, map[string]interface{}{
		"input": types.UpdateCharacterNameInput{
			ID:     character.Id,
			Name:   fake.Name,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating character name")

	thumbnailResourceId := "00be69a89e31d28cf8e79b7373d505c7"

	var updateCharacterThumbnail UpdateCharacterThumbnail

	err = client.Mutate(context.Background(), &updateCharacterThumbnail, map[string]interface{}{
		"input": types.UpdateCharacterThumbnailInput{
			ID:        character.Id,
			Thumbnail: thumbnailResourceId,
		},
	})

	require.NoError(t, err, "no error updating character thumbnail")

	require.False(t, updateCharacterThumbnail.UpdateCharacterThumbnail.Character.Thumbnail.Processed, "not yet processed")

	require.NoError(t, err, "no error updating category thumbnail")

	grpcClient := getGrpcCallbackClient(t)

	_, err = grpcClient.UpdateResources(context.Background(), &proto.UpdateResourcesRequest{Resources: []*proto.Resource{{
		Id:          thumbnailResourceId,
		ItemId:      updateCharacterThumbnail.UpdateCharacterThumbnail.Character.Reference,
		Processed:   true,
		Type:        proto.ResourceType_IMAGE,
		ProcessedId: uuid.New().String(),
		Private:     false,
		Width:       100,
		Height:      100,
		Token:       "CHARACTER",
	}}})

	require.NoError(t, err, "no error running resource callback")

	character = getSeriesCharacterBySlug(t, client, currentCharacterSlug)
	require.NotNil(t, character, "expected to have found character")

	require.Equal(t, fake.Name, character.Name, "title has been updated")
	require.NotNil(t, character.Thumbnail, "has a thumbnail")
	require.Nil(t, character.Banner, "has no banner ter")
	require.True(t, character.Thumbnail.Processed, "thumbnail is processed")

	env := getWorkflowEnvironment()

	refreshCharacterIndex(t)

	env.ExecuteWorkflow(workflows.GenerateCharacterBanner, workflows.GenerateCharacterBannerInput{CharacterId: character.Reference})

	require.True(t, env.IsWorkflowCompleted(), "generating banner workflow is complete")
	require.NoError(t, env.GetWorkflowError(), "no error generating banner")

	cat := getCharacterFromAdapter(t, character.Reference)

	_, err = grpcClient.UpdateResources(context.Background(), &proto.UpdateResourcesRequest{Resources: []*proto.Resource{{
		Id:          cat.BannerResource().ID(),
		ItemId:      character.Reference,
		Processed:   true,
		Type:        proto.ResourceType_IMAGE,
		ProcessedId: uuid.New().String(),
		Private:     false,
		Width:       100,
		Height:      100,
		Token:       "CHARACTER_BANNER",
	}}})

	require.NoError(t, err, "no error updating character banner")

	character = getSeriesCharacterBySlug(t, client, currentCharacterSlug)
	require.NotNil(t, character, "expected to have found character")
	require.NotNil(t, character.Banner, "has a banner")
}

func getClubCharacterBySlug(t *testing.T, client *graphql.Client, slug, clubSlug string) *CharacterModified {
	var getCharacter CharacterClub

	err := client.Query(context.Background(), &getCharacter, map[string]interface{}{
		"slug":     graphql.String(slug),
		"clubSlug": graphql.String(clubSlug),
	})

	require.NoError(t, err)

	return getCharacter.Character
}

type CharacterClub struct {
	Character *CharacterModified `graphql:"character(slug: $slug, clubSlug: $clubSlug)"`
}

type ClubWithCharacterModified struct {
	ID                relay.ID
	Reference         string
	Slug              string
	CharactersEnabled bool
	CharactersLimit   int
	CharactersCount   int
	Characters        *struct {
		Edges []*struct {
			Node CharacterModified
		}
	} `graphql:"characters()"`
}

type EnableClubCharacters struct {
	EnableClubCharacters *struct {
		Club *ClubWithCharacterModified
	} `graphql:"enableClubCharacters(input: $input)"`
}

type DisableClubCharacters struct {
	DisableClubCharacters *struct {
		Club *ClubWithCharacterModified
	} `graphql:"disableClubCharacters(input: $input)"`
}

type UpdateClubCharactersLimit struct {
	UpdateClubCharactersLimit *struct {
		Club *ClubWithCharacterModified
	} `graphql:"updateClubCharactersLimit(input: $input)"`
}

func getCharacterClub(t *testing.T, client *graphql.Client, id string) ClubWithCharacterModified {

	var club ClubWithCharacterModified

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err)

	return club
}

// create a club character
func TestCreateClubCharacter_update_and_search(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountNormal(t, accountId)
	clb := seedClub(t, accountId)

	accountIdStaff := uuid.New().String()
	mockAccountStaff(t, accountIdStaff)

	staffClient := getGraphqlClientWithAuthenticatedAccount(t, accountIdStaff)
	// first, enable club characters for this club

	var enableClubCharacters EnableClubCharacters

	err := staffClient.Mutate(context.Background(), &enableClubCharacters, map[string]interface{}{
		"input": types.EnableClubCharactersInput{
			ClubID:          convertClubIdToRelayId(clb.ID()),
			CharactersLimit: 25,
		},
	})

	require.NoError(t, err, "no error enabling characters for club")

	require.Equal(t, 25, enableClubCharacters.EnableClubCharacters.Club.CharactersLimit, "25 limit")
	require.Equal(t, 0, enableClubCharacters.EnableClubCharacters.Club.CharactersCount, "0 characters")
	require.True(t, enableClubCharacters.EnableClubCharacters.Club.CharactersEnabled, "characters are enabled")

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	fake := TestCharacter{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake character")
	currentCharacterSlug := fake.Slug

	var createCharacter CreateCharacter

	clubIdRelay := convertClubIdToRelayId(clb.ID())
	err = client.Mutate(context.Background(), &createCharacter, map[string]interface{}{
		"input": types.CreateCharacterInput{
			ClubID: &clubIdRelay,
			Slug:   currentCharacterSlug,
			Name:   fake.Name,
		},
	})

	require.NoError(t, err, "no error creating a club character")

	// make sure we can find the club character
	character := getClubCharacterBySlug(t, client, currentCharacterSlug, clb.Slug())

	require.NotNil(t, character, "expected to find character")
	require.NotNil(t, character.Club, "expected character to have a club attached")

	var updateClubCharactersLimit UpdateClubCharactersLimit

	err = staffClient.Mutate(context.Background(), &updateClubCharactersLimit, map[string]interface{}{
		"input": types.UpdateClubCharactersLimitInput{
			ClubID:          convertClubIdToRelayId(clb.ID()),
			CharactersLimit: 50,
		},
	})

	require.NoError(t, err, "no error updating club characters limit")

	refreshCharacterIndex(t)

	club := getCharacterClub(t, client, clb.Slug())
	require.True(t, club.CharactersEnabled, "characters enabled")
	require.Equal(t, 1, club.CharactersCount, "has 1 character")
	require.Equal(t, 50, club.CharactersLimit, "has 1 character")
	require.Equal(t, 1, len(club.Characters.Edges), "has 1 character")

	require.Equal(t, fake.Name, club.Characters.Edges[0].Node.Name, "name is equal for the character")

	var disableClubCharacters DisableClubCharacters

	err = staffClient.Mutate(context.Background(), &disableClubCharacters, map[string]interface{}{
		"input": types.DisableClubCharactersInput{
			ClubID: convertClubIdToRelayId(clb.ID()),
		},
	})

	require.NoError(t, err, "no error disabling characters for club")

	club = getCharacterClub(t, client, clb.Slug())
	require.False(t, club.CharactersEnabled, "characters not enabled")
	require.Equal(t, 1, club.CharactersCount, "has 1 character")
	require.Equal(t, 0, club.CharactersLimit, "has 0 limit since disabled")
	require.Equal(t, 1, len(club.Characters.Edges), "has 1 character")
}
