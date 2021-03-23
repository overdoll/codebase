package events

import (
	"context"
	"log"
	"os"

	"github.com/golang/protobuf/proto"
	"github.com/segmentio/kafka-go"
)

func (conn Connection) GetWriter() kafka.Writer {
	return kafka.Writer{
		Addr:        kafka.TCP(conn.address),
		Logger:      log.New(os.Stdout, "event publisher: ", 0),
		Balancer:    &kafka.Hash{},
		Compression: kafka.Snappy,
	}
}

func (conn Connection) Publish(context context.Context, topic string, event proto.Message) error {

	w := conn.GetWriter()

	// Marshal proto message
	msg, err := proto.Marshal(event)

	if err != nil {
		return err
	}

	err = w.WriteMessages(context, kafka.Message{
		Topic: topic,
		Key:   []byte(conn.group),
		Value: msg,
	})

	return err
}

// BulkPublish - bulk publish messages by using a map of topic to proto message
func (conn Connection) BulkPublish(context context.Context, topicEventsMap map[string][]proto.Message) error {
	w := conn.GetWriter()

	var messages []kafka.Message

	for topic, events := range topicEventsMap {

		for _, event := range events {
			// Marshal proto message
			msg, err := proto.Marshal(event)

			if err != nil {
				return err
			}

			// Add to message array
			messages = append(messages, kafka.Message{
				Topic: topic,
				Key:   []byte(conn.group),
				Value: msg,
			})
		}
	}

	return w.WriteMessages(context, messages...)
}
