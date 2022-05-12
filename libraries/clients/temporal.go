package clients

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/converter"
	"go.uber.org/zap"
	"log"
	"os"
	"overdoll/libraries/temporal_support"
)

func NewTemporalClient(ctx context.Context) client.Client {

	c, err := client.NewClient(client.Options{
		HostPort:  os.Getenv("TEMPORAL_URL"),
		Namespace: os.Getenv("TEMPORAL_NAMESPACE"),
		// If you intend to use the same encryption key for all workflows you can
		// set the KeyID for the encryption encoder like so:
		//
		// Set DataConverter to ensure that workflow inputs and results are
		// encrypted/decrypted as required.
		//
		//   DataConverter: encryption.NewEncryptionDataConverter(
		// 	  converter.GetDefaultDataConverter(),
		// 	  encryption.DataConverterOptions{KeyID: "test", Compress: true},
		//   ),
		//
		// In this case you do not need to use a ContextPropagator.
		//
		// If you need to vary the encryption key per workflow, you can instead
		// leave the KeyID unset for the encoder and supply it via the workflow
		// context as shown below. For this use case you will also need to use a
		// ContextPropagator so that KeyID is also available in the context for activities.
		//
		// Set DataConverter to ensure that workflow inputs and results are
		// encrypted/decrypted as required.
		DataConverter: temporal_support.NewEncryptionDataConverter(
			converter.GetDefaultDataConverter(),
			temporal_support.DataConverterOptions{Compress: true, KeyID: "production"},
		),
		// Use a ContextPropagator so that the KeyID value set in the workflow context is
		// also available in the context for activities.
		//	ContextPropagators: []workflow.ContextPropagator{temporal_support.NewContextPropagator()},
		Logger: temporal_support.NewZapAdapter(zap.L()),
	})

	if err != nil {
		log.Fatalln("Unable to create client", err)
	}

	return c
}
