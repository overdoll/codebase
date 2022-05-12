package main

import (
	"github.com/hashicorp/go-plugin"
	"go.temporal.io/sdk/converter"
	"overdoll/libraries/temporal_support"
)

func main() {
	plugin.Serve(&plugin.ServeConfig{
		HandshakeConfig: PluginHandshakeConfig,
		Plugins: map[string]plugin.Plugin{
			DataConverterPluginType: &DataConverterPlugin{
				Impl: temporal_support.NewEncryptionDataConverter(
					converter.GetDefaultDataConverter(),
					temporal_support.DataConverterOptions{Compress: true},
				),
			},
		},
	})
}
