package clients

import (
	"context"
	"log"
	"os"
	"overdoll/libraries/temporal_dataconverter"
	"time"

	"go.temporal.io/sdk/client"
)

func NewTemporalClient(ctx context.Context) client.Client {

	encryptedDataConverter, err := temporal_dataconverter.NewEncryptDataConverterV1(temporal_dataconverter.Options{
		EncryptionKey: []byte(os.Getenv("APP_KEY")),
	})

	if err != nil {
		log.Fatalln("Unable to create encrypted data converter", err)
	}

	c, err := client.NewClient(client.Options{
		HostPort:  os.Getenv("TEMPORAL_URL"),
		Namespace: os.Getenv("TEMPORAL_NAMESPACE"),
		ConnectionOptions: client.ConnectionOptions{
			HealthCheckTimeout: time.Second * 20,
			DisableHealthCheck: true,
		},
		DataConverter: encryptedDataConverter,
	})

	if err != nil {
		log.Fatalln("Unable to create client", err)
	}

	return c
}
