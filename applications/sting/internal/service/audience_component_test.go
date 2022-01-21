package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"testing"
)

type AudienceModified struct {
	Title    string
	Slug     string
	Standard bool
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

type TestAudience struct {
	Title string `faker:"username"`
	Slug  string `faker:"username"`
}

func refreshAudienceIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.AudienceIndexName).Do(context.Background())
	require.NoError(t, err)
}

func TestCreateAudience_search_and_update(t *testing.T) {
	t.Parallel()

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	fake := TestAudience{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake audience")

	var createAudience CreateAudience

	err = client.Mutate(context.Background(), &createAudience, map[string]interface{}{
		"input": types.CreateAudienceInput{
			Slug:     fake.Slug,
			Title:    fake.Title,
			Standard: false,
		},
	})

	require.NoError(t, err, "no error creating audience")

	refreshAudienceIndex(t)

	var getAudience Audience

	err = client.Query(context.Background(), &getAudience, map[string]interface{}{
		"slug": graphql.String(fake.Slug),
	})

	require.NoError(t, err)
	require.NotNil(t, getAudience.Audience)
	require.Equal(t, fake.Title, getAudience.Audience.Title, "same title for audience")

	var searchAudiences SearchAudience

	err = client.Query(context.Background(), &searchAudiences, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchAudiences.Audiences.Edges, 1, "should only have found one")
	require.Equal(t, fake.Title, searchAudiences.Audiences.Edges[0].Node.Title, "expected to find audience in search")
}
