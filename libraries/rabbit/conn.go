package rabbit

import (
	"github.com/streadway/amqp"
)

// Conn - RabbitMQ connection
type Conn struct {
	Channel *amqp.Channel
}

// GetConn - Get RabbitMQ connection
func GetConn(rabbitURL string) (Conn, error) {
	conn, err := amqp.Dial(rabbitURL)
	if err != nil {
		return Conn{}, err
	}

	ch, err := conn.Channel()
	return Conn{
		Channel: ch,
	}, err
}