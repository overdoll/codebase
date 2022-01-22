package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/graphql/relay"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type SeriesModified struct {
	Id        relay.ID
	Title     string
	Slug      string
	Thumbnail *struct {
		Id string
	}
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

type UpdateSeriesTitle struct {
	UpdateSeriesTitle *struct {
		Series *SeriesModified
	} `graphql:"updateSeriesTitle(input: $input)"`
}

type UpdateSeriesThumbnail struct {
	UpdateSeriesThumbnail *struct {
		Series *SeriesModified
	} `graphql:"updateSeriesThumbnail(input: $input)"`
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

func getSeriesBySlug(t *testing.T, client *graphql.Client, slug string) *SeriesModified {
	var getSerial Serial

	err := client.Query(context.Background(), &getSerial, map[string]interface{}{
		"slug": graphql.String(slug),
	})

	require.NoError(t, err)

	return getSerial.Serial
}

func TestCreateSeries_update_and_search(t *testing.T) {
	t.Parallel()

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	fake := TestSeries{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake series")
	currentSeriesSlug := fake.Slug

	var createSeries CreateSeries

	err = client.Mutate(context.Background(), &createSeries, map[string]interface{}{
		"input": types.CreateSeriesInput{
			Slug:  currentSeriesSlug,
			Title: fake.Title,
		},
	})

	require.NoError(t, err, "no error creating character")

	refreshSeriesIndex(t)

	series := getSeriesBySlug(t, client, currentSeriesSlug)

	require.NotNil(t, series)
	require.Equal(t, fake.Title, series.Title, "correct title")

	var searchSeries SearchSeries

	err = client.Query(context.Background(), &searchSeries, map[string]interface{}{
		"title": graphql.String(fake.Title),
	})

	require.NoError(t, err)
	require.Len(t, searchSeries.Series.Edges, 1, "found 1 result")
	require.Equal(t, fake.Title, searchSeries.Series.Edges[0].Node.Title, "found the correct result")

	fake = TestSeries{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error generating series")

	var updateSeriesTitle UpdateSeriesTitle

	err = client.Mutate(context.Background(), &updateSeriesTitle, map[string]interface{}{
		"input": types.UpdateSeriesTitleInput{
			ID:     series.Id,
			Title:  fake.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating series title")

	var updateSeriesThumbnail UpdateSeriesThumbnail

	err = client.Mutate(context.Background(), &updateSeriesThumbnail, map[string]interface{}{
		"input": types.UpdateSeriesThumbnailInput{
			ID:        series.Id,
			Thumbnail: "test",
		},
	})

	require.NoError(t, err, "no error updating series thumbnail")

	series = getSeriesBySlug(t, client, currentSeriesSlug)

	require.NotNil(t, series, "expected to have found series")
	require.Equal(t, fake.Title, series.Title, "title has been updated")
	require.NotNil(t, series.Thumbnail, "has a thumbnail")
}
