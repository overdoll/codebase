package service_test

import (
	"context"
	"encoding/base64"
	"github.com/bxcodec/faker/v3"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	graphql2 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/uuid"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type CharacterModified struct {
	Id        relay.ID
	Name      string
	Reference string
	Slug      string
	Series    SeriesModified
	Thumbnail *graphql2.Resource
}

type SearchCharacters struct {
	Characters struct {
		Edges []struct {
			Node CharacterModified
		}
	} `graphql:"characters(name: $name)"`
}

type Character struct {
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
	_, err := es.Refresh(adapters.CharacterIndexName).Do(context.Background())
	require.NoError(t, err)
}

func getCharacterBySlug(t *testing.T, client *graphql.Client, slug string) *CharacterModified {
	var getCharacter Character

	err := client.Query(context.Background(), &getCharacter, map[string]interface{}{
		"slug":       graphql.String(slug),
		"seriesSlug": graphql.String("ForeignerOnMars"),
	})

	require.NoError(t, err)

	return getCharacter.Character
}

// Get a single character by slug
func TestCreateCharacter_update_and_search(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	fake := TestCharacter{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake category")
	currentCharacterSlug := fake.Slug

	var createCharacter CreateCharacter

	err = client.Mutate(context.Background(), &createCharacter, map[string]interface{}{
		"input": types.CreateCharacterInput{
			SeriesID: relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Series{}, "1pcKiQL7dgUW8CIN7uO1wqFaMql")))),
			Slug:     currentCharacterSlug,
			Name:     fake.Name,
		},
	})

	require.NoError(t, err, "no error creating character")

	refreshCharacterIndex(t)

	character := getCharacterBySlug(t, client, currentCharacterSlug)

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

	character = getCharacterBySlug(t, client, currentCharacterSlug)
	require.NotNil(t, character, "expected to have found character")

	require.Equal(t, fake.Name, character.Name, "title has been updated")
	require.NotNil(t, character.Thumbnail, "has a thumbnail")
	require.True(t, character.Thumbnail.Processed, "thumbnail is processed")
}
