package main

import (
	"github.com/hashicorp/go-plugin"
	"os"
	"overdoll/libraries/temporal_support"
)

func main() {

	c, err := temporal_support.NewEncryptDataConverterV1(temporal_support.Options{
		EncryptionKey: []byte(os.Getenv("TEMPORAL_ENCRYPTION_KEY")),
	})

	if err != nil {
		panic(err)
	}

	plugin.Serve(&plugin.ServeConfig{
		HandshakeConfig: PluginHandshakeConfig,
		Plugins: map[string]plugin.Plugin{
			DataConverterPluginType: &DataConverterPlugin{
				Impl: c,
			},
		},
	})
}
