package events

import (
	"fmt"
	"log"
	"os"

	"github.com/segmentio/kafka-go"
)

func (conn Connection) Consume(topic string, handler func(msg kafka.Message) bool) {
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

			handler(msg)
		}
	}()
}
