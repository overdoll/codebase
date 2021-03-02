package events

import (
	"log"
	"os"

	"github.com/golang/protobuf/proto"
	"github.com/segmentio/kafka-go"
)

func (conn Connection) Publish(topic string, event proto.Message) error {

	w := kafka.Writer{
		Addr: kafka.TCP(conn.address),
		Topic:   topic,
		Logger: log.New(os.Stdout, "event publisher: ", 0),
		Balancer: &kafka.Hash{},
		Compression: kafka.Snappy,
	}

	err := w.WriteMessages(conn.context, kafka.Message{
		Key:       []byte(conn.group),
		Value:     []byte(event.String()),
	})

	return err
}
