package service_test

import (
	"context"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/ports/graphql/types"
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
				Name      string
				Thumbnail *types.Resource
			}
		}
	} `graphql:"brands(name: $name)"`
}

// TestSearchBrand - search some brands
// we also test the resources here too
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

	// make sure correct URLs are generated
	require.NotNil(t, searchSeries.Brands.Edges[0].Node.Thumbnail)
	require.Equal(t, os.Getenv("STATIC_URL")+"/thumbnails/1pcKZyoYFxZRyidV9XHd1WyPbrj.png", string(searchSeries.Brands.Edges[0].Node.Thumbnail.Urls[0].URL))
	require.Equal(t, "image/png", searchSeries.Brands.Edges[0].Node.Thumbnail.Urls[0].MimeType)
}
