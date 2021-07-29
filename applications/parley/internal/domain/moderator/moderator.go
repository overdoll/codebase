package moderator

import (
	"errors"
	"time"

	"overdoll/libraries/principal"
)

var (
	ErrModeratorNotFound = errors.New("moderator not found")
)

type Moderator struct {
	accountId    string
	lastSelected time.Time
}

func (m *Moderator) ID() string {
	return m.accountId
}

func (m *Moderator) LastSelected() time.Time {
	return m.lastSelected
}

func (m *Moderator) Select() {
	m.lastSelected = time.Now()
}

func (m *Moderator) CanView(requester *principal.Principal) error {

	if requester.IsStaff() {
		return nil
	}

	if err := requester.BelongsToAccount(m.accountId); err != nil {
		return err
	}

	return nil
}

func NewModerator(requester *principal.Principal, accountId string) (*Moderator, error) {

	// make sure we are allowed to create a new moderator
	if !requester.IsStaff() {

		if !requester.IsModerator() {
			return nil, principal.ErrNotAuthorized
		}

		if err := requester.BelongsToAccount(accountId); err != nil {
			return nil, err
		}
	}

	return &Moderator{
		accountId:    accountId,
		lastSelected: time.Now(),
	}, nil
}

func UnmarshalModeratorFromDatabase(id string, lastSelected time.Time) *Moderator {
	return &Moderator{
		accountId:    id,
		lastSelected: lastSelected,
	}
}
