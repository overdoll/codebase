package post

import (
	"os"
	"time"
)

type Post struct {
	id         string
	content    []string
	postedAt   time.Time
	characters []*Character
	categories []*Category

	artist      *Artist
	contributor *User
}

func NewPost(id string, artist *Artist, contributor *User, content []string, categories []*Category, characters []*Character) *Post {
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

func (m *Post) ID() string {
	return m.id
}

func (m *Post) Artist() *Artist {
	return m.artist
}

func (m *Post) Contributor() *User {
	return m.contributor
}

func (m *Post) RawContent() []string {
	return m.content
}

func (m *Post) Content() []string {
	var generatedContent []string

	for _, image := range m.content {

		baseUrl := os.Getenv("POSTS_URL")

		// generate the proper content url
		generatedContent = append(generatedContent, baseUrl+"/"+image)
	}

	return generatedContent
}

func (m *Post) Categories() []*Category {
	return m.categories
}

func (m *Post) Characters() []*Character {
	return m.characters
}

func (m *Post) PostedAt() time.Time {
	return m.postedAt
}
