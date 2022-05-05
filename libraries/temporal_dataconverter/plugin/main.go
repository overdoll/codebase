package main

import (
	"github.com/hashicorp/go-plugin"
	"overdoll/libraries/temporal_dataconverter"
)

func main() {
	c, err := temporal_dataconverter.NewEncryptDataConverterV1(temporal_dataconverter.Options{
		EncryptionKey: []byte("AES256Key-32Characters1234567890"),
	})

	if err != nil {
		panic(err)
	}

	var pluginMap = map[string]plugin.Plugin{
		DataConverterPluginType: &DataConverterPlugin{
			Impl: c,
		},
	}

	plugin.Serve(&plugin.ServeConfig{
		HandshakeConfig: PluginHandshakeConfig,
		Plugins:         pluginMap,
	})
}
