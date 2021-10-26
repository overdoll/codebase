package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type CharacterModified struct {
	Name   string
	Series SeriesModified
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

// TestSearchCharacters - search some characters
func TestSearchCharacters(t *testing.T) {
	t.Parallel()

	client := getGraphqlClient(t, nil)

	var searchCharacters SearchCharacters

	err := client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"name": graphql.String("Aarush Hills"),
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters.Edges, 1)
	require.Equal(t, "Aarush Hills", searchCharacters.Characters.Edges[0].Node.Name)
}

// Get a single character by slug
func TestGetCharacter(t *testing.T) {
	t.Parallel()

	client := getGraphqlClient(t, nil)

	var getCharacter Character

	err := client.Query(context.Background(), &getCharacter, map[string]interface{}{
		"slug":       graphql.String("margaret_lee"),
		"seriesSlug": graphql.String("foreigner_on_mars"),
	})

	require.NoError(t, err)
	require.NotNil(t, getCharacter.Character)
	require.Equal(t, "Margaret Lee", getCharacter.Character.Name)
}
