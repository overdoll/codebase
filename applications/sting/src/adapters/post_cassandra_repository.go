package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
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
	Id                 ksuid.UUID            `db:"id"`
	State              post.PostPendingState `db:"state"`
	ArtistId           string                `db:"artist_id"`
	ArtistUsername     string                `db:"artist_username"`
	ContributorId      ksuid.UUID            `db:"contributor_id"`
	Content            []string              `db:"content"`
	Categories         []ksuid.UUID          `db:"categories"`
	Characters         []ksuid.UUID          `db:"characters"`
	CharactersRequests map[string]string     `db:"characters_requests"`
	CategoriesRequests []string              `db:"categories_requests"`
	MediaRequests      []string              `db:"media_requests"`
	PostedAt           time.Time             `db:"posted_at"`
	ReviewRequired     bool                  `db:"review_required"`
	PublishedPostId    string                `db:"published_post_id"`
}

type PostsCassandraRepository struct {
	session gocqlx.Session
}

func NewPostsCassandraRepository(session gocqlx.Session) PostsCassandraRepository {
	return PostsCassandraRepository{session: session}
}

func marshalToDatabase(pending *post.PostPending) *PostPending {

	characterRequests := make(map[string]string)

	for _, char := range pending.CharacterRequests() {
		characterRequests[char.Name] = char.Media
	}

	var categoryRequests []string

	for _, cat := range pending.CategoryRequests() {
		categoryRequests = append(categoryRequests, cat.Title)
	}

	var mediaRequests []string

	for _, med := range pending.MediaRequests() {
		mediaRequests = append(mediaRequests, med.Title)
	}

	return &PostPending{
		Id:                 pending.ID(),
		State:              pending.State(),
		ArtistId:           pending.ArtistId(),
		ArtistUsername:     pending.ArtistUsername(),
		ContributorId:      pending.ContributorId(),
		Content:            pending.Content(),
		Categories:         pending.Categories(),
		Characters:         pending.Characters(),
		CharactersRequests: characterRequests,
		CategoriesRequests: categoryRequests,
		MediaRequests:      mediaRequests,
		PostedAt:           pending.PostedAt(),
		ReviewRequired:     pending.ReviewRequired(),
		PublishedPostId:    pending.PublishedPostId(),
	}
}

func (r *PostsCassandraRepository) CreatePendingPost(ctx context.Context, pending *post.PostPending) error {
	pendingPost := marshalToDatabase(pending)

	insertPost := qb.Insert("posts_pending").
		Columns(
			"id",
			"state",
			"artist_id",
			"artist_username",
			"contributor_id",
			"content",
			"categories",
			"characters",
			"characters_requests",
			"categories_requests",
			"media_requests",
			"posted_at",
			"review_required",
			"published_post_id",
		).
		Query(r.session).
		BindStruct(pendingPost)

	if err := insertPost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}
