package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
)

type AudienceModified struct {
	Title string
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

// TestSearchSeries - search some series
func TestSearchAudiences(t *testing.T) {
	t.Parallel()

	client := getGraphqlClient(t)

	var searchAudiences SearchAudience

	err := client.Query(context.Background(), &searchAudiences, map[string]interface{}{
		"title": graphql.String("Non-"),
	})

	require.NoError(t, err)
	require.Len(t, searchAudiences.Audiences.Edges, 1)
	require.Equal(t, "Non-Standard Audience", searchAudiences.Audiences.Edges[0].Node.Title)
}

func TestGetAudience(t *testing.T) {
	t.Parallel()

	client := getGraphqlClient(t)

	var getAudience Audience

	err := client.Query(context.Background(), &getAudience, map[string]interface{}{
		"slug": graphql.String("standard_audience"),
	})

	require.NoError(t, err)
	require.NotNil(t, getAudience.Audience)
	require.Equal(t, "Standard Audience", getAudience.Audience.Title)
}
