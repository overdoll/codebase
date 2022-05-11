package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/bucket"
	"overdoll/libraries/principal"
	"time"
)

var postLikeTable = table.New(table.Metadata{
	Name: "post_likes",
	Columns: []string{
		"post_id",
		"liked_account_id",
		"liked_at",
		"bucket",
	},
	PartKey: []string{"post_id", "liked_account_id"},
	SortKey: []string{},
})

var accountPostLikeTable = table.New(table.Metadata{
	Name: "account_post_likes",
	Columns: []string{
		"bucket",
		"liked_account_id",
		"post_id",
		"liked_at",
	},
	PartKey: []string{"bucket", "liked_account_id"},
	SortKey: []string{"post_id"},
})

type postLike struct {
	Bucket         int       `db:"bucket"`
	PostId         string    `db:"post_id"`
	LikedAccountId string    `db:"liked_account_id"`
	LikedAt        time.Time `db:"liked_at"`
}

var accountPostLikeBucketsTable = table.New(table.Metadata{
	Name: "account_post_likes_buckets",
	Columns: []string{
		"liked_account_id",
		"bucket",
	},
	PartKey: []string{"liked_account_id"},
	SortKey: []string{"bucket"},
})

type postLikeBucket struct {
	Bucket         int    `db:"bucket"`
	LikedAccountId string `db:"liked_account_id"`
}

func (r PostsCassandraElasticsearchRepository) CreatePostLike(ctx context.Context, like *post.Like) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	postLike := postLike{
		Bucket:         bucket.MakeWeeklyBucketFromTimestamp(like.LikedAt()),
		PostId:         like.PostId(),
		LikedAccountId: like.AccountId(),
		LikedAt:        like.LikedAt(),
	}

	stmt, _ := postLikeTable.Insert()

	batch.Query(stmt, postLike.PostId, postLike.LikedAccountId, postLike.LikedAt, postLike.Bucket)

	stmt, _ = accountPostLikeTable.Insert()

	batch.Query(stmt, postLike.Bucket, postLike.LikedAccountId, postLike.PostId, postLike.LikedAt)

	stmt, _ = accountPostLikeBucketsTable.Insert()

	batch.Query(stmt, postLike.LikedAccountId, postLike.Bucket)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create post like: %v", err)
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) DeletePostLike(ctx context.Context, like *post.Like) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	postLike := postLike{
		Bucket:         bucket.MakeWeeklyBucketFromTimestamp(like.LikedAt()),
		PostId:         like.PostId(),
		LikedAccountId: like.AccountId(),
		LikedAt:        like.LikedAt(),
	}

	stmt, _ := postLikeTable.Delete()

	batch.Query(stmt, postLike.PostId, postLike.LikedAccountId)

	stmt, _ = accountPostLikeTable.Delete()

	batch.Query(stmt, postLike.Bucket, postLike.LikedAccountId, postLike.PostId)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete post like: %v", err)
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) getPostLikeById(ctx context.Context, postId, accountId string) (*post.Like, error) {

	var pstLike postLike

	if err := r.session.
		Query(postLikeTable.Get()).
		Consistency(gocql.One).
		BindStruct(postLike{PostId: postId, LikedAccountId: accountId}).
		Get(&pstLike); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrLikeNotFound
		}

		return nil, fmt.Errorf("failed to get post like by id: %v", err)
	}

	return post.UnmarshalLikeFromDatabase(pstLike.LikedAccountId, pstLike.PostId, pstLike.LikedAt), nil
}

func (r PostsCassandraElasticsearchRepository) GetPostLikeById(ctx context.Context, requester *principal.Principal, postId, accountId string) (*post.Like, error) {

	lk, err := r.getPostLikeById(ctx, postId, accountId)

	if err != nil {
		return nil, err
	}

	if err := lk.CanView(requester); err != nil {
		return nil, err
	}

	return lk, nil
}

func (r PostsCassandraElasticsearchRepository) GetPostLikeByIdOperator(ctx context.Context, postId, accountId string) (*post.Like, error) {

	lk, err := r.getPostLikeById(ctx, postId, accountId)

	if err != nil {
		return nil, err
	}

	return lk, nil
}

func (r PostsCassandraElasticsearchRepository) getAccountPostLikesBuckets(ctx context.Context, accountId string) ([]int, error) {

	var pstLike []postLikeBucket

	if err := r.session.
		Query(accountPostLikeBucketsTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postLikeBucket{LikedAccountId: accountId}).
		Select(&pstLike); err != nil {
		return nil, fmt.Errorf("failed to get post like buckets: %v", err)
	}

	var buckets []int

	for _, l := range pstLike {
		buckets = append(buckets, l.Bucket)
	}

	return buckets, nil
}

func (r PostsCassandraElasticsearchRepository) GetAccountPostLikes(ctx context.Context, accountId string) ([]string, error) {

	var postLikedIds []string

	buckets, err := r.getAccountPostLikesBuckets(ctx, accountId)

	if err != nil {
		return nil, err
	}

	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		var builder *qb.SelectBuilder

		info := map[string]interface{}{}

		builder = qb.Select(accountPostLikeTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("liked_account_id"))

		info["bucket"] = bucketId
		info["liked_account_id"] = accountId

		var postL []postLike

		if err := builder.
			Query(r.session).
			BindMap(info).
			Select(&postL); err != nil {
			return nil, fmt.Errorf("failed to get post likes: %v", err)
		}

		for _, l := range postL {
			postLikedIds = append(postLikedIds, l.PostId)
		}

	}

	return postLikedIds, nil
}
