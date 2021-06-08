package moderator

import (
	"time"
)

type Moderator struct {
	id                   string
	pendingPostsShuffled int
	lastSelected         time.Time
}

func (m *Moderator) ID() string {
	return m.id
}

func (m *Moderator) PendingPostsShuffled() int {
	return m.pendingPostsShuffled
}

func (m *Moderator) LastSelected() time.Time {
	return m.lastSelected
}

func (m *Moderator) Shuffle() {
	m.pendingPostsShuffled += 1
}

func NewModerator(id string) *Moderator {
	return &Moderator{
		id:                   id,
		pendingPostsShuffled: 0,
		lastSelected:         time.Now(),
	}
}

func UnmarshalModeratorFromDatabase(id string, pendingPostsShuffled int, lastSelected time.Time) *Moderator {
	return &Moderator{
		id:                   id,
		pendingPostsShuffled: pendingPostsShuffled,
		lastSelected:         lastSelected,
	}
}
