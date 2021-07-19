package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/src/domain/post"
)

var postTable = table.New(table.Metadata{
	Name: "posts",
	Columns: []string{
		"id",
		"state",
		"moderator_account_id",
		"artist_account_id",
		"contributor_account_id",
		"content",
		"categories",
		"characters",
		"artist_request",
		"characters_requests",
		"categories_requests",
		"media_requests",
		"posted_at",
		"reassignment_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type Post struct {
	Id                 string            `db:"id"`
	State              string            `db:"state"`
	ModeratorId        string            `db:"moderator_account_id"`
	ArtistId           string            `db:"artist_account_id"`
	ContributorId      string            `db:"contributor_account_id"`
	Content            []string          `db:"content"`
	Categories         []string          `db:"categories"`
	Characters         []string          `db:"characters"`
	ArtistRequest      string            `db:"artist_request"`
	CharactersRequests map[string]string `db:"characters_requests"`
	CategoriesRequests []string          `db:"categories_requests"`
	MediaRequests      []string          `db:"media_requests"`
	PostedAt           time.Time         `db:"posted_at"`
	ReassignmentAt     time.Time         `db:"reassignment_at"`
}

type PostsCassandraRepository struct {
	session gocqlx.Session
}

func NewPostsCassandraRepository(session gocqlx.Session) PostsCassandraRepository {
	return PostsCassandraRepository{session: session}
}

func marshalPostToDatabase(pending *post.Post) *Post {

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

	return &Post{
		Id:                 pending.ID(),
		ModeratorId:        pending.ModeratorId(),
		State:              string(pending.State()),
		ArtistRequest:      nil,
		ContributorId:      pending.Contributor().ID(),
		Content:            pending.RawContent(),
		Categories:         pending.CategoryIds(),
		Characters:         pending.CharacterIds(),
		ArtistId:           pending.Artist().ID(),
		CharactersRequests: characterRequests,
		CategoriesRequests: categoryRequests,
		MediaRequests:      mediaRequests,
		PostedAt:           pending.PostedAt(),
		ReassignmentAt:     pending.ReassignmentAt(),
	}
}

func (r PostsCassandraRepository) unmarshalPost(ctx context.Context, postPending Post) (*post.Post, error) {

	characters, err := r.GetCharactersById(ctx, postPending.Characters)

	if err != nil {
		return nil, err
	}

	categories, err := r.GetCategoriesById(ctx, postPending.Categories)

	if err != nil {
		return nil, err
	}

	artist := post.NewArtist(postPending.ArtistId)

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
		postPending.ReassignmentAt,
	), nil
}

func (r PostsCassandraRepository) CreatePost(ctx context.Context, pending *post.Post) error {

	insertPost := r.session.
		Query(postTable.Insert()).
		BindStruct(marshalPostToDatabase(pending)).
		Consistency(gocql.LocalQuorum)

	if err := insertPost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r PostsCassandraRepository) DeletePost(ctx context.Context, id string) error {

	deletePost := r.session.
		Query(postTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Post{Id: id})

	if err := deletePost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r PostsCassandraRepository) GetPosts(ctx context.Context) ([]*post.Post, error) {

	postQuery := r.session.
		Query(postTable.Select()).
		Consistency(gocql.LocalQuorum)

	var postsPending []Post

	if err := postQuery.Select(&postsPending); err != nil {
		return nil, err
	}

	var pos []*post.Post

	for _, pst := range postsPending {

		item, err := r.unmarshalPost(ctx, pst)

		if err != nil {
			return nil, err
		}

		pos = append(pos, item)
	}

	return pos, nil
}

func (r PostsCassandraRepository) GetPost(ctx context.Context, id string) (*post.Post, error) {

	postQuery := r.session.
		Query(postTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Post{Id: id})

	var postPending Post

	if err := postQuery.Get(&postPending); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrNotFound
		}

		return nil, err
	}

	return r.unmarshalPost(ctx, postPending)
}

func (r PostsCassandraRepository) UpdatePost(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {

	currentPost, err := r.GetPost(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentPost)

	if err != nil {
		return nil, err
	}

	postQuery := r.session.
		Query(postTable.Update()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPostToDatabase(currentPost))

	if err := postQuery.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return currentPost, nil
}
