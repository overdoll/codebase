package service_test

import (
	"context"
	"encoding/base64"
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

type SeriesModified struct {
	Id        relay.ID
	Reference string
	Title     string
	Slug      string
	Thumbnail *graphql2.Resource
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

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

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
	require.Equal(t, currentSeriesSlug, searchSeries.Series.Edges[0].Node.Slug, "slug is set properly")

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

	seriesThumbnailId := "04ba807328b59c911a8a37f80447e16a"

	var updateSeriesThumbnail UpdateSeriesThumbnail

	err = client.Mutate(context.Background(), &updateSeriesThumbnail, map[string]interface{}{
		"input": types.UpdateSeriesThumbnailInput{
			ID:        series.Id,
			Thumbnail: seriesThumbnailId,
		},
	})

	require.NoError(t, err, "no error updating series thumbnail")

	require.False(t, updateSeriesThumbnail.UpdateSeriesThumbnail.Series.Thumbnail.Processed, "not yet processed")

	grpcClient := getGrpcCallbackClient(t)

	_, err = grpcClient.UpdateResources(context.Background(), &proto.UpdateResourcesRequest{Resources: []*proto.Resource{{
		Id:          seriesThumbnailId,
		ItemId:      updateSeriesThumbnail.UpdateSeriesThumbnail.Series.Reference,
		Processed:   true,
		Type:        proto.ResourceType_IMAGE,
		ProcessedId: uuid.New().String(),
		Private:     false,
		Width:       100,
		Height:      100,
		Token:       "SERIES",
	}}})

	require.NoError(t, err, "no error updating resource")

	series = getSeriesBySlug(t, client, currentSeriesSlug)

	require.NotNil(t, series, "expected to have found series")
	require.Equal(t, fake.Title, series.Title, "title has been updated")
	require.NotNil(t, series.Thumbnail, "has a thumbnail")
	require.True(t, series.Thumbnail.Processed, "thumbnail is processed")
}

func TestCreateCharacter_update_series_and_search_character(t *testing.T) {

	seriesId := "1pcKiQL7dgUW8CIN7uO1wqFaMql"
	relaySeriesId := relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Series{}, seriesId))))

	accountId := uuid.New().String()
	mockAccountStaff(t, accountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	fake := TestCharacter{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake category")
	currentCharacterSlug := fake.Slug

	var createCharacter CreateCharacter

	err = client.Mutate(context.Background(), &createCharacter, map[string]interface{}{
		"input": types.CreateCharacterInput{
			SeriesID: relaySeriesId,
			Slug:     currentCharacterSlug,
			Name:     fake.Name,
		},
	})

	require.NoError(t, err, "no error creating character")

	refreshCharacterIndex(t)

	series := getSeriesBySlug(t, client, "ForeignerOnMars")
	seriesTitle := series.Title

	var searchCharacters SearchCharacters

	err = client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"name": graphql.String(fake.Name),
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters.Edges, 1, "only found 1 result")
	require.Equal(t, seriesTitle, searchCharacters.Characters.Edges[0].Node.Series.Title, "correct title")

	fakeSeries := TestSeries{}
	err = faker.FakeData(&fakeSeries)
	require.NoError(t, err, "no error generating series")

	var updateSeriesTitle UpdateSeriesTitle

	err = client.Mutate(context.Background(), &updateSeriesTitle, map[string]interface{}{
		"input": types.UpdateSeriesTitleInput{
			ID:     series.Id,
			Title:  fakeSeries.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating series title")

	refreshCharacterIndex(t)

	err = client.Query(context.Background(), &searchCharacters, map[string]interface{}{
		"name": graphql.String(fake.Name),
	})

	require.NoError(t, err)
	require.Len(t, searchCharacters.Characters.Edges, 1, "only found 1 result")
	require.Equal(t, "ForeignerOnMars", searchCharacters.Characters.Edges[0].Node.Series.Slug, "correct series")
	require.Equal(t, fakeSeries.Title, searchCharacters.Characters.Edges[0].Node.Series.Title, "correct updated title for the series when it was updated")
}
