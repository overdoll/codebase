package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/ports/graphql/types"
	graphql2 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"strings"
	"testing"
)

type TopicModified struct {
	Id          relay.ID
	Title       string
	Description string
	Reference   string
	Weight      int
	BannerMedia *struct {
		Item *graphql2.ImageMedia
	} `graphql:"... on ImageMedia"`
}

type SearchTopics struct {
	Topics struct {
		Edges []struct {
			Node struct {
				Title string
			}
		}
	} `graphql:"topics(first: 5)"`
}

type Topic struct {
	Topic *TopicModified `graphql:"topic(slug: $slug)"`
}

type CreateTopic struct {
	CreateTopic *struct {
		Topic *TopicModified
	} `graphql:"createTopic(input: $input)"`
}

type UpdateTopicTitle struct {
	UpdateTopicTitle *struct {
		Topic *TopicModified
	} `graphql:"updateTopicTitle(input: $input)"`
}

type UpdateTopicDescription struct {
	UpdateTopicDescription *struct {
		Topic *TopicModified
	} `graphql:"updateTopicDescription(input: $input)"`
}

type UpdateTopicBanner struct {
	UpdateTopicBanner *struct {
		Topic *TopicModified
	} `graphql:"updateTopicBanner(input: $input)"`
}

type UpdateTopicWeight struct {
	UpdateTopicWeight *struct {
		Topic *TopicModified
	} `graphql:"updateTopicWeight(input: $input)"`
}

type TestTopic struct {
	Description string `faker:"username"`
	Title       string `faker:"username"`
	Slug        string `faker:"username"`
}

func getTopicBySlug(t *testing.T, client *graphql.Client, slug string) *TopicModified {

	var getTopic Topic

	err := client.Query(context.Background(), &getTopic, map[string]interface{}{
		"slug": graphql.String(slug),
	})

	require.NoError(t, err)

	return getTopic.Topic
}

func TestCreatTopic_update_and_search(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	fake := TestTopic{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake topic")
	currentTopicSlug := strings.ToLower(fake.Slug)

	var createTopic CreateTopic

	err = client.Mutate(context.Background(), &createTopic, map[string]interface{}{
		"input": types.CreateTopicInput{
			Slug:        currentTopicSlug,
			Title:       fake.Title,
			Description: fake.Description,
			Weight:      0,
		},
	})

	require.NoError(t, err, "no error creating topic")

	topic := getTopicBySlug(t, client, currentTopicSlug)

	require.NotNil(t, topic, "should have found the topic")
	require.Equal(t, fake.Title, topic.Title, "correct title for topic")

	var searchTopics SearchTopics

	err = client.Query(context.Background(), &searchTopics, nil)

	require.NoError(t, err)
	require.GreaterOrEqual(t, len(searchTopics.Topics.Edges), 2, "multiple topic results")
	require.Equal(t, "Single Topic", searchTopics.Topics.Edges[0].Node.Title, "found the correct topic")

	// generate a new set for topic
	fake = TestTopic{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error generating topic")

	newWeight := 10

	var updateTopicWeight UpdateTopicWeight

	err = client.Mutate(context.Background(), &updateTopicWeight, map[string]interface{}{
		"input": types.UpdateTopicWeightInput{
			ID:     topic.Id,
			Weight: newWeight,
		},
	})

	require.NoError(t, err, "no error updating topic weight")

	var updateTopicTitle UpdateTopicTitle

	err = client.Mutate(context.Background(), &updateTopicTitle, map[string]interface{}{
		"input": types.UpdateTopicTitleInput{
			ID:     topic.Id,
			Title:  fake.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating topic title")

	var updateTopicDescription UpdateTopicDescription

	err = client.Mutate(context.Background(), &updateTopicDescription, map[string]interface{}{
		"input": types.UpdateTopicDescriptionInput{
			ID:          topic.Id,
			Description: fake.Description,
			Locale:      "en",
		},
	})

	require.NoError(t, err, "no error updating topic description")

	topicBannerId := "00be69a89e31d28cf8e79b7373d505c7"

	var updateTopicBanner UpdateTopicBanner

	err = client.Mutate(context.Background(), &updateTopicBanner, map[string]interface{}{
		"input": types.UpdateTopicBannerInput{
			ID:     topic.Id,
			Banner: topicBannerId,
		},
	})

	require.Nil(t, updateTopicBanner.UpdateTopicBanner.Topic.BannerMedia, "not yet processed")

	require.NoError(t, err, "no error updating topic thumbnail")

	grpcClient := getGrpcCallbackClient(t)

	_, err = grpcClient.UpdateMedia(context.Background(), &proto.UpdateMediaRequest{Media: &proto.Media{
		Id: topicBannerId,
		Link: &proto.MediaLink{
			Id:   topic.Reference,
			Type: proto.MediaLinkType_TOPIC_BANNER,
		},
		ImageData: &proto.ImageData{Id: uuid.New().String()},
		State: &proto.MediaState{
			Processed: true,
			Failed:    false,
		},
	}})

	require.NoError(t, err, "no error updating resource")

	topic = getTopicBySlug(t, client, currentTopicSlug)

	require.NotNil(t, topic, "found topic")
	require.Equal(t, fake.Title, topic.Title, "title has been updated")
	require.Equal(t, fake.Description, topic.Description, "description has been updated")
	require.NotNil(t, topic.BannerMedia, "banner is now processed")
	require.Equal(t, newWeight, topic.Weight, "topic weight is updated")
}

type TopicWithCategoriesModified struct {
	Id         relay.ID
	Categories struct {
		Edges []struct {
			Node CategoryModified
		}
	} `graphql:"categories(first: 10)"`
}

type TopicWithCategory struct {
	Topic *TopicWithCategoriesModified `graphql:"topic(slug: $slug)"`
}

func TestSearchCharactersForTopic(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var getTopic TopicWithCategory

	err := client.Query(context.Background(), &getTopic, map[string]interface{}{
		"slug": graphql.String("double-topiC"),
	})

	require.NoError(t, err)

	require.Equal(t, len(getTopic.Topic.Categories.Edges), 5, "should have found 5 categories for this topic")
}
