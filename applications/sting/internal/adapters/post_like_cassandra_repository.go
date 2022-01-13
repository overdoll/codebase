package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"time"
)

var postLikeCounterTable = table.New(table.Metadata{
	Name: "post_likes_counter",
	Columns: []string{
		"post_id",
		"likes",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{},
})

var postLikeTable = table.New(table.Metadata{
	Name: "post_likes",
	Columns: []string{
		"post_id",
		"liked_account_id",
		"liked_at",
	},
	PartKey: []string{"post_id", "liked_account_id"},
	SortKey: []string{},
})

type postLike struct {
	PostId         string    `db:"post_id"`
	LikedAccountId string    `db:"liked_account_id"`
	LikedAt        time.Time `db:"liked_at"`
}

type postLikeCounter struct {
	PostId string `db:"post_id"`
	Likes  int    `db:"likes"`
}

func (r PostsCassandraRepository) CreatePostLike(ctx context.Context, requester *principal.Principal, like *post.Like) error {

	if err := r.session.
		Query(postLikeTable.Insert()).
		BindStruct(postLike{
			PostId:         like.PostId(),
			LikedAccountId: like.AccountId(),
			LikedAt:        like.LikedAt(),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create post like: %v", err)
	}

	return nil
}

func (r PostsCassandraRepository) DeletePostLike(ctx context.Context, requester *principal.Principal, postLikes *post.Like) error {

	if err := r.session.
		Query(postLikeTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postLike{
			PostId:         postLikes.PostId(),
			LikedAccountId: postLikes.AccountId(),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete post like: %v", err)
	}

	return nil
}

func (r PostsCassandraRepository) getLikesForPost(ctx context.Context, postId string) (int, error) {

	queryPostLikeCounter := r.session.
		Query(postLikeCounterTable.Get()).
		Consistency(gocql.One).
		BindStruct(postLikeCounter{PostId: postId})

	var pstLikeCounter postLikeCounter

	if err := queryPostLikeCounter.Get(&pstLikeCounter); err != nil {

		if err == gocql.ErrNotFound {
			return 0, nil
		}

		return 0, fmt.Errorf("failed to get post likes by id: %v", err)
	}

	return pstLikeCounter.Likes, nil
}

func (r PostsCassandraRepository) updatePostLikes(ctx context.Context, postId string, increment bool) error {

	builder := postLikeCounterTable.
		UpdateBuilder()

	if increment {
		builder.Add("likes")
	} else {
		builder.Remove("likes")
	}

	if err := builder.
		Query(r.session).
		Consistency(gocql.One).
		BindStruct(postLikeCounter{PostId: postId, Likes: 1}).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraRepository) GetPostLikeById(ctx context.Context, requester *principal.Principal, postId, accountId string) (*post.Like, error) {

	queryPostLike := r.session.
		Query(postLikeTable.Get()).
		Consistency(gocql.One).
		BindStruct(postLike{PostId: postId, LikedAccountId: accountId})

	var pstLike postLike

	if err := queryPostLike.Get(&pstLike); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrLikeNotFound
		}

		return nil, fmt.Errorf("failed to get post like by id: %v", err)
	}

	lk := post.UnmarshalLikeFromDatabase(pstLike.LikedAccountId, pstLike.PostId, pstLike.LikedAt)

	if err := lk.CanView(requester); err != nil {
		return nil, err
	}

	return lk, nil
}
