package main

import (
	"context"
	"log"
	"os"

	"github.com/elastic/go-elasticsearch/v7"
	"overdoll/applications/indigo/src/server"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/events"
)

func main() {
	ctx := context.Background()

	_, err := bootstrap.NewBootstrap(ctx, "applications/indigo")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	client, err := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{
			os.Getenv("ELASTICSEARCH_URL"),
		},
	})

	if err != nil {
		log.Fatalf("failed to create elasticsearch session: %s", err)
	}

	srv := server.CreateServer(client)

	evt := events.GetConnection(ctx, "indigo")

	evt.RegisterSubscriber("indigo.topic.post_index", srv.IndexPost)

	evt.Run()
}