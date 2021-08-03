package infraction

import (
	"errors"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountInfractionHistory struct {
	*paging.Node

	id             string
	accountId      string
	reason         string
	expiration     time.Time
	userLockLength int64
}

var (
	LengthPeriodBans = []int64{0, 1, 3, 5, 7}
)

var (
	ErrAccountInfractionHistoryNotFound = errors.New("account infraction history not found")
)

func NewAccountInfractionHistory(requester *principal.Principal, accountId string, pastUserInfractionHistory []*AccountInfractionHistory, reason string) (*AccountInfractionHistory, error) {

	if !(requester.IsStaff() || requester.IsModerator()) {
		return nil, principal.ErrNotAuthorized
	}

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
			accountId:      accountId,
			reason:         reason,
			expiration:     time.Now(),
			userLockLength: -1,
		}, nil
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
		accountId:      accountId,
		reason:         reason,
		expiration:     expiration,
		userLockLength: lockLength,
	}, nil
}

func (m *AccountInfractionHistory) ID() string {
	return m.id
}

func (m *AccountInfractionHistory) AccountId() string {
	return m.accountId
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

func (m *AccountInfractionHistory) CanView(requester *principal.Principal) error {
	return CanViewAccountInfractionHistory(requester)
}

func (m *AccountInfractionHistory) CanDelete(requester *principal.Principal) error {
	return CanViewAccountInfractionHistory(requester)
}

func UnmarshalAccountInfractionHistoryFromDatabase(id, userId, reason string, expiration time.Time) *AccountInfractionHistory {
	return &AccountInfractionHistory{
		id:         id,
		accountId:  userId,
		reason:     reason,
		expiration: expiration,
	}
}

func CanViewAccountInfractionHistory(requester *principal.Principal) error {
	if !(requester.IsModerator() || requester.IsStaff()) {
		return principal.ErrNotAuthorized
	}

	return nil
}
