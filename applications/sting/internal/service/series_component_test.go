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

type SeriesModified struct {
	Title string
	Slug  string
}

type SearchSeries struct {
	Series struct {
		Edges []struct {
			Node SeriesModified
		}
	} `graphql:"series(title: $title)"`
}

type Serial struct {
	Serial *SeriesModified `graphql:"serial(slug: $slug)"`
}

type CreateSeries struct {
	CreateSeries *struct {
		Series *SeriesModified
	} `graphql:"createSeries(input: $input)"`
}

type TestSeries struct {
	Title string `faker:"username"`
	Slug  string `faker:"username"`
}

func refreshSeriesIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.SeriesIndexName).Do(context.Background())
	require.NoError(t, err)
}

func TestCreateSeries_update_and_search(t *testing.T) {
	t.Parallel()

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	fake := TestSeries{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake series")

	var createSeries CreateSeries

	err = client.Mutate(context.Background(), &createSeries, map[string]interface{}{
		"input": types.CreateSeriesInput{
			Slug:  fake.Slug,
			Title: fake.Title,
		},
	})

	require.NoError(t, err, "no error creating character")

	refreshSeriesIndex(t)

	var getSerial Serial

	err = client.Query(context.Background(), &getSerial, map[string]interface{}{
		"slug": graphql.String(fake.Slug),
	})

	require.NoError(t, err)
	require.NotNil(t, getSerial.Serial)
	require.Equal(t, fake.Title, getSerial.Serial.Title, "correct title")

	var searchSeries SearchSeries

	err = client.Query(context.Background(), &searchSeries, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchSeries.Series.Edges, 1, "found 1 result")
	require.Equal(t, fake.Title, searchSeries.Series.Edges[0].Node.Title, "found the correct result")
}
