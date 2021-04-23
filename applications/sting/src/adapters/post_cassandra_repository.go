package adapters

import (
	"time"

	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type Post struct {
	Id            ksuid.UUID   `db:"id"`
	ArtistId      ksuid.UUID   `db:"artist_id"`
	ContributorId ksuid.UUID   `db:"contributor_id"`
	Content       []string     `db:"content"`
	Categories    []ksuid.UUID `db:"categories"`
	Characters    []ksuid.UUID `db:"characters"`
	PostedAt      time.Time    `db:"posted_at"`
}

type PostPending struct {
	Id                  ksuid.UUID            `db:"id"`
	State               post.PostPendingState `db:"state"`
	ArtistId            string                `db:"artist_id"`
	ArtistUsername      string                `db:"artist_username"`
	ContributorId       ksuid.UUID            `db:"contributor_id"`
	ContributorUsername string                `db:"contributor_username"`
	Content             []string              `db:"content"`
	Categories          []ksuid.UUID          `db:"categories"`
	Characters          []ksuid.UUID          `db:"characters"`
	CharactersRequests  map[string]string     `db:"characters_requests"`
	CategoriesRequests  []string              `db:"categories_requests"`
	MediaRequests       []string              `db:"media_requests"`
	PostedAt            time.Time             `db:"posted_at"`
	ReviewRequired      bool                  `db:"review_required"`
	PublishedPostId     string                `db:"published_post_id"`
}

type PostsRepository struct {
	session gocqlx.Session
}

func NewPostsRepository(session gocqlx.Session) PostsRepository {
	return PostsRepository{session: session}
}
