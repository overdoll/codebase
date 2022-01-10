package adapters

import (
	"context"
	"fmt"
	"github.com/scylladb/gocqlx/v2/qb"
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
		"likes",
		"content_resource_ids",
		"moderator_account_id",
		"contributor_account_id",
		"club_id",
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
	Id                 string     `db:"id"`
	State              string     `db:"state"`
	Likes              int        `db:"likes"`
	ContentResourceIds []string   `db:"content_resource_ids"`
	ModeratorId        *string    `db:"moderator_account_id"`
	ContributorId      string     `db:"contributor_account_id"`
	ClubId             string     `db:"club_id"`
	AudienceId         *string    `db:"audience_id"`
	CategoryIds        []string   `db:"category_ids"`
	CharacterIds       []string   `db:"character_ids"`
	CreatedAt          time.Time  `db:"created_at"`
	PostedAt           *time.Time `db:"posted_at"`
	ReassignmentAt     *time.Time `db:"moderator_reassignment_at"`
}

type PostsCassandraRepository struct {
	session gocqlx.Session
}

func NewPostsCassandraRepository(session gocqlx.Session) PostsCassandraRepository {
	return PostsCassandraRepository{session: session}
}

func marshalPostToDatabase(pending *post.Post) (*posts, error) {

	var audienceId *string

	if pending.Audience() != nil {
		id := pending.Audience().ID()
		audienceId = &id
	}

	return &posts{
		Id:                 pending.ID(),
		Likes:              pending.Likes(),
		State:              pending.State().String(),
		ModeratorId:        pending.ModeratorId(),
		ClubId:             pending.ClubId(),
		AudienceId:         audienceId,
		ContributorId:      pending.ContributorId(),
		ContentResourceIds: pending.ContentResourceIds(),
		CategoryIds:        pending.CategoryIds(),
		CharacterIds:       pending.CharacterIds(),
		CreatedAt:          pending.CreatedAt(),
		PostedAt:           pending.PostedAt(),
		ReassignmentAt:     pending.ReassignmentAt(),
	}, nil
}

func (r PostsCassandraRepository) incrementOrDecrementCount(ctx context.Context, oldCount, newCount int, builder *qb.UpdateBuilder, column, id string) error {

	increment := newCount > oldCount

	if increment {
		builder.Add(column)
	} else {
		builder.Remove(column)
	}

	mp := map[string]interface{}{
		"id": id,
	}

	mp[column] = 1

	if err := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		Bind(mp).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to update counter: %v", err)
	}

	return nil
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

	var audienc *post.Audience

	if postPending.AudienceId != nil {
		audienc, err = r.GetAudienceById(ctx, nil, *postPending.AudienceId)

		if err != nil {
			return nil, err
		}
	}

	return post.UnmarshalPostFromDatabase(
		postPending.Id,
		postPending.State,
		postPending.Likes,
		postPending.ModeratorId,
		postPending.ContributorId,
		postPending.ContentResourceIds,
		postPending.ClubId,
		audienc,
		characters,
		categories,
		postPending.CreatedAt,
		postPending.PostedAt,
		postPending.ReassignmentAt,
	), nil
}

func (r PostsCassandraRepository) CreatePost(ctx context.Context, pending *post.Post) error {

	pst, err := marshalPostToDatabase(pending)

	if err != nil {
		return err
	}

	insertPost := r.session.
		Query(postTable.Insert()).
		BindStruct(pst).
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

func (r PostsCassandraRepository) GetPostByIdOperator(ctx context.Context, id string) (*post.Post, error) {

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

func (r PostsCassandraRepository) GetPostById(ctx context.Context, requester *principal.Principal, id string) (*post.Post, error) {

	pst, err := r.GetPostByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := pst.CanView(requester); err != nil {
		return nil, err
	}

	return pst, err
}

func (r PostsCassandraRepository) UpdatePost(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {

	currentPost, err := r.GetPostByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentPost)

	if err != nil {
		return nil, err
	}

	pst, err := marshalPostToDatabase(currentPost)

	if err != nil {
		return nil, err
	}

	postQuery := r.session.
		Query(postTable.Update(
			"state",
			"moderator_reassignment_at",
			"posted_at",
			"moderator_account_id",
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst)

	if err := postQuery.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post: %v", err)
	}

	return currentPost, nil
}

func (r PostsCassandraRepository) updatePostRequest(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error, columns []string) (*post.Post, error) {

	currentPost, err := r.GetPostById(ctx, requester, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentPost)

	if err != nil {
		return nil, err
	}

	pst, err := marshalPostToDatabase(currentPost)

	if err != nil {
		return nil, err
	}

	postQuery := r.session.
		Query(postTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst)

	if err := postQuery.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post: %v", err)
	}

	return currentPost, nil
}

func (r PostsCassandraRepository) UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"content_resource_ids"})
}

func (r PostsCassandraRepository) UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"audience_id"})
}

func (r PostsCassandraRepository) UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"character_ids"})
}

func (r PostsCassandraRepository) UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"category_ids"})
}

func (r PostsCassandraRepository) UpdatePostLikesOperator(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {

	pst, err := r.GetPostByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	oldTotalLikes := pst.Likes()

	if err = updateFn(pst); err != nil {
		return nil, err
	}

	newTotalLikes := pst.Likes()

	builder := postTable.UpdateBuilder()

	if err := r.incrementOrDecrementCount(ctx, oldTotalLikes, newTotalLikes, builder, "likes", pst.ID()); err != nil {
		return nil, fmt.Errorf("failed to update post likes: %v", err)
	}

	return pst, nil
}
