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
		"supporter_only_status",
		"content_resource_ids",
		"content_supporter_only",
		"content_supporter_only_resource_ids",
		"contributor_account_id",
		"club_id",
		"audience_id",
		"category_ids",
		"character_ids",
		"series_ids",
		"created_at",
		"posted_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type posts struct {
	Id                              string            `db:"id"`
	State                           string            `db:"state"`
	SupporterOnlyStatus             string            `db:"supporter_only_status"`
	ContentResourceIds              []string          `db:"content_resource_ids"`
	ContentSupporterOnly            map[string]bool   `db:"content_supporter_only"`
	ContentSupporterOnlyResourceIds map[string]string `db:"content_supporter_only_resource_ids"`
	ContributorId                   string            `db:"contributor_account_id"`
	ClubId                          string            `db:"club_id"`
	AudienceId                      *string           `db:"audience_id"`
	CategoryIds                     []string          `db:"category_ids"`
	CharacterIds                    []string          `db:"character_ids"`
	SeriesIds                       []string          `db:"series_ids"`
	CreatedAt                       time.Time         `db:"created_at"`
	PostedAt                        *time.Time        `db:"posted_at"`
}

type PostsCassandraRepository struct {
	session gocqlx.Session
}

func NewPostsCassandraRepository(session gocqlx.Session) PostsCassandraRepository {
	return PostsCassandraRepository{session: session}
}

func marshalPostToDatabase(pending *post.Post) (*posts, error) {

	var contentResourceIds []string
	contentSupporterOnly := make(map[string]bool)
	contentSupporterOnlyResourceIds := make(map[string]string)

	for _, cont := range pending.Content() {
		contentResourceIds = append(contentResourceIds, cont.ResourceId())
		contentSupporterOnly[cont.ResourceId()] = cont.IsSupporterOnly()
		if cont.IsSupporterOnly() && cont.ResourceIdHidden() != "" {
			contentSupporterOnlyResourceIds[cont.ResourceId()] = cont.ResourceIdHidden()
		}
	}

	return &posts{
		Id:                              pending.ID(),
		State:                           pending.State().String(),
		SupporterOnlyStatus:             pending.SupporterOnlyStatus().String(),
		ClubId:                          pending.ClubId(),
		AudienceId:                      pending.AudienceId(),
		ContributorId:                   pending.ContributorId(),
		ContentResourceIds:              contentResourceIds,
		ContentSupporterOnly:            contentSupporterOnly,
		ContentSupporterOnlyResourceIds: contentSupporterOnlyResourceIds,
		CategoryIds:                     pending.CategoryIds(),
		CharacterIds:                    pending.CharacterIds(),
		SeriesIds:                       pending.SeriesIds(),
		CreatedAt:                       pending.CreatedAt(),
		PostedAt:                        pending.PostedAt(),
	}, nil
}

func (r PostsCassandraRepository) unmarshalPost(ctx context.Context, postPending posts) (*post.Post, error) {

	likes, err := r.getLikesForPost(ctx, postPending.Id)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalPostFromDatabase(
		postPending.Id,
		postPending.State,
		postPending.SupporterOnlyStatus,
		likes,
		postPending.ContributorId,
		postPending.ContentResourceIds,
		postPending.ContentSupporterOnly,
		postPending.ContentSupporterOnlyResourceIds,
		postPending.ClubId,
		postPending.AudienceId,
		postPending.CharacterIds,
		postPending.SeriesIds,
		postPending.CategoryIds,
		postPending.CreatedAt,
		postPending.PostedAt,
	), nil
}

func (r PostsCassandraRepository) CreatePost(ctx context.Context, pending *post.Post) error {

	pst, err := marshalPostToDatabase(pending)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(postTable.Insert()).
		BindStruct(pst).
		Consistency(gocql.LocalQuorum).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create post: %v", err)
	}

	return nil
}

func (r PostsCassandraRepository) DeletePost(ctx context.Context, id string) error {

	if err := r.session.
		Query(postTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&posts{Id: id}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete post: %v", err)
	}

	return nil
}

func (r PostsCassandraRepository) GetPostsByIds(ctx context.Context, requester *principal.Principal, postIds []string) ([]*post.Post, error) {

	var postResults []*post.Post

	// if none then we get out or else the query will fail
	if len(postIds) == 0 {
		return postResults, nil
	}

	var postsModels []*posts

	if err := qb.Select(postTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		Bind(postIds).
		Select(&postsModels); err != nil {
		return nil, fmt.Errorf("failed to get posts by ids: %v", err)
	}

	for _, b := range postsModels {
		p, err := r.unmarshalPost(ctx, *b)
		if err != nil {
			return nil, err
		}
		postResults = append(postResults, p)
	}

	return postResults, nil
}

func (r PostsCassandraRepository) getPostById(ctx context.Context, id string) (*posts, error) {

	var postPending posts

	if err := r.session.
		Query(postTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&posts{Id: id}).
		Get(&postPending); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrNotFound
		}

		return nil, fmt.Errorf("failed to get post: %v", err)
	}

	return &postPending, nil
}

func (r PostsCassandraRepository) GetPostByIdOperator(ctx context.Context, id string) (*post.Post, error) {

	postPending, err := r.getPostById(ctx, id)

	if err != nil {
		return nil, err
	}

	return r.unmarshalPost(ctx, *postPending)
}

func (r PostsCassandraRepository) getSuspendedClubIds(ctx context.Context) ([]string, error) {
	return nil, nil
}

func (r PostsCassandraRepository) GetPostById(ctx context.Context, requester *principal.Principal, id string) (*post.Post, error) {

	postPending, err := r.getPostById(ctx, id)

	if err != nil {
		return nil, err
	}

	pst, err := r.unmarshalPost(ctx, *postPending)

	if err != nil {
		return nil, err
	}

	suspendedClubIds, err := r.getSuspendedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	if err := pst.CanView(suspendedClubIds, requester); err != nil {
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

	if err := r.session.
		Query(postTable.Update(
			"state",
			"posted_at",
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post: %v", err)
	}

	return currentPost, nil
}

func (r PostsCassandraRepository) updatePostRequest(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error, columns []string) (*post.Post, error) {

	currentPost, err := r.GetPostById(ctx, requester, id)

	if err != nil {
		return nil, err
	}

	if err := currentPost.CanUpdate(requester); err != nil {
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

	if err := r.session.
		Query(postTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post: %v", err)
	}

	return currentPost, nil
}

func (r PostsCassandraRepository) UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"content_resource_ids", "content_supporter_only", "content_supporter_only_resource_ids"})
}

func (r PostsCassandraRepository) UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"audience_id"})
}

func (r PostsCassandraRepository) UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"character_ids", "series_ids"})
}

func (r PostsCassandraRepository) UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {
	return r.updatePostRequest(ctx, requester, id, updateFn, []string{"category_ids"})
}

func (r PostsCassandraRepository) UpdatePostContentOperator(ctx context.Context, id string, updateFn func(pending *post.Post) error) (*post.Post, error) {

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

	if err := r.session.
		Query(postTable.Update(
			"content_resource_ids", "content_supporter_only", "content_supporter_only_resource_ids",
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post: %v", err)
	}

	return currentPost, nil
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

	if err := r.updatePostLikes(ctx, id, newTotalLikes > oldTotalLikes); err != nil {
		return nil, err
	}

	return pst, nil
}
