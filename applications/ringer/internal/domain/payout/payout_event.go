package payout

import (
	"overdoll/libraries/uuid"
	"time"
)

type Event struct {
	id        string
	timestamp time.Time
	error     string
}

func NewErrorEvent(err string, timestamp time.Time) (*Event, error) {
	return &Event{
		id:        uuid.New().String(),
		timestamp: timestamp,
		error:     err,
	}, nil
}

func (e *Event) Id() string {
	return e.id
}

func (e *Event) Timestamp() time.Time {
	return e.timestamp
}

func (e *Event) Error() string {
	return e.error
}
