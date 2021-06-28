package infraction

import (
	"time"

	"github.com/segmentio/ksuid"
)

type AccountInfractionHistory struct {
	id             string
	userId         string
	reason         string
	expiration     time.Time
	userLockLength int64
}

var (
	LengthPeriodBans = []int64{0, 1, 3, 5, 7}
)

func NewAccountInfractionHistory(userId string, pastUserInfractionHistory []*AccountInfractionHistory, reason string) *AccountInfractionHistory {

	var activeInfractions []*AccountInfractionHistory

	// Only get infraction if not expired yet (so we can add to the next infraction)
	for _, pastInfraction := range pastUserInfractionHistory {
		// if infraction has not expired yet, add it to our list
		if pastInfraction.Expiration().After(time.Now()) {
			activeInfractions = append(activeInfractions, pastInfraction)
		}
	}

	// This will be the user's last ban (this one locks account indefinitely)
	if len(activeInfractions)+1 > len(LengthPeriodBans) {
		return &AccountInfractionHistory{
			id:             ksuid.New().String(),
			userId:         userId,
			reason:         reason,
			expiration:     time.Now(),
			userLockLength: -1,
		}
	}

	index := 0

	if len(activeInfractions) > 0 {
		index = len(activeInfractions) - 1
	}

	banPeriod := LengthPeriodBans[index]

	// Expiration is 4x the ban length
	expiration := time.Now().Add(time.Hour * 24 * time.Duration(banPeriod*4))
	// user account is locked /4 of expiration
	lockLength := time.Now().Add(time.Hour * 24 * time.Duration(banPeriod)).Unix()
	return &AccountInfractionHistory{
		id:             ksuid.New().String(),
		userId:         userId,
		reason:         reason,
		expiration:     expiration,
		userLockLength: lockLength,
	}
}

func (m *AccountInfractionHistory) ID() string {
	return m.id
}

func (m *AccountInfractionHistory) UserId() string {
	return m.userId
}

func (m *AccountInfractionHistory) UserLockLength() int64 {
	return m.userLockLength
}

func (m *AccountInfractionHistory) Reason() string {
	return m.reason
}

func (m *AccountInfractionHistory) Expiration() time.Time {
	return m.expiration
}

func UnmarshalAccountInfractionHistoryFromDatabase(id, userId, reason string, expiration time.Time) *AccountInfractionHistory {
	return &AccountInfractionHistory{
		id:         id,
		userId:     userId,
		reason:     reason,
		expiration: expiration,
	}
}
