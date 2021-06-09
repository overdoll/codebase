package clients

import (
	"context"
	"log"
	"os"
	"time"

	"go.temporal.io/sdk/client"
)

func NewTemporalClient(ctx context.Context) client.Client {

	c, err := client.NewClient(client.Options{
		HostPort:  os.Getenv("TEMPORAL_URL"),
		Namespace: os.Getenv("TEMPORAL_NAMESPACE"),
		ConnectionOptions: client.ConnectionOptions{
			HealthCheckTimeout: time.Second * 20,
		},
	})

	if err != nil {
		log.Fatalln("Unable to create client", err)
	}

	return c
}
