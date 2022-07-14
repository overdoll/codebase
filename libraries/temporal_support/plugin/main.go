package main

import (
	"encoding/json"
	"fmt"
	"github.com/golang/protobuf/jsonpb"
	"github.com/gorilla/websocket"
	commonpb "go.temporal.io/api/common/v1"
	"go.temporal.io/sdk/converter"
	"net"
	"net/http"
	"os"
	"overdoll/libraries/temporal_support"
	"strconv"
	"strings"
)

var (
	dataConverter = converter.GetDefaultDataConverter()
)

func SetCurrent(dc converter.DataConverter) {
	dataConverter = dc
}

func GetCurrent() converter.DataConverter {
	return dataConverter
}

const dataConverterURL = "%s/data-converter/%d"

type PayloadRequest struct {
	RequestID string `json:"requestId"`
	Payload   string `json:"payload"`
}

type PayloadResponse struct {
	RequestID string `json:"requestId"`
	Content   string `json:"content"`
}

func processMessage(c *websocket.Conn) error {
	mt, message, err := c.ReadMessage()
	if err != nil {
		return err
	}

	var payloadRequest PayloadRequest
	err = json.Unmarshal(message, &payloadRequest)
	if err != nil {
		return fmt.Errorf("invalid payload request: %w", err)
	}

	var payload commonpb.Payload
	err = jsonpb.UnmarshalString(payloadRequest.Payload, &payload)
	if err != nil {
		return fmt.Errorf("invalid payload data: %w", err)
	}

	payloadResponse := PayloadResponse{
		RequestID: payloadRequest.RequestID,
		Content:   GetCurrent().ToString(&payload),
	}

	var response []byte
	response, err = json.Marshal(payloadResponse)
	if err != nil {
		return fmt.Errorf("unable to marshal response: %w", err)
	}

	err = c.WriteMessage(mt, response)
	if err != nil {
		return fmt.Errorf("unable to write response: %w", err)
	}

	return nil
}

func buildPayloadHandler(origin string) func(http.ResponseWriter, *http.Request) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			if r.Header.Get("Origin") != origin {
				fmt.Printf("invalid origin: %s\n", origin)
				return false
			}
			return true
		},
	}

	return func(res http.ResponseWriter, req *http.Request) {
		c, err := upgrader.Upgrade(res, req, nil)
		if err != nil {
			fmt.Printf("data converter websocket upgrade failed: %v\n", err)
			return
		}
		defer c.Close()

		for {
			err := processMessage(c)
			if err != nil {
				if closeError, ok := err.(*websocket.CloseError); ok {
					if closeError.Code == websocket.CloseNoStatusReceived ||
						closeError.Code == websocket.CloseNormalClosure {
						return
					}
				}
				fmt.Printf("data converter websocket error: %v\n", err)

				return
			}
		}
	}
}

func main() {

	c, err := temporal_support.NewEncryptDataConverterV1(temporal_support.Options{
		EncryptionKey: []byte(os.Getenv("TEMPORAL_ENCRYPTION_KEY")),
	})

	if err != nil {
		panic(err)
	}

	SetCurrent(c)

	listener, err := net.Listen("tcp", "localhost:"+strconv.Itoa(12345))
	if err != nil {
		panic(fmt.Errorf("unable to create listener: %s", err))
	}
	origin := strings.TrimSuffix("http://localhost:8088", "/")
	port := listener.Addr().(*net.TCPAddr).Port
	url := fmt.Sprintf(dataConverterURL, origin, port)

	fmt.Printf("To configure your Web UI session to use the local data converter use this URL:\n")
	fmt.Printf("\t%s\n", url)

	http.HandleFunc("/", buildPayloadHandler(origin))
	if err := http.Serve(listener, nil); err != nil {
		panic(fmt.Errorf("unable to start HTTP server for data converter listener: %s", err))
	}
}
