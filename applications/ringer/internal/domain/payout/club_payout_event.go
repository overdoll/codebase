package payout

import (
	"overdoll/libraries/uuid"
	"time"
)

type ClubPayoutEvent struct {
	id        string
	timestamp time.Time
	error     string
}

func NewClubPayoutErrorEvent(err string, timestamp time.Time) (*ClubPayoutEvent, error) {
	return &ClubPayoutEvent{
		id:        uuid.New().String(),
		timestamp: timestamp,
		error:     err,
	}, nil
}

func (e *ClubPayoutEvent) Id() string {
	return e.id
}

func (e *ClubPayoutEvent) Timestamp() time.Time {
	return e.timestamp
}

func (e *ClubPayoutEvent) Error() string {
	return e.error
}

func UnmarshalClubPayoutEventFromDatabase(id string, timestamp time.Time, error string) *ClubPayoutEvent {
	return &ClubPayoutEvent{
		id:        id,
		timestamp: timestamp,
		error:     error,
	}
}
