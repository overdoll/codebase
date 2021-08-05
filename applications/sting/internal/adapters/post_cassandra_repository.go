package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

var postTable = table.New(table.Metadata{
	Name: "posts",
	Columns: []string{
		"id",
		"state",
		"content",
		"moderator_account_id",
		"contributor_account_id",
		"brand_id",
		"audience_id",
		"category_ids",
		"character_ids",
		"created_at",
		"posted_at",
		"moderator_reassignment_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type posts struct {
	Id             string    `db:"id"`
	State          string    `db:"state"`
	Content        []string  `db:"content"`
	ModeratorId    string    `db:"moderator_account_id"`
	ContributorId  string    `db:"contributor_account_id"`
	BrandId        string    `db:"brand_id"`
	AudienceId     string    `db:"audience_id"`
	CategoryIds    []string  `db:"category_ids"`
	CharacterIds   []string  `db:"character_ids"`
	CreatedAt      time.Time `db:"created_at"`
	PostedAt       time.Time `db:"posted_at"`
	ReassignmentAt time.Time `db:"moderator_reassignment_at"`
}

type PostsCassandraRepository struct {
	session gocqlx.Session
}

func NewPostsCassandraRepository(session gocqlx.Session) PostsCassandraRepository {
	return PostsCassandraRepository{session: session}
}

func marshalPostToDatabase(pending *post.Post) *posts {

	return &posts{
		Id:             pending.ID(),
		State:          pending.State(),
		ModeratorId:    pending.ModeratorId(),
		BrandId:        pending.BrandId(),
		AudienceId:     pending.AudienceId(),
		ContributorId:  pending.ContributorId(),
		Content:        pending.Content(),
		CategoryIds:    pending.CategoryIds(),
		CharacterIds:   pending.CharacterIds(),
		CreatedAt:      pending.CreatedAt(),
		PostedAt:       pending.PostedAt(),
		ReassignmentAt: pending.ReassignmentAt(),
	}
}

func (r PostsCassandraRepository) unmarshalPost(ctx context.Context, postPending posts) (*post.Post, error) {

	characters, err := r.GetCharactersById(ctx, postPending.CharacterIds)

	if err != nil {
		return nil, err
	}

	categories, err := r.GetCategoriesById(ctx, postPending.CategoryIds)

	if err != nil {
		return nil, err
	}

	var brand *post.Brand

	if postPending.BrandId != "" {
		brand, err = r.GetBrandById(ctx, postPending.BrandId)

		if err != nil {
			return nil, err
		}
	}

	var audienc *post.Audience

	if postPending.AudienceId != "" {
		audienc, err = r.GetAudienceById(ctx, postPending.AudienceId)

		if err != nil {
			return nil, err
		}
	}

	return post.UnmarshalPostFromDatabase(
		postPending.Id,
		postPending.State,
		postPending.ModeratorId,
		postPending.ContributorId,
		postPending.Content,
		brand,
		audienc,
		characters,
		categories,
		postPending.CreatedAt,
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
		return fmt.Errorf("failed to create post: %v", err)
	}

	return nil
}

func (r PostsCassandraRepository) DeletePost(ctx context.Context, id string) error {

	deletePost := r.session.
		Query(postTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&posts{Id: id})

	if err := deletePost.ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete post: %v", err)
	}

	return nil
}

func (r PostsCassandraRepository) GetPost(ctx context.Context, id string) (*post.Post, error) {

	postQuery := r.session.
		Query(postTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&posts{Id: id})

	var postPending posts

	if err := postQuery.Get(&postPending); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrNotFound
		}

		return nil, fmt.Errorf("failed to get post: %v", err)
	}

	return r.unmarshalPost(ctx, postPending)
}

func (r PostsCassandraRepository) GetPostRequest(ctx context.Context, requester *principal.Principal, id string) (*post.Post, error) {

	pst, err := r.GetPost(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := pst.CanView(requester); err != nil {
		return nil, err
	}

	return pst, err
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
		Query(postTable.Update(
			"state",
			"moderator_reassignment_at",
			"moderator_account_id",
			"content",
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPostToDatabase(currentPost))

	if err := postQuery.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post: %v", err)
	}

	return currentPost, nil
}

func (r PostsCassandraRepository) updatePostRequest(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error, columns []string) (*post.Post, error) {

	currentPost, err := r.GetPostRequest(ctx, requester, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentPost)

	if err != nil {
		return nil, err
	}

	postQuery := r.session.
		Query(postTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPostToDatabase(currentPost))

	if err := postQuery.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post: %v", err)
	}

	return currentPost, nil
}

func (r PostsCassandraRepository) UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"content"})
}

func (r PostsCassandraRepository) UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"audience_id"})
}

func (r PostsCassandraRepository) UpdatePostBrand(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"brand_id"})
}

func (r PostsCassandraRepository) UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"character_ids"})
}

func (r PostsCassandraRepository) UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"category_ids"})
}
