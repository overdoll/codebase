package adapters_test

import (
	"context"
	"encoding/json"
	"github.com/bxcodec/faker/v3"
	"github.com/olivere/elastic/v7"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

type TestSearchTerm struct {
	Query string `faker:"username"`
}

func TestSearchAndGetSavedResults(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepository(t)

	fake := TestSearchTerm{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake search term")

	accId := uuid.New().String()

	ctx, err := passport.NewTestContext(context.Background(), &accId)
	require.NoError(t, err)

	pass := passport.FromContext(ctx)

	principal := testing_tools.NewDefaultPrincipal(accId)

	first := 10

	cursor, err := paging.NewCursor(nil, nil, &first, nil)
	require.NoError(t, err)

	results, err := postRepo.Search(ctx, pass, principal, cursor, fake.Query)
	require.NoError(t, err, "no error for searching")

	require.Len(t, results, 0, "no results for an empty search")

	es := bootstrap.InitializeElasticSearchSession()
	_, err = es.Refresh(adapters.SearchHistoryIndexName).Do(ctx)
	require.NoError(t, err, "no error refreshing")

	response, err := es.Search(adapters.SearchHistoryIndexName).Query(elastic.NewMatchQuery("device_id", pass.DeviceID())).Do(ctx)
	require.NoError(t, err, "no error searching history")

	require.Equal(t, int64(1), response.Hits.TotalHits.Value, "should have found 1 search result")

	type searchHistoryIndexResponse struct {
		Query string
	}

	var resp searchHistoryIndexResponse

	err = json.Unmarshal(response.Hits.Hits[0].Source, &resp)
	require.NoError(t, err, "no error unmarshalling search history index response")

	require.Equal(t, fake.Query, resp.Query, "should have found our query")
}
