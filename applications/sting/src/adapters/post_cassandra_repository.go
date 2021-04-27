package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/post"
)

type Post struct {
	Id            string    `db:"id"`
	ArtistId      string    `db:"artist_id"`
	ContributorId string    `db:"contributor_id"`
	Content       []string  `db:"content"`
	Categories    []string  `db:"categories"`
	Characters    []string  `db:"characters"`
	PostedAt      time.Time `db:"posted_at"`
}

type PostPending struct {
	Id                 string            `db:"id"`
	State              string            `db:"state"`
	ArtistId           string            `db:"artist_id"`
	ArtistUsername     string            `db:"artist_username"`
	ContributorId      string            `db:"contributor_id"`
	Content            []string          `db:"content"`
	Categories         []string          `db:"categories"`
	Characters         []string          `db:"characters"`
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

func marshalPendingPostToDatabase(pending *post.PostPending) *PostPending {

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
		ArtistId:           pending.Artist().ID(),
		ArtistUsername:     pending.Artist().Username(),
		ContributorId:      pending.Contributor().Id,
		Content:            pending.RawContent(),
		Categories:         pending.CategoryIds(),
		Characters:         pending.CharacterIds(),
		CharactersRequests: characterRequests,
		CategoriesRequests: categoryRequests,
		MediaRequests:      mediaRequests,
		PostedAt:           pending.PostedAt(),
		PublishedPostId:    pending.PublishedPostId(),
	}
}

func marshalPostToDatabase(post *post.Post) *Post {

	var categoryIds []string

	for _, cat := range post.Categories() {
		categoryIds = append(categoryIds, cat.ID())
	}

	var characterIds []string

	for _, char := range post.Characters() {
		characterIds = append(characterIds, char.ID())
	}

	return &Post{
		Id:            post.ID(),
		ArtistId:      post.Artist().ID(),
		ContributorId: post.Contributor().Id,
		Content:       post.RawContent(),
		Categories:    categoryIds,
		Characters:    characterIds,
		PostedAt:      post.PostedAt(),
	}
}

func (r PostsCassandraRepository) CreatePendingPost(ctx context.Context, pending *post.PostPending) error {
	pendingPost := marshalPendingPostToDatabase(pending)

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

func (r PostsCassandraRepository) CreatePost(ctx context.Context, pending *post.Post) error {
	pst := marshalPostToDatabase(pending)

	insertPost := qb.Insert("post").
		Columns(
			"id",
			"artist_id",
			"contributor_id",
			"content",
			"categories",
			"characters",
			"posted_at",
		).
		Query(r.session).
		BindStruct(pst)

	if err := insertPost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r PostsCassandraRepository) GetPendingPost(ctx context.Context, id string) (*post.PostPending, error) {

	postPendingQuery := qb.Select("post_pending").
		Where(qb.EqLit("id", id)).
		Query(r.session)

	var postPending PostPending

	if err := postPendingQuery.Get(&postPending); err != nil {
		return nil, err
	}

	characters, err := r.GetCharactersById(ctx, postPending.Characters)

	if err != nil {
		return nil, err
	}

	categories, err := r.GetCategoriesById(ctx, postPending.Categories)

	if err != nil {
		return nil, err
	}

	artist := post.NewArtist(postPending.ArtistId, postPending.ArtistUsername)

	// if artist ID isn't null, grab artist from DB
	if artist.ID() != "" {
		artist, err = r.GetArtistById(ctx, artist.ID())

		if err != nil {
			return nil, err
		}
	}

	return post.UnmarshalPendingPostFromDatabase(
		postPending.Id,
		postPending.State,
		artist,
		postPending.ContributorId,
		postPending.Content,
		characters,
		categories,
		postPending.CharactersRequests,
		postPending.CategoriesRequests,
		postPending.MediaRequests,
		postPending.PostedAt,
		postPending.PublishedPostId,
	), nil
}

func (r PostsCassandraRepository) UpdatePendingPost(ctx context.Context, id string, updateFn func(pending *post.PostPending) (*post.PostPending, error)) (*post.PostPending, error) {

	currentPost, err := r.GetPendingPost(ctx, id)

	if err != nil {
		return nil, err
	}

	pst, err := updateFn(currentPost)

	if err != nil {
		return nil, err
	}

	// Update our post to reflect the new state - in publishing
	updatePost := qb.Update("post_pending").
		Set("state", "characters", "categories", "media_requests", "character_requests", "categories_requests", "artist_id", "artist_username").
		Where(qb.Eq("id")).
		Query(r.session).
		// Update must be replicated everywhere or else we risk that the PublishPost method isn't in sync with the
		// new settings we set up here
		Consistency(gocql.All).
		BindStruct(marshalPendingPostToDatabase(pst))

	if err := updatePost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return nil, nil
}
