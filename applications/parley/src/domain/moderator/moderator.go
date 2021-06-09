package moderator

import (
	"time"
)

type Moderator struct {
	id           string
	lastSelected time.Time
}

func (m *Moderator) ID() string {
	return m.id
}

func (m *Moderator) LastSelected() time.Time {
	return m.lastSelected
}

func (m *Moderator) Select() {
	m.lastSelected = time.Now()
}

func NewModerator(id string) *Moderator {
	return &Moderator{
		id:           id,
		lastSelected: time.Now(),
	}
}

func UnmarshalModeratorFromDatabase(id string, lastSelected time.Time) *Moderator {
	return &Moderator{
		id:           id,
		lastSelected: lastSelected,
	}
}
