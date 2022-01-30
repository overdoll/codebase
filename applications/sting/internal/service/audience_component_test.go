package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/graphql/relay"
	"testing"
)

type AudienceModified struct {
	Id        relay.ID
	Title     string
	Slug      string
	Standard  bool
	Thumbnail *struct {
		Id string
	}
}

type SearchAudience struct {
	Audiences struct {
		Edges []struct {
			Node AudienceModified
		}
	} `graphql:"audiences(title: $title)"`
}

type Audience struct {
	Audience *AudienceModified `graphql:"audience(slug: $slug)"`
}

type CreateAudience struct {
	CreateAudience *struct {
		Audience *AudienceModified
	} `graphql:"createAudience(input: $input)"`
}

type UpdateAudienceTitle struct {
	UpdateAudienceTitle *struct {
		Audience *AudienceModified
	} `graphql:"updateAudienceTitle(input: $input)"`
}

type UpdateAudienceThumbnail struct {
	UpdateAudienceThumbnail *struct {
		Audience *AudienceModified
	} `graphql:"updateAudienceThumbnail(input: $input)"`
}

type UpdateAudienceIsStandard struct {
	UpdateAudienceIsStandard *struct {
		Audience *AudienceModified
	} `graphql:"updateAudienceIsStandard(input: $input)"`
}

type TestAudience struct {
	Title string `faker:"username"`
	Slug  string `faker:"username"`
}

func refreshAudienceIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.AudienceIndexName).Do(context.Background())
	require.NoError(t, err)
}

func getAudienceBySlug(t *testing.T, client *graphql.Client, slug string) *AudienceModified {
	var getAudience Audience

	err := client.Query(context.Background(), &getAudience, map[string]interface{}{
		"slug": graphql.String(slug),
	})

	require.NoError(t, err)

	return getAudience.Audience
}

func TestCreateAudience_search_and_update(t *testing.T) {
	t.Parallel()

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	fake := TestAudience{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake audience")
	currentAudienceSlug := fake.Slug

	var createAudience CreateAudience

	err = client.Mutate(context.Background(), &createAudience, map[string]interface{}{
		"input": types.CreateAudienceInput{
			Slug:     currentAudienceSlug,
			Title:    fake.Title,
			Standard: false,
		},
	})

	require.NoError(t, err, "no error creating audience")

	refreshAudienceIndex(t)

	audience := getAudienceBySlug(t, client, currentAudienceSlug)

	require.NotNil(t, audience)
	require.Equal(t, fake.Title, audience.Title, "same title for audience")

	var searchAudiences SearchAudience

	err = client.Query(context.Background(), &searchAudiences, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchAudiences.Audiences.Edges, 1, "should only have found one")
	require.Equal(t, fake.Title, searchAudiences.Audiences.Edges[0].Node.Title, "expected to find audience in search")

	fake = TestAudience{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error generating audience")

	var updateAudienceTitle UpdateAudienceTitle

	err = client.Mutate(context.Background(), &updateAudienceTitle, map[string]interface{}{
		"input": types.UpdateAudienceTitleInput{
			ID:     audience.Id,
			Title:  fake.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating audience title")

	var updateAudienceThumbnail UpdateAudienceThumbnail

	err = client.Mutate(context.Background(), &updateAudienceThumbnail, map[string]interface{}{
		"input": types.UpdateAudienceThumbnailInput{
			ID:        audience.Id,
			Thumbnail: "test",
		},
	})

	require.NoError(t, err, "no error updating audience thumbnail")

	var updateAudienceIsStandard UpdateAudienceIsStandard

	err = client.Mutate(context.Background(), &updateAudienceIsStandard, map[string]interface{}{
		"input": types.UpdateAudienceIsStandardInput{
			ID:       audience.Id,
			Standard: true,
		},
	})

	require.NoError(t, err, "no error updating audience is standard")

	audience = getAudienceBySlug(t, client, currentAudienceSlug)
	require.NotNil(t, audience, "expected to have found audience")

	require.Equal(t, fake.Title, audience.Title, "title has been updated")
	require.NotNil(t, audience.Thumbnail, "has a thumbnail")
	require.True(t, audience.Standard, "is standard now")
}
