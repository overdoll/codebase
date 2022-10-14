package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"strings"
	"testing"
)

type CharacterModified struct {
	Id          relay.ID
	Name        string
	Reference   string
	Slug        string
	Series      *SeriesModified
	Club        *ClubModified
	BannerMedia *struct {
		ImageMedia struct {
			Id relay.ID
		} `graphql:"... on ImageMedia"`
	}
}

type SearchCharactersForSeries struct {
	Characters struct {
		Edges []struct {
			Node CharacterModified
		}
	} `graphql:"characters(seriesSlug: $seriesSlug)"`
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

type TestCharacter struct {
	Name string `faker:"username"`
	Slug string `faker:"username"`
}

func refreshCharacterIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.CharacterReaderIndex).Do(context.Background())
	require.NoError(t, err)
}

func getSeriesCharacterBySlug(t *testing.T, client *graphql.Client, slug, seriesSlug string) *CharacterModified {
	var getCharacter CharacterSeries

	err := client.Query(context.Background(), &getCharacter, map[string]interface{}{
		"slug":       graphql.String(slug),
		"seriesSlug": graphql.String(seriesSlug),
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
	currentCharacterSlug := strings.ToLower(fake.Slug)

	series := seedSeries(t)

	seriesId := series.ID()

	var createCharacter CreateCharacter

	seriesIdRelay := relay.ID(relay.MarshalRelayId(relay.NewID(types.Series{}, seriesId)))

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

	character := getSeriesCharacterBySlug(t, client, currentCharacterSlug, series.Slug())

	require.NotNil(t, character, "found character")
	require.Equal(t, fake.Name, character.Name, "correct name")

	var searchCharacters SearchCharacters

	err = client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"name": graphql.String(fake.Name),
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters.Edges, 1, "only found 1 result")
	require.Equal(t, fake.Name, searchCharacters.Characters.Edges[0].Node.Name, "correct name")

	var searchCharactersForSeries SearchCharactersForSeries

	err = client.Query(context.Background(), &searchCharactersForSeries, map[string]interface{}{
		"seriesSlug": graphql.String(series.Slug()),
	})

	require.NoError(t, err)
	require.Len(t, searchCharactersForSeries.Characters.Edges, 1, "only found 1 result")
	require.Equal(t, fake.Name, searchCharactersForSeries.Characters.Edges[0].Node.Name, "correct name")

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

	character = getSeriesCharacterBySlug(t, client, currentCharacterSlug, series.Slug())
	require.NotNil(t, character, "expected to have found character")

	require.Equal(t, fake.Name, character.Name, "title has been updated")
	require.Nil(t, character.BannerMedia, "has no banner ter")

	env := getWorkflowEnvironment()

	refreshCharacterIndex(t)

	env.ExecuteWorkflow(workflows.GenerateCharacterBanner, workflows.GenerateCharacterBannerInput{CharacterId: character.Reference})

	require.True(t, env.IsWorkflowCompleted(), "generating banner workflow is complete")
	require.NoError(t, env.GetWorkflowError(), "no error generating banner")

	cat := getCharacterFromAdapter(t, character.Reference)

	grpcClient := getGrpcCallbackClient(t)
	_, err = grpcClient.UpdateMedia(context.Background(), &proto.UpdateMediaRequest{Media: &proto.Media{
		Id: cat.BannerMedia().ID(),
		Link: &proto.MediaLink{
			Id:   character.Reference,
			Type: proto.MediaLinkType_CHARACTER_BANNER,
		},
		ImageData: &proto.ImageData{Id: uuid.New().String(), Sizes: []*proto.ImageDataSize{
			{
				Width:  0,
				Height: 0,
			},
		}},
		State: &proto.MediaState{
			Processed: true,
			Failed:    false,
		},
	}})

	require.NoError(t, err, "no error updating character banner")

	character = getSeriesCharacterBySlug(t, client, currentCharacterSlug, series.Slug())
	require.NotNil(t, character, "expected to have found character")
	require.NotEmpty(t, character.BannerMedia.ImageMedia.Id, "has a banner")
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

type ClubCharacter struct {
	Club *ClubWithCharacterModified `graphql:"club(slug: $slug)"`
}

func getCharacterClub(t *testing.T, client *graphql.Client, id string) *ClubWithCharacterModified {

	var club ClubCharacter

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err)

	return club.Club
}

// create a club character
func TestCreateClubCharacter_update_and_search(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountNormal(t, accountId)
	clb := seedClub(t, accountId)

	accountIdStaff := uuid.New().String()
	mockAccountStaff(t, accountIdStaff)

	clubRelayId := convertClubIdToRelayId(clb.ID())
	staffClient := getGraphqlClientWithAuthenticatedAccount(t, accountIdStaff)
	// first, enable club characters for this club

	var enableClubCharacters EnableClubCharacters

	err := staffClient.Mutate(context.Background(), &enableClubCharacters, map[string]interface{}{
		"input": types.EnableClubCharactersInput{
			ClubID:          clubRelayId,
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
	currentCharacterSlug := strings.ToLower(fake.Slug)

	refreshClubESIndex(t)

	var createCharacter CreateCharacter

	err = client.Mutate(context.Background(), &createCharacter, map[string]interface{}{
		"input": types.CreateCharacterInput{
			ClubID: &clubRelayId,
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
			ClubID:          clubRelayId,
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
			ClubID: clubRelayId,
		},
	})

	require.NoError(t, err, "no error disabling characters for club")

	club = getCharacterClub(t, client, clb.Slug())
	require.False(t, club.CharactersEnabled, "characters not enabled")
	require.Equal(t, 1, club.CharactersCount, "has 1 character")
	require.Equal(t, 0, club.CharactersLimit, "has 0 limit since disabled")
	require.Equal(t, 1, len(club.Characters.Edges), "has 1 character")
}
