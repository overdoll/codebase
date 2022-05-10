package payout

import (
	"overdoll/libraries/uuid"
	"time"
)

type ClubPayoutEvent struct {
	id        string
	createdAt time.Time
	error     string
}

func NewClubPayoutErrorEvent(err string, timestamp time.Time) (*ClubPayoutEvent, error) {
	return &ClubPayoutEvent{
		id:        uuid.New().String(),
		createdAt: timestamp,
		error:     err,
	}, nil
}

func (e *ClubPayoutEvent) Id() string {
	return e.id
}

func (e *ClubPayoutEvent) CreatedAt() time.Time {
	return e.createdAt
}

func (e *ClubPayoutEvent) Error() string {
	return e.error
}

func UnmarshalClubPayoutEventFromDatabase(id string, createdAt time.Time, error string) *ClubPayoutEvent {
	return &ClubPayoutEvent{
		id:        id,
		createdAt: createdAt,
		error:     error,
	}
}
