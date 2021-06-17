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
	ArtistId      string    `db:"artist_user_id"`
	ContributorId string    `db:"contributor_user_id"`
	Content       []string  `db:"content"`
	Categories    []string  `db:"categories"`
	Characters    []string  `db:"characters"`
	PostedAt      time.Time `db:"posted_at"`
}

type PostPending struct {
	Id                 string            `db:"id"`
	State              string            `db:"state"`
	ModeratorId        string            `db:"moderator_user_id"`
	ArtistId           string            `db:"artist_user_id"`
	ArtistUsername     string            `db:"artist_user_username"`
	ContributorId      string            `db:"contributor_user_id"`
	Content            []string          `db:"content"`
	Categories         []string          `db:"categories"`
	Characters         []string          `db:"characters"`
	CharactersRequests map[string]string `db:"characters_requests"`
	CategoriesRequests []string          `db:"categories_requests"`
	MediaRequests      []string          `db:"media_requests"`
	PostedAt           time.Time         `db:"posted_at"`
}

type PostsCassandraRepository struct {
	session gocqlx.Session
}

func NewPostsCassandraRepository(session gocqlx.Session) PostsCassandraRepository {
	return PostsCassandraRepository{session: session}
}

func marshalPendingPostToDatabase(pending *post.PendingPost) *PostPending {

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
		ModeratorId:        pending.ModeratorId(),
		State:              string(pending.State()),
		ArtistId:           pending.Artist().ID(),
		ArtistUsername:     pending.Artist().Username(),
		ContributorId:      pending.Contributor().ID(),
		Content:            pending.RawContent(),
		Categories:         pending.CategoryIds(),
		Characters:         pending.CharacterIds(),
		CharactersRequests: characterRequests,
		CategoriesRequests: categoryRequests,
		MediaRequests:      mediaRequests,
		PostedAt:           pending.PostedAt(),
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
		ContributorId: post.Contributor().ID(),
		Content:       post.RawContent(),
		Categories:    categoryIds,
		Characters:    characterIds,
		PostedAt:      post.PostedAt(),
	}
}

func (r PostsCassandraRepository) unmarshalPendingPost(ctx context.Context, postPending PostPending) (*post.PendingPost, error) {
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
		postPending.ModeratorId,
		postPending.State,
		artist,
		postPending.ContributorId,
		"",
		"",
		postPending.Content,
		characters,
		categories,
		postPending.CharactersRequests,
		postPending.CategoriesRequests,
		postPending.MediaRequests,
		postPending.PostedAt,
	), nil
}

func (r PostsCassandraRepository) CreatePendingPost(ctx context.Context, pending *post.PendingPost) error {
	pendingPost := marshalPendingPostToDatabase(pending)

	insertPost := qb.Insert("pending_posts").
		Columns(
			"id",
			"state",
			"moderator_user_id",
			"artist_user_id",
			"artist_user_username",
			"contributor_user_id",
			"content",
			"categories",
			"characters",
			"characters_requests",
			"categories_requests",
			"media_requests",
			"posted_at",
		).
		Query(r.session).
		BindStruct(pendingPost).
		Consistency(gocql.LocalQuorum)

	if err := insertPost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r PostsCassandraRepository) DeletePendingPost(ctx context.Context, id string) error {
	deletePost := qb.Delete("pending_posts").
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PostPending{Id: id})

	if err := deletePost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r PostsCassandraRepository) CreatePost(ctx context.Context, pending *post.Post) error {
	pst := marshalPostToDatabase(pending)

	insertPost := qb.Insert("posts").
		Columns(
			"id",
			"artist_user_id",
			"contributor_user_id",
			"content",
			"categories",
			"characters",
			"posted_at",
		).
		Query(r.session).
		Consistency(gocql.One).
		BindStruct(pst)

	if err := insertPost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r PostsCassandraRepository) DeletePost(ctx context.Context, id string) error {
	deletePost := qb.Delete("posts").
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Post{Id: id})

	if err := deletePost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r PostsCassandraRepository) GetPost(ctx context.Context, id string) (*post.Post, error) {
	postQuery := qb.Select("posts").
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Post{Id: id})

	var pst Post

	if err := postQuery.Get(&pst); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.NotFoundError{Identifier: id}
		}

		return nil, err
	}

	characters, err := r.GetCharactersById(ctx, pst.Characters)

	if err != nil {
		return nil, err
	}

	categories, err := r.GetCategoriesById(ctx, pst.Categories)

	if err != nil {
		return nil, err
	}

	artist, err := r.GetArtistById(ctx, pst.ArtistId)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalPostFromDatabase(
		pst.Id,
		artist,
		pst.ContributorId,
		"",
		"",
		pst.Content,
		characters,
		categories,
		pst.PostedAt,
	), nil
}

func (r PostsCassandraRepository) GetPendingPosts(ctx context.Context) ([]*post.PendingPost, error) {

	postPendingQuery := qb.Select("pending_posts").
		Query(r.session).
		Consistency(gocql.LocalQuorum)

	var postsPending []PostPending

	if err := postPendingQuery.Select(&postsPending); err != nil {
		return nil, err
	}

	var pos []*post.PendingPost

	for _, pst := range postsPending {

		item, err := r.unmarshalPendingPost(ctx, pst)

		if err != nil {
			return nil, err
		}

		pos = append(pos, item)
	}

	return pos, nil
}

func (r PostsCassandraRepository) GetPendingPost(ctx context.Context, id string) (*post.PendingPost, error) {

	postPendingQuery := qb.Select("pending_posts").
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PostPending{Id: id})

	var postPending PostPending

	if err := postPendingQuery.Get(&postPending); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.NotFoundError{Identifier: id}
		}

		return nil, err
	}

	return r.unmarshalPendingPost(ctx, postPending)
}

func (r PostsCassandraRepository) UpdatePendingPost(ctx context.Context, id string, updateFn func(pending *post.PendingPost) error) (*post.PendingPost, error) {

	currentPost, err := r.GetPendingPost(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentPost)

	if err != nil {
		return nil, err
	}

	fmt.Println(currentPost.CharacterIds())

	// Update our post to reflect the new state - in publishing
	upd := qb.Update("pending_posts").
		Set(
			"state",
			"contributor_user_id",
			"artist_user_id",
			"artist_user_username",
			"content",
			"categories",
			"characters",
			"characters_requests",
			"categories_requests",
			"media_requests",
			"posted_at",
		).
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPendingPostToDatabase(currentPost))

	if err := upd.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	fmt.Println(upd)
	fmt.Println(err)
	fmt.Println(marshalPendingPostToDatabase(currentPost))

	return currentPost, nil
}
