package rabbit

import (
	"github.com/streadway/amqp"
)

// Publish -
func (conn Conn) Publish(exchange string, routingKey string, data []byte, delivery uint8) error {

	return conn.Channel.Publish(
		// exchange - yours may be different
		exchange,
		routingKey,
		// mandatory - we don't care if there I no queue
		false,
		// immediate - we don't care if there is no consumer on the queue
		false,
		amqp.Publishing{
			ContentType:  "application/json",
			Body:         data,
			DeliveryMode: delivery,
		},
	)
}