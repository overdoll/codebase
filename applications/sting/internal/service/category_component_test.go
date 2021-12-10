package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type CategoryModified struct {
	Title string
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

type Category struct {
	Category *CategoryModified `graphql:"category(slug: $slug)"`
}

// TestSearchCategories - search some categories
func TestSearchCategories(t *testing.T) {
	t.Parallel()

	client := getGraphqlClient(t)

	var searchCategories SearchCategories

	err := client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String("Convict"),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 1)
	require.Equal(t, "Convict", searchCategories.Categories.Edges[0].Node.Title)
}

// Get a single category by slug
func TestGetCategory(t *testing.T) {
	t.Parallel()

	client := getGraphqlClient(t)

	var getCategory Category

	err := client.Query(context.Background(), &getCategory, map[string]interface{}{
		"slug": graphql.String("assure"),
	})

	require.NoError(t, err)
	require.NotNil(t, getCategory.Category)
	require.Equal(t, "Assure", getCategory.Category.Title)
}
