package service_test

import (
	"context"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type BrandModified struct {
	Name      string
	Thumbnail *types.Resource
}

type SearchBrands struct {
	Brands struct {
		Edges []struct {
			Node BrandModified
		}
	} `graphql:"brands(name: $name)"`
}

type Brand struct {
	Brand BrandModified `graphql:"brand(slug: $slug)"`
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

// Get a single brand by slug
func TestGetBrand(t *testing.T) {
	t.Parallel()

	client, _ := getGraphqlClient(t, nil)

	var getBrand Brand

	err := client.Query(context.Background(), &getBrand, map[string]interface{}{
		"slug": graphql.String("non_default_brand"),
	})

	require.NoError(t, err)
	require.Equal(t, "Non-Default Brand", getBrand.Brand.Name)
}
