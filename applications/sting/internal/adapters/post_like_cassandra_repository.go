package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/bucket"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"sort"
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

var accountPostLikeSortedTable = table.New(table.Metadata{
	Name: "account_post_likes_sorted",
	Columns: []string{
		"bucket",
		"liked_account_id",
		"post_id",
		"liked_at",
	},
	PartKey: []string{"bucket", "liked_account_id"},
	SortKey: []string{"liked_at", "post_id"},
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

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	postLike := postLike{
		Bucket:         bucket.MakeWeeklyBucketFromTimestamp(like.LikedAt()),
		PostId:         like.PostId(),
		LikedAccountId: like.AccountId(),
		LikedAt:        like.LikedAt(),
	}

	stmt, names := postLikeTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		postLike,
	)

	stmt, names = accountPostLikeSortedTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		postLike,
	)

	stmt, names = accountPostLikeBucketsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		postLike,
	)

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create post like")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) DeletePostLike(ctx context.Context, postId, accountId string) error {

	lk, err := r.getPostLikeRawById(ctx, postId, accountId)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	postLike := postLike{
		Bucket:         lk.Bucket,
		PostId:         lk.PostId,
		LikedAccountId: lk.LikedAccountId,
		LikedAt:        lk.LikedAt,
	}

	stmt, names := postLikeTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		postLike,
	)

	stmt, names = accountPostLikeSortedTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		postLike,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete post like")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) getPostLikeRawById(ctx context.Context, postId, accountId string) (*postLike, error) {
	var pstLike postLike

	if err := r.session.
		Query(postLikeTable.Get()).
		WithContext(ctx).
		Consistency(gocql.One).
		BindStruct(postLike{PostId: postId, LikedAccountId: accountId}).
		GetRelease(&pstLike); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrLikeNotFound
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post like by id")
	}

	return &pstLike, nil
}

func (r PostsCassandraElasticsearchRepository) getPostLikeById(ctx context.Context, postId, accountId string) (*post.Like, error) {

	pstLike, err := r.getPostLikeRawById(ctx, postId, accountId)

	if err != nil {
		return nil, err
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(postLikeBucket{LikedAccountId: accountId}).
		SelectRelease(&pstLike); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post like buckets")
	}

	var buckets []int

	for _, l := range pstLike {
		buckets = append(buckets, l.Bucket)
	}

	// sort by decreasing order
	sort.Slice(buckets, func(i, j int) bool {
		return buckets[i] > buckets[j]
	})

	return buckets, nil
}

func (r PostsCassandraElasticsearchRepository) AccountPostLikes(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*post.LikedPost, error) {

	if err := post.CanViewLikesForAccount(requester, accountId); err != nil {
		return nil, err
	}

	terminatedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	buckets, err := r.getAccountPostLikesBuckets(ctx, accountId)

	if err != nil {
		return nil, err
	}

	var posts []*post.LikedPost

	var afterValue time.Time
	if cursor.After() != nil {
		if err := cursor.After().Decode(&afterValue); err != nil {
			return nil, errors.Wrap(err, "failed to decode after value")
		}
	}

	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		var builder *qb.SelectBuilder

		info := map[string]interface{}{}

		builder = qb.Select(accountPostLikeSortedTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("liked_account_id"))

		info["bucket"] = bucketId
		info["liked_account_id"] = accountId

		if cursor.After() != nil {
			builder.Where(qb.Lt("liked_at"))
			info["liked_at"] = afterValue
		}

		var postL []postLike

		if err := builder.
			Query(r.session).
			WithContext(ctx).
			BindMap(info).
			SelectRelease(&postL); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post likes")
		}

		if len(postL) == 0 {
			continue
		}

		esBuilder := r.client.MultiGet().Realtime(false)

		for _, l := range postL {
			esBuilder.Add(elastic.NewMultiGetItem().Id(l.PostId).Index(PostReaderIndex))
		}

		response, err := esBuilder.Do(ctx)

		if err != nil {
			return nil, errors.Wrap(support.ParseElasticError(err), "failed search posts")
		}

		var unsortedPosts []*post.LikedPost

		for _, hit := range response.Docs {

			result, err := unmarshalPostDocument(ctx, hit.Source, nil)

			if err != nil {
				return nil, err
			}

			isTerminated := false

			for _, clbId := range terminatedClubIds {
				if result.ClubId() == clbId {
					isTerminated = true
					break
				}
			}

			if !isTerminated {

				var pstLike postLike

				for _, pstL := range postL {
					if pstL.PostId == result.ID() {
						pstLike = pstL
						break
					}
				}

				result.Node = paging.NewNode(pstLike.LikedAt)

				unsortedPosts = append(unsortedPosts, post.UnmarshalLikedPostFromDatabase(post.UnmarshalLikeFromDatabase(pstLike.LikedAccountId, pstLike.PostId, pstLike.LikedAt), result))
			}
		}

		for _, pst := range unsortedPosts {
			for _, sortedLike := range postL {
				// sort properly
				if pst.Post().ID() == sortedLike.PostId {
					posts = append(posts, pst)
					break
				}
			}
		}

		if len(posts) >= cursor.GetLimit() {
			break
		}
	}

	return posts, nil
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

		builder = qb.Select(accountPostLikeSortedTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("liked_account_id"))

		info["bucket"] = bucketId
		info["liked_account_id"] = accountId

		var postL []postLike

		if err := builder.
			Query(r.session).
			WithContext(ctx).
			BindMap(info).
			SelectRelease(&postL); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post likes")
		}

		for _, l := range postL {
			postLikedIds = append(postLikedIds, l.PostId)
		}

	}

	return postLikedIds, nil
}
