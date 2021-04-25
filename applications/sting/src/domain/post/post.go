package post

import (
	"time"

	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/ksuid"
)

type Post struct {
	id            ksuid.UUID
	artistId      ksuid.UUID
	contributorId ksuid.UUID
	content       []string
	categories    []ksuid.UUID
	characters    []ksuid.UUID
	postedAt      time.Time
}

func NewPost(id ksuid.UUID, artistId ksuid.UUID, contributorId ksuid.UUID, content []string, categories []ksuid.UUID, characters []ksuid.UUID, postedAt time.Time) *Post {
	return &Post{
		id:            id,
		artistId:      artistId,
		contributorId: contributorId,
		content:       content,
		categories:    categories,
		characters:    characters,
		postedAt:      postedAt,
	}
}

func (m *Post) ID() ksuid.UUID {
	return m.id
}

func (m *Post) ArtistId() ksuid.UUID {
	return m.artistId
}

func (m *Post) ContributorId() ksuid.UUID {
	return m.contributorId
}

func (m *Post) Content() []string {
	return m.content
}

func (m *Post) Categories() []ksuid.UUID {
	return m.categories
}

func (m *Post) Characters() []ksuid.UUID {
	return m.characters
}

func (m *Post) PostedAt() time.Time {
	return m.postedAt
}

func UnmarshalPostFromDatabase(id ksuid.UUID, artistId ksuid.UUID, contributorId ksuid.UUID, content []string, characters []ksuid.UUID, categories []ksuid.UUID, postedAt time.Time) *Post {
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

func UnmarshalPostFromProto(post *sting.Post) (*Post, error) {
	id, err := ksuid.Parse(post.Id)

	if err != nil {
		return nil, err
	}

	artistId, err := ksuid.Parse(post.ArtistId)

	if err != nil {
		return nil, err
	}

	contributorId, err := ksuid.Parse(post.ContributorId)

	if err != nil {
		return nil, err
	}

	categoryIds, err := ksuid.ToUUIDArray(post.Categories)

	if err != nil {
		return nil, err
	}

	characterIds, err := ksuid.ToUUIDArray(post.Characters)

	if err != nil {
		return nil, err
	}

	return NewPost(id, artistId, contributorId, post.Content, categoryIds, characterIds, time.Now()), nil
}
