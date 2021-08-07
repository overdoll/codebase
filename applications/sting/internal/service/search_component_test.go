package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type SearchCharacters struct {
	Characters struct {
		Edges []struct {
			Node CharacterModified
		}
	} `graphql:"characters(name: $name)"`
}

// TestSearchCharacters - search some characters
func TestSearchCharacters(t *testing.T) {
	t.Parallel()

	client, _ := getGraphqlClient(t, nil)

	var searchCharacters SearchCharacters

	err := client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"name": graphql.String("Aarush Hills"),
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters.Edges, 1)
	require.Equal(t, "Aarush Hills", searchCharacters.Characters.Edges[0].Node.Name)
}

type SearchCategories struct {
	Categories struct {
		Edges []struct {
			Node struct {
				Title string
			}
		}
	} `graphql:"categories(title: $title)"`
}

// TestSearchCategories - search some categories
func TestSearchCategories(t *testing.T) {
	t.Parallel()

	client, _ := getGraphqlClient(t, nil)

	var searchCategories SearchCategories

	err := client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String("Convict"),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 1)
	require.Equal(t, "Convict", searchCategories.Categories.Edges[0].Node.Title)
}

type SearchSeries struct {
	Series struct {
		Edges []struct {
			Node struct {
				Title string
			}
		}
	} `graphql:"series(title: $title)"`
}

// TestSearchSeries - search some media
func TestSearchSeries(t *testing.T) {
	t.Parallel()

	client, _ := getGraphqlClient(t, nil)

	var searchSeries SearchSeries

	err := client.Query(context.Background(), &searchSeries, map[string]interface{}{
		"title": graphql.String("Foreigner On Mars"),
	})

	require.NoError(t, err)
	require.Len(t, searchSeries.Series.Edges, 1)
	require.Equal(t, "Foreigner On Mars", searchSeries.Series.Edges[0].Node.Title)
}

type SearchBrands struct {
	Brands struct {
		Edges []struct {
			Node struct {
				Name string
			}
		}
	} `graphql:"brands(name: $name)"`
}

// TestSearchBrand - search some brands
func TestSearchBrand(t *testing.T) {
	t.Parallel()

	client, _ := getGraphqlClient(t, nil)

	var searchSeries SearchBrands

	err := client.Query(context.Background(), &searchSeries, map[string]interface{}{
		"name": graphql.String("Non-Default Brand"),
	})

	require.NoError(t, err)
	require.Len(t, searchSeries.Brands.Edges, 1)
	require.Equal(t, "Non-Default Brand", searchSeries.Brands.Edges[0].Node.Name)
}
