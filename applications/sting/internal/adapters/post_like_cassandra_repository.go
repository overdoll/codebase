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

var postLikeTable = table.New(table.Metadata{
	Name: "club_members",
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
