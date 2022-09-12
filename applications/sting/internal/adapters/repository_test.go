package adapters_test

import (
	"github.com/bxcodec/faker/v3"
	"github.com/olivere/elastic/v7"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/http/httptest"
	"os"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"testing"
)

var elasticURI string

// create buckets before running tests
func seedConfiguration() bool {
	config.Read("applications/sting")

	return true
}

func TestMain(m *testing.M) {
	if !seedConfiguration() {
		os.Exit(1)
	}
	bootstrap.NewBootstrap()

	handler := http.NotFound
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handler(w, r)
	}))
	defer ts.Close()

	handler = func(w http.ResponseWriter, r *http.Request) {

		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`
			{
			  "_shards": {
				"total": 1,
				"failed": 1,
				"successful": 0
			  },
			  "_index": "tttttt",
			  "_id": "1",
			  "_version": 1,
			  "_seq_no": 0,
			  "_primary_term": 1,
			  "result": "failed"
			}
			`))
	}

	elasticURI = ts.URL

	os.Exit(m.Run())
}

type TestSlug struct {
	Slug string `faker:"username"`
}

func createFakeSlug(t *testing.T) string {
	fake := TestSlug{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake slug")
	return fake.Slug
}

func newPostRepository(t *testing.T) adapters.PostsCassandraElasticsearchRepository {
	return adapters.NewPostsCassandraRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession(), bootstrap.InitializeAWSSession(), bootstrap.InitializeRedisSession())
}

func newPostRepositoryWithESFailure(t *testing.T) adapters.PostsCassandraElasticsearchRepository {

	// set up some sort of client that is going to fail when making ES calls
	client, err := elastic.NewSimpleClient(
		elastic.SetURL(elasticURI),
	)

	if err != nil {
		panic(err)
	}

	return adapters.NewPostsCassandraRepository(bootstrap.InitializeDatabaseSession(), client, bootstrap.InitializeAWSSession(), bootstrap.InitializeRedisSession())
}
