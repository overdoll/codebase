package events

import (
	"context"
	"os"
)

type Subscriber struct {
	handler interface{}
}

type Connection struct {
	address string
	group   string
	context context.Context
	subscribers map[string]*Subscriber
}

func GetConnection(context context.Context, group string) Connection {
	return Connection{
		address: os.Getenv("KAFKA_URL"),
		group:   group,
		context: context,
		subscribers: make(map[string]*Subscriber),
	}
}
