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

var (
	LengthPeriodBans = []int64{0, 1, 3, 5, 7}
)

func NewUserInfractionHistory(userId string, pastUserInfractionHistory []*UserInfractionHistory, reason string) *UserInfractionHistory {

	var activeInfractions []*UserInfractionHistory

	// Only get infraction if not expired yet (so we can add to the next infraction)
	for _, pastInfraction := range pastUserInfractionHistory {
		// if infraction has not expired yet, add it to our list
		if pastInfraction.Expiration().After(time.Now()) {
			activeInfractions = append(activeInfractions, pastInfraction)
		}
	}

	// This will be the user's last ban (this one locks account indefinitely)
	if len(activeInfractions)+1 > len(LengthPeriodBans) {
		return &UserInfractionHistory{
			id:             ksuid.New().String(),
			userId:         userId,
			reason:         reason,
			expiration:     time.Now(),
			userLockLength: -1,
		}
	}

	banPeriod := LengthPeriodBans[len(activeInfractions)-1]

	// Expiration is 4x the ban length
	expiration := time.Now().Add(time.Hour * 24 * time.Duration(banPeriod*4))
	// user account is locked /4 of expiration
	lockLength := expiration.UnixNano() / int64(time.Millisecond) / int64(4)
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
