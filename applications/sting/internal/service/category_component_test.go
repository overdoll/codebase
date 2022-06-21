package service_test

import (
	"context"
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

type CategoryModified struct {
	Id        relay.ID
	Title     string
	Reference string
	Thumbnail *graphql2.Resource
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

type UpdateCategoryTitle struct {
	UpdateCategoryTitle *struct {
		Category *CategoryModified
	} `graphql:"updateCategoryTitle(input: $input)"`
}

type UpdateCategoryThumbnail struct {
	UpdateCategoryThumbnail *struct {
		Category *CategoryModified
	} `graphql:"updateCategoryThumbnail(input: $input)"`
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

func getCategoryBySlug(t *testing.T, client *graphql.Client, slug string) *CategoryModified {

	var getCategory Category

	err := client.Query(context.Background(), &getCategory, map[string]interface{}{
		"slug": graphql.String(slug),
	})

	require.NoError(t, err)

	return getCategory.Category
}

func TestCreateCategory_update_and_search(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	fake := TestCategory{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake category")
	currentCategorySlug := fake.Slug

	var createCategory CreateCategory

	err = client.Mutate(context.Background(), &createCategory, map[string]interface{}{
		"input": types.CreateCategoryInput{
			Slug:  currentCategorySlug,
			Title: fake.Title,
		},
	})

	require.NoError(t, err, "no error creating category")

	refreshCategoryIndex(t)

	category := getCategoryBySlug(t, client, currentCategorySlug)

	require.NotNil(t, category, "should have found the category")
	require.Equal(t, fake.Title, category.Title, "correct title for category")

	var searchCategories SearchCategories

	err = client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 1, "only a single result")
	require.Equal(t, fake.Title, searchCategories.Categories.Edges[0].Node.Title, "found the correct one")

	fake = TestCategory{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error generating category")

	var updateCategoryTitle UpdateCategoryTitle

	err = client.Mutate(context.Background(), &updateCategoryTitle, map[string]interface{}{
		"input": types.UpdateCategoryTitleInput{
			ID:     category.Id,
			Title:  fake.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating category title")

	categoryThumbnailId := "00be69a89e31d28cf8e79b7373d505c7"

	var updateCategoryThumbnail UpdateCategoryThumbnail

	err = client.Mutate(context.Background(), &updateCategoryThumbnail, map[string]interface{}{
		"input": types.UpdateCategoryThumbnailInput{
			ID:        category.Id,
			Thumbnail: categoryThumbnailId,
		},
	})

	require.False(t, updateCategoryThumbnail.UpdateCategoryThumbnail.Category.Thumbnail.Processed, "not yet processed")

	require.NoError(t, err, "no error updating category thumbnail")

	grpcClient := getGrpcCallbackClient(t)

	_, err = grpcClient.UpdateResources(context.Background(), &proto.UpdateResourcesRequest{Resources: []*proto.Resource{{
		Id:          categoryThumbnailId,
		ItemId:      category.Reference,
		Processed:   true,
		Type:        proto.ResourceType_IMAGE,
		ProcessedId: uuid.New().String(),
		Private:     false,
		Width:       100,
		Height:      100,
		Token:       "CATEGORY",
	}}})

	require.NoError(t, err, "no error updating resource")

	category = getCategoryBySlug(t, client, currentCategorySlug)

	require.NotNil(t, category, "found category")
	require.Equal(t, fake.Title, category.Title, "title has been updated")
	require.NotNil(t, category.Thumbnail, "has a thumbnail")
	require.True(t, category.Thumbnail.Processed, "thumbnail is processed")
}
