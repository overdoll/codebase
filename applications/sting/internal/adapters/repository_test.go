package adapters_test

import (
	"context"
	"fmt"
	"github.com/bxcodec/faker/v3"
	"github.com/olivere/elastic/v7"
	"github.com/stretchr/testify/require"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"
	"os"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"testing"
	"time"
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

	ctx := context.Background()

	container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: testcontainers.ContainerRequest{
			Image:        "docker.elastic.co/elasticsearch/elasticsearch:7.12.1",
			ExposedPorts: []string{"9200/tcp"},
			WaitingFor:   wait.ForListeningPort("9200").WithStartupTimeout(time.Minute * 2),
		},
		Started: true,
	})

	defer container.Terminate(ctx)

	if err != nil {
		panic(err)
	}

	mappedPort, err := container.MappedPort(ctx, "9200")
	if err != nil {
		panic(err)
	}

	hostIP, err := container.Host(ctx)
	if err != nil {
		panic(err)
	}

	elasticURI = fmt.Sprintf("http://%s:%s", hostIP, mappedPort.Port())

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
		elastic.SetURL(elasticURI),
	)

	return adapters.NewPostsCassandraRepository(bootstrap.InitializeDatabaseSession(), client)
}
