package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
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

type CreateCategory struct {
	CreateCategory *struct {
		Category *CategoryModified
	} `graphql:"createCategory(input: $input)"`
}

type TestCategory struct {
	Title string `faker:"username"`
	Slug  string `faker:"username"`
}

func refreshCategoryIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.CategoryIndexName).Do(context.Background())
	require.NoError(t, err)
}

func TestCreateCategory_update_and_search(t *testing.T) {
	t.Parallel()

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	fake := TestCategory{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake category")

	var createCategory CreateCategory

	err = client.Mutate(context.Background(), &createCategory, map[string]interface{}{
		"input": types.CreateCategoryInput{
			Slug:  fake.Slug,
			Title: fake.Title,
		},
	})

	require.NoError(t, err, "no error creating category")

	refreshCategoryIndex(t)

	var getCategory Category

	err = client.Query(context.Background(), &getCategory, map[string]interface{}{
		"slug": graphql.String(fake.Slug),
	})

	require.NoError(t, err)
	require.NotNil(t, getCategory.Category, "should have found the category")
	require.Equal(t, fake.Title, getCategory.Category.Title, "correct title for category")

	var searchCategories SearchCategories

	err = client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 1, "only a single result")
	require.Equal(t, fake.Title, searchCategories.Categories.Edges[0].Node.Title, "found the correct one")
}
