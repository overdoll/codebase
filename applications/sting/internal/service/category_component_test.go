package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	graphql2 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"strings"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type CategoryModified struct {
	Id                relay.ID
	Title             string
	Reference         string
	AlternativeTitles []*graphql2.Translation
	BannerMedia       *struct {
		ImageMedia struct {
			Id relay.ID
		} `graphql:"... on ImageMedia"`
	}
	Topic *TopicModified
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

type UpdateCategoryTopic struct {
	UpdateCategoryTopic *struct {
		Category *CategoryModified
	} `graphql:"updateCategoryTopic(input: $input)"`
}

type AddCategoryAlternativeTitle struct {
	AddCategoryAlternativeTitle *struct {
		Category *CategoryModified
	} `graphql:"addCategoryAlternativeTitle(input: $input)"`
}

type RemoveCategoryAlternativeTitle struct {
	RemoveCategoryAlternativeTitle *struct {
		Category *CategoryModified
	} `graphql:"removeCategoryAlternativeTitle(input: $input)"`
}

type TestCategory struct {
	Title string `faker:"username"`
	Slug  string `faker:"username"`
}

func refreshCategoryIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.CategoryReaderIndex).Do(context.Background())
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
	currentCategorySlug := strings.ToLower(fake.Slug)

	var createCategory CreateCategory

	err = client.Mutate(context.Background(), &createCategory, map[string]interface{}{
		"input": types.CreateCategoryInput{
			Slug:  currentCategorySlug,
			Title: fake.Title,
		},
	})

	require.NoError(t, err, "no error creating category")

	seedPublishedPostWithCategory(t, createCategory.CreateCategory.Category.Reference)

	refreshCategoryIndex(t)

	category := getCategoryBySlug(t, client, currentCategorySlug)

	require.NotNil(t, category, "should have found the category")
	require.Equal(t, fake.Title, category.Title, "correct title for category")

	oldTitle := fake.Title

	var searchCategories SearchCategories

	err = client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 1, "only a single result")
	require.Equal(t, fake.Title, searchCategories.Categories.Edges[0].Node.Title, "found the correct one")

	// generate a new set for category
	fake = TestCategory{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error generating category")

	var addCategoryAlternativeTitle AddCategoryAlternativeTitle

	err = client.Mutate(context.Background(), &addCategoryAlternativeTitle, map[string]interface{}{
		"input": types.AddCategoryAlternativeTitleInput{
			ID:     category.Id,
			Title:  fake.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error adding alternative title to category")

	require.Equal(t, len(addCategoryAlternativeTitle.AddCategoryAlternativeTitle.Category.AlternativeTitles), 1, "should have 1 alternative title")
	require.Equal(t, fake.Title, addCategoryAlternativeTitle.AddCategoryAlternativeTitle.Category.AlternativeTitles[0].Text, "should have correct alternative title")

	refreshCategoryIndex(t)

	// when adding our alternative title, we should have found the same category with the new title
	err = client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 1, "only a single result")
	require.Equal(t, oldTitle, searchCategories.Categories.Edges[0].Node.Title, "found the correct one")

	var removeCategoryAlternativeTitle RemoveCategoryAlternativeTitle

	err = client.Mutate(context.Background(), &removeCategoryAlternativeTitle, map[string]interface{}{
		"input": types.RemoveCategoryAlternativeTitleInput{
			ID:    category.Id,
			Title: fake.Title,
		},
	})

	require.NoError(t, err, "no error removing alternative title from category")

	refreshCategoryIndex(t)

	err = client.Query(context.Background(), &searchCategories, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchCategories.Categories.Edges, 0, "no results since we removed old title")

	var updateCategoryTitle UpdateCategoryTitle

	err = client.Mutate(context.Background(), &updateCategoryTitle, map[string]interface{}{
		"input": types.UpdateCategoryTitleInput{
			ID:     category.Id,
			Title:  fake.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating category title")

	grpcClient := getGrpcCallbackClient(t)

	category = getCategoryBySlug(t, client, currentCategorySlug)

	require.NotNil(t, category, "found category")
	require.Equal(t, fake.Title, category.Title, "title has been updated")
	require.Nil(t, category.BannerMedia, "has no banner")

	env := getWorkflowEnvironment()

	env.ExecuteWorkflow(workflows.GenerateCategoryBanner, workflows.GenerateCategoryBannerInput{CategoryId: category.Reference})

	require.True(t, env.IsWorkflowCompleted(), "generating banner workflow is complete")
	require.NoError(t, env.GetWorkflowError(), "no error generating banner")

	cat := getCategoryFromAdapter(t, category.Reference)

	_, err = grpcClient.UpdateMedia(context.Background(), &proto.UpdateMediaRequest{Media: &proto.Media{
		Id: cat.BannerMedia().ID(),
		Link: &proto.MediaLink{
			Id:   category.Reference,
			Type: proto.MediaLinkType_CATEGORY_BANNER,
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

	require.NoError(t, err, "no error updating category banner")

	category = getCategoryBySlug(t, client, currentCategorySlug)
	require.NotNil(t, category, "expected to have found category")
	require.NotEmpty(t, category.BannerMedia.ImageMedia.Id, "has a banner")
	require.Nil(t, category.Topic, "no topic")

	var updateCategoryTopic UpdateCategoryTopic

	err = client.Mutate(context.Background(), &updateCategoryTopic, map[string]interface{}{
		"input": types.UpdateCategoryTopicInput{
			ID:      category.Id,
			TopicID: "VG9waWM6MXE3TUo5ZVhqUnNnV0pOSWJPTUo5cXpnMlMz",
		},
	})

	require.NoError(t, err, "no error updating category topic")

	category = getCategoryBySlug(t, client, currentCategorySlug)
	require.NotNil(t, category.Topic, "has a topic")
}
