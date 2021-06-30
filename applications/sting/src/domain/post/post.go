package post

import (
	"fmt"
	"os"
	"time"
)

type Post struct {
	id         string
	content    []string
	characters []*Character
	categories []*Category

	artistId      string
	contributorId string
	postedAt      time.Time
}

type NotFoundError struct {
	Identifier string
}

func (e NotFoundError) Error() string {
	return fmt.Sprintf("post '%s' not found", e.Identifier)
}

func NewPost(id, artistId, contributorId string, content []string, categories []*Category, characters []*Character) *Post {
	return &Post{
		id:            id,
		artistId:      artistId,
		contributorId: contributorId,
		content:       content,
		categories:    categories,
		characters:    characters,
		postedAt:      time.Now(),
	}
}

func UnmarshalPostFromDatabase(id, artistId, contributorId string, content []string, characters []*Character, categories []*Category, postedAt time.Time) *Post {
	return &Post{
		id:            id,
		artistId:      artistId,
		contributorId: contributorId,
		content:       content,
		characters:    characters,
		categories:    categories,
		postedAt:      postedAt,
	}
}

func (m *Post) ID() string {
	return m.id
}

func (m *Post) ArtistId() string {
	return m.artistId
}

func (m *Post) ContributorId() string {
	return m.contributorId
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
