package events

import (
	"context"
	"os"
)

type Connection struct {
	address string
	group   string
	context context.Context
}

func GetConnection(context context.Context, group string) Connection {
	return Connection{
		address: os.Getenv("KAFKA_URL"),
		group:   group,
		context: context,
	}
}
