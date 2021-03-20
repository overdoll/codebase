package events

import (
	"context"
	"fmt"
	"log"
	"os"
	"reflect"

	"github.com/golang/protobuf/proto"
	"github.com/segmentio/kafka-go"
)

// RegisterSubscriber - Add our subscriber to the map of subscribers for each topic
func (conn Connection) RegisterSubscriber(topic string, handler interface{}) {
	conn.subscribers[topic] = &Subscriber{handler: handler}
}

// Run - Run consume methods for all of our subscribers in a goroutine
func (conn Connection) Run() {
	for topic, subscriber := range conn.subscribers {
		r := kafka.NewReader(kafka.ReaderConfig{
			Brokers: []string{conn.address},
			Topic:   topic,
			GroupID: conn.group,
			MinBytes: 10e3, // 10KB
			MaxBytes: 10e6, // 10MB
			// assign the logger to the reader
			Logger: log.New(os.Stdout, "event consumer: ", 0),
		})

		// Get our handler
		handler := subscriber.handler

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
					// TODO: handle data unmarshal failure. for now, it will discard the message
				}

				if typ := reflect.TypeOf(handler); typ.Kind() == reflect.Func {
					handler.(func(context context.Context, msg proto.Message))(conn.context, message)
				}
			}
		}()
	}
}