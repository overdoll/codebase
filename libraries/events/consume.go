package events

import (
	"fmt"
	"log"
	"os"
	"reflect"

	"github.com/golang/protobuf/proto"
	"github.com/segmentio/kafka-go"
)

func (conn Connection) Consume(topic string, handler interface{}) {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{conn.address},
		Topic:   topic,
		GroupID: conn.group,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
		// assign the logger to the reader
		Logger: log.New(os.Stdout, "event consumer: ", 0),
	})

	go func() {
		for {
			// the `ReadMessage` method blocks until we receive the next event
			msg, err := r.ReadMessage(conn.context)

			if err != nil {
				fmt.Println("consumer closed - critical error: ", err)
				os.Exit(1)
			}

			var message proto.Message

			err = proto.Unmarshal(msg.Value, message)

			if err != nil {
				// TODO: handle data unmarshal failure
			}

			if typ := reflect.TypeOf(handler); typ.Kind() == reflect.Func {
				handler.(func(msg proto.Message))(message)
			}
		}
	}()
}
