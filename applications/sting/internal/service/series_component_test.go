package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type SeriesModified struct {
	Title string
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

// TestSearchSeries - search some series
func TestSearchSeries(t *testing.T) {
	t.Parallel()

	client, _ := getGraphqlClient(t, nil)

	var searchSeries SearchSeries

	err := client.Query(context.Background(), &searchSeries, map[string]interface{}{
		"title": graphql.String("Foreigner On Mars"),
	})

	require.NoError(t, err)
	require.Len(t, searchSeries.Series.Edges, 1)
	require.Equal(t, "Foreigner On Mars", searchSeries.Series.Edges[0].Node.Title)
}

func TestGetSerial(t *testing.T) {
	t.Parallel()

	client, _ := getGraphqlClient(t, nil)

	var getSerial Serial

	err := client.Query(context.Background(), &getSerial, map[string]interface{}{
		"slug": graphql.String("veterans_of_our_future"),
	})

	require.NoError(t, err)
	require.NotNil(t, getSerial.Serial)
	require.Equal(t, "Veterans Of Our Future", getSerial.Serial.Title)
}
