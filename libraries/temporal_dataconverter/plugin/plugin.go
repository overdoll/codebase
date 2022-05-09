package main

import (
	"fmt"
	"github.com/hashicorp/go-hclog"
	"net/rpc"
	"os/exec"

	"github.com/hashicorp/go-plugin"
	commonpb "go.temporal.io/api/common/v1"
	"go.temporal.io/sdk/converter"
)

type DataConverterRPC struct {
	client *rpc.Client
}

func NewDataConverterPlugin(name string) (converter.DataConverter, error) {
	client, err := newPluginClient(DataConverterPluginType, name)
	if err != nil {
		return nil, fmt.Errorf("unable to register plugin: %w", err)
	}

	dataConverter, ok := client.(converter.DataConverter)
	if !ok {
		return nil, fmt.Errorf("constructed plugin client type %T doesn't implement converter.DataConverter interface", client)
	}

	return dataConverter, nil
}

func (g *DataConverterRPC) FromPayload(payload *commonpb.Payload, valuePtr interface{}) error {
	err := g.client.Call("Plugin.FromPayload", payload, valuePtr)
	if err != nil {
		return err
	}

	return nil
}

func (g *DataConverterRPC) FromPayloads(payloads *commonpb.Payloads, valuePtr ...interface{}) error {
	err := g.client.Call("Plugin.FromPayloads", payloads, valuePtr)
	if err != nil {
		return err
	}

	return nil
}

func (g *DataConverterRPC) ToPayload(value interface{}) (*commonpb.Payload, error) {
	var payload commonpb.Payload
	err := g.client.Call("Plugin.ToPayload", value, &payload)
	if err != nil {
		return nil, err
	}

	return &payload, nil
}

func (g *DataConverterRPC) ToPayloads(values ...interface{}) (*commonpb.Payloads, error) {
	var payloads commonpb.Payloads
	err := g.client.Call("Plugin.ToPayloads", values, &payloads)
	if err != nil {
		return nil, err
	}

	return &payloads, nil
}

func (g *DataConverterRPC) ToString(input *commonpb.Payload) string {
	var resp string
	err := g.client.Call("Plugin.ToString", input, &resp)
	if err != nil {
		return err.Error()
	}

	return resp
}

func (g *DataConverterRPC) ToStrings(input *commonpb.Payloads) []string {
	var resp []string
	err := g.client.Call("Plugin.ToStrings", input, &resp)
	if err != nil {
		return []string{err.Error()}
	}

	return resp
}

type DataConverterRPCServer struct {
	Impl converter.DataConverter
}

func (s *DataConverterRPCServer) FromPayload(input *commonpb.Payload, resp *interface{}) error {
	var result interface{}
	err := s.Impl.FromPayload(input, result)
	resp = &result
	return err
}

func (s *DataConverterRPCServer) FromPayloads(input *commonpb.Payloads, resp *[]interface{}) error {
	var results []interface{}
	err := s.Impl.FromPayloads(input, results)
	resp = &results
	return err
}

func (s *DataConverterRPCServer) ToPayload(value interface{}, resp *commonpb.Payload) error {
	resp, err := s.Impl.ToPayload(value)
	return err
}

func (s *DataConverterRPCServer) ToPayloads(values []interface{}, resp *commonpb.Payloads) error {
	resp, err := s.Impl.ToPayloads(values)
	return err
}

func (s *DataConverterRPCServer) ToString(input *commonpb.Payload, resp *string) error {
	*resp = s.Impl.ToString(input)
	return nil
}

func (s *DataConverterRPCServer) ToStrings(input *commonpb.Payloads, resp *[]string) error {
	*resp = s.Impl.ToStrings(input)
	return nil
}

type DataConverterPlugin struct {
	Impl converter.DataConverter
}

func (p *DataConverterPlugin) Server(*plugin.MuxBroker) (interface{}, error) {
	return &DataConverterRPCServer{Impl: p.Impl}, nil
}

func (DataConverterPlugin) Client(b *plugin.MuxBroker, c *rpc.Client) (interface{}, error) {
	return &DataConverterRPC{client: c}, nil
}

const (
	DataConverterPluginType   = "DataConverter"
	HeadersProviderPluginType = "HeadersProvider"
)

var (
	PluginHandshakeConfig = plugin.HandshakeConfig{
		ProtocolVersion:  1,
		MagicCookieKey:   "TEMPORAL_CLI_PLUGIN",
		MagicCookieValue: "abb3e448baf947eba1847b10a38554db",
	}

	pluginMap = map[string]plugin.Plugin{
		DataConverterPluginType: &DataConverterPlugin{},
	}
)

func newPluginClient(kind string, name string) (interface{}, error) {
	pluginClient := plugin.NewClient(&plugin.ClientConfig{
		HandshakeConfig: PluginHandshakeConfig,
		Plugins:         pluginMap,
		Cmd:             exec.Command(name),
		Managed:         true,
		Logger: hclog.New(&hclog.LoggerOptions{
			Name:  "tctl",
			Level: hclog.LevelFromString("INFO"),
		}),
	})

	rpcClient, err := pluginClient.Client()
	if err != nil {
		return nil, fmt.Errorf("unable to create plugin client: %w", err)
	}

	return rpcClient.Dispense(kind)
}

func StopPlugins() {
	plugin.CleanupClients()
}
