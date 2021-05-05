package post

import (
	"fmt"
	"os"
	"time"

	"overdoll/libraries/user"
)

type Post struct {
	id         string
	content    []string
	postedAt   time.Time
	characters []*Character
	categories []*Category

	artist      *Artist
	contributor *common.User
}

type NotFoundError struct {
	Identifier string
}

func (e NotFoundError) Error() string {
	return fmt.Sprintf("user '%s' not found", e.Identifier)
}

func NewPost(id string, artist *Artist, contributor *common.User, content []string, categories []*Category, characters []*Character) *Post {
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

func (m *Post) Contributor() *common.User {
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
