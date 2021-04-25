package post

import (
	"time"

	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/libraries/ksuid"
)

type Post struct {
	id         ksuid.UUID
	content    []string
	postedAt   time.Time
	characters []*character.Character
	categories []*category.Category

	artist      *User
	contributor *User
}

func NewPost(id ksuid.UUID, artist *User, contributor *User, content []string, categories []*category.Category, characters []*character.Character) *Post {
	return &Post{
		id:          id,
		artist:      artist,
		contributor: contributor,
		content:     content,
		categories:  categories,
		characters:  characters,
		postedAt:    time.Now(),
	}
}

func (m *Post) ID() ksuid.UUID {
	return m.id
}

func (m *Post) Artist() *User {
	return m.artist
}

func (m *Post) Contributor() *User {
	return m.contributor
}

func (m *Post) RawContent() []string {
	return m.content
}

// TODO: add content getter
func (m *Post) Content() []string {
	return m.content
}

func (m *Post) Categories() []*category.Category {
	return m.categories
}

func (m *Post) Characters() []*character.Character {
	return m.characters
}

func (m *Post) PostedAt() time.Time {
	return m.postedAt
}
