package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
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
	Id                 ksuid.UUID        `db:"id"`
	State              string            `db:"state"`
	ArtistId           string            `db:"artist_id"`
	ArtistUsername     string            `db:"artist_username"`
	ContributorId      ksuid.UUID        `db:"contributor_id"`
	Content            []string          `db:"content"`
	Categories         []ksuid.UUID      `db:"categories"`
	Characters         []ksuid.UUID      `db:"characters"`
	CharactersRequests map[string]string `db:"characters_requests"`
	CategoriesRequests []string          `db:"categories_requests"`
	MediaRequests      []string          `db:"media_requests"`
	PostedAt           time.Time         `db:"posted_at"`
	PublishedPostId    string            `db:"published_post_id"`
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
		State:              string(pending.State()),
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

func (r *PostsCassandraRepository) GetPendingPost(ctx context.Context, id ksuid.UUID) (*post.PostPending, error) {

	postPendingQuery := qb.Select("post_pending").
		Where(qb.EqLit("id", id.String())).
		Query(r.session)

	var postPending PostPending

	if err := postPendingQuery.Get(&postPending); err != nil {
		return nil, err
	}

	return post.UnmarshalPendingPostFromDatabase(
		postPending.Id,
		postPending.State,
		postPending.ArtistId,
		postPending.ArtistUsername,
		postPending.ContributorId,
		postPending.Content,
		postPending.Characters,
		postPending.Categories,
		postPending.CharactersRequests,
		postPending.CategoriesRequests,
		postPending.MediaRequests,
		postPending.PostedAt,
		postPending.PublishedPostId,
	), nil
}

func (r *PostsCassandraRepository) UpdatePendingPost(ctx context.Context, pending *post.PostPending) error {

	// Update our post to reflect the new state - in publishing
	updatePost := qb.Update("post_pending").
		Set("state", "characters", "categories", "media_requests", "character_requests", "categories_requests", "artist_id", "artist_username").
		Where(qb.Eq("id")).
		Query(r.session).
		// Update must be replicated everywhere or else we risk that the PublishPost method isn't in sync with the
		// new settings we set up here
		Consistency(gocql.All).
		BindStruct(marshalToDatabase(pending))

	if err := updatePost.ExecRelease(); err != nil {
		return fmt.Errorf("update() failed: '%s", err)
	}

	return nil
}
