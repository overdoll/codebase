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

	// TODO: calculate infraction expiration based on past infraction
	// also calculate how long the user's account should be locked
	// (expiration.UnixNano() / int64(time.Millisecond)) - (time.Now().UnixNano() / int64(time.Millisecond))
	lockLength := (time.Now().AddDate(0, 0, 1).UnixNano() / int64(time.Millisecond)) - (time.Now().UnixNano() / int64(time.Millisecond))
	return &UserInfractionHistory{
		id:             ksuid.New().String(),
		userId:         userId,
		reason:         reason,
		expiration:     time.Now().AddDate(0, 0, 1),
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
