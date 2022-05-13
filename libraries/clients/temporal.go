package clients

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.uber.org/zap"
	"log"
	"os"
	"overdoll/libraries/temporal_support"
)

func NewTemporalClient(ctx context.Context) client.Client {

	data, err := temporal_support.NewEncryptDataConverterV1(temporal_support.Options{
		EncryptionKey: []byte(os.Getenv("TEMPORAL_ENCRYPTION_KEY")),
	})

	if err != nil {
		log.Fatalln("unable to create client", err)
	}

	c, err := client.NewClient(client.Options{
		HostPort:      os.Getenv("TEMPORAL_URL"),
		Namespace:     os.Getenv("TEMPORAL_NAMESPACE"),
		DataConverter: data,
		Logger:        temporal_support.NewZapAdapter(zap.L()),
	})

	if err != nil {
		log.Fatalln("unable to create client", err)
	}

	return c
}
