package post

import (
	"fmt"
	"os"
	"time"

	"overdoll/libraries/account"
)

type Post struct {
	id         string
	content    []string
	characters []*Character
	categories []*Category

	artist      *Artist
	contributor *account.Account
	postedAt    time.Time
}

type NotFoundError struct {
	Identifier string
}

func (e NotFoundError) Error() string {
	return fmt.Sprintf("post '%s' not found", e.Identifier)
}

func NewPost(id string, artist *Artist, contributor *account.Account, content []string, categories []*Category, characters []*Character) *Post {
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

func UnmarshalPostFromDatabase(id string, artist *Artist, contributorId, contributorUsername, contributorAvatar string, content []string, characters []*Character, categories []*Category, postedAt time.Time) *Post {
	return &Post{
		id:          id,
		artist:      artist,
		contributor: account.NewUser(contributorId, contributorUsername, contributorAvatar, nil, false, false),
		content:     content,
		characters:  characters,
		categories:  categories,
		postedAt:    postedAt,
	}
}

func (m *Post) ID() string {
	return m.id
}

func (m *Post) Artist() *Artist {
	return m.artist
}

func (m *Post) Contributor() *account.Account {
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
