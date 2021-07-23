package moderator

import (
	"errors"
	"time"
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

func NewModerator(id string) *Moderator {
	return &Moderator{
		accountId:    id,
		lastSelected: time.Now(),
	}
}

func UnmarshalModeratorFromDatabase(id string, lastSelected time.Time) *Moderator {
	return &Moderator{
		accountId:    id,
		lastSelected: lastSelected,
	}
}
