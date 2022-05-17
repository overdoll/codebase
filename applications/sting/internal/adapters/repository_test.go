package adapters_test

import (
	"github.com/bxcodec/faker/v3"
	"github.com/olivere/elastic/v7"
	"github.com/stretchr/testify/require"
	"os"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"testing"
)

// create buckets before running tests
func seedConfiguration() bool {
	config.Read("applications/sting")

	return true
}

func TestMain(m *testing.M) {
	if !seedConfiguration() {
		os.Exit(1)
	}

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
	return adapters.NewPostsCassandraRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())
}

func newPostRepositoryWithESFailure(t *testing.T) adapters.PostsCassandraElasticsearchRepository {

	// set up some sort of client that is going to fail when making ES calls
	client, _ := elastic.NewClient(
		elastic.SetURL("asdasdasdas-basdurlas-dasdas"),
	)

	return adapters.NewPostsCassandraRepository(bootstrap.InitializeDatabaseSession(), client)
}
