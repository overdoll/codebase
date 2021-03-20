package rabbit

import (
	"os"

	"github.com/streadway/amqp"
)

// Conn - RabbitMQ connection
type Conn struct {
	Channel *amqp.Channel
}

// GetConn - Get RabbitMQ connection
func GetConn() (Conn, error) {
	conn, err := amqp.Dial(os.Getenv("RABBITMQ_URL"))
	if err != nil {
		return Conn{}, err
	}

	ch, err := conn.Channel()
	return Conn{
		Channel: ch,
	}, err
}