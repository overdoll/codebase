package infraction

import (
	"time"

	"github.com/segmentio/ksuid"
)

type UserInfractionHistory struct {
	id             string
	userId         string
	reason         string
	expiration     time.Time
	userLockLength int64
}

func NewUserInfractionHistory(userId string, pastUserInfractionHistory []*UserInfractionHistory, reason string) *UserInfractionHistory {

	var activeInfractions []*UserInfractionHistory

	// Only get infraction if not expired yet (so we can add to the next infraction)
	for _, pastInfraction := range pastUserInfractionHistory {
		// if infraction has not expired yet, add it to our list
		if pastInfraction.Expiration().After(time.Now()) {
			activeInfractions = append(activeInfractions, pastInfraction)
		}
	}

	// How long the next infraction will take to expire (considers all past infractions that are active)
	expiration := time.Now().Add(time.Hour * 24 * time.Duration(len(activeInfractions)))

	// TODO: how long should the user account be locked for??
	lockLength := (expiration.UnixNano() / int64(time.Millisecond) / int64(4)) - (time.Now().UnixNano() / int64(time.Millisecond))
	return &UserInfractionHistory{
		id:             ksuid.New().String(),
		userId:         userId,
		reason:         reason,
		expiration:     expiration,
		userLockLength: lockLength,
	}
}

func (m *UserInfractionHistory) ID() string {
	return m.id
}

func (m *UserInfractionHistory) UserId() string {
	return m.userId
}

func (m *UserInfractionHistory) UserLockLength() int64 {
	return m.userLockLength
}

func (m *UserInfractionHistory) Reason() string {
	return m.reason
}

func (m *UserInfractionHistory) Expiration() time.Time {
	return m.expiration
}

func UnmarshalUserInfractionHistoryFromDatabase(id, userId, reason string, expiration time.Time) *UserInfractionHistory {
	return &UserInfractionHistory{
		id:         id,
		userId:     userId,
		reason:     reason,
		expiration: expiration,
	}
}
