package adapters

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/bucket"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"sort"
	"time"
)

var postViewsCounterTable = table.New(table.Metadata{
	Name: "post_views_counter",
	Columns: []string{
		"post_id",
		"views",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{},
})

var postViewsCounterBucketedTable = table.New(table.Metadata{
	Name: "post_views_counter_bucketed",
	Columns: []string{
		"bucket",
		"post_id",
		"views",
	},
	PartKey: []string{"bucket", "post_id"},
	SortKey: []string{},
})

var accountPostObservationsBucketsTable = table.New(table.Metadata{
	Name: "account_post_observations_buckets",
	Columns: []string{
		"bucket",
		"observer_account_id",
	},
	PartKey: []string{"observer_account_id"},
	SortKey: []string{"bucket"},
})

var accountPostObservationsTable = table.New(table.Metadata{
	Name: "account_post_observations",
	Columns: []string{
		"bucket",
		"observer_account_id",
		"post_id",
		"observed_at",
	},
	PartKey: []string{"bucket", "observer_account_id"},
	SortKey: []string{"post_id"},
})

type accountPostObservations struct {
	PostId            string    `db:"post_id"`
	Bucket            int       `db:"bucket"`
	ObservedAccountId string    `db:"observer_account_id"`
	ObservedAt        time.Time `db:"observed_at"`
}

type accountPostObservationsBucket struct {
	Bucket            int    `db:"bucket"`
	ObservedAccountId string `db:"observer_account_id"`
}

type postViewsCounterBucketed struct {
	Bucket int    `db:"bucket"`
	Views  int    `db:"views"`
	PostId string `db:"post_id"`
}

type postViewsCounter struct {
	Views  int    `db:"views"`
	PostId string `db:"post_id"`
}

const (
	postSyncQueueKey = "postsSync"
)

type StatsCassandraRepository struct {
	session gocqlx.Session
	cache   *redis.Client
}

func NewStatsCassandraRepository(session gocqlx.Session, cache *redis.Client) StatsCassandraRepository {
	return StatsCassandraRepository{session: session, cache: cache}
}

func (r StatsCassandraRepository) AddPostObservations(ctx context.Context, requester *principal.Principal, posts []*post.Post) ([]string, error) {

	if len(posts) == 0 {
		return nil, nil
	}

	counterBatch := r.session.NewBatch(gocql.CounterBatch).WithContext(ctx)
	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	observedAt := time.Now()
	bucket := bucket.MakeWeeklyBucketFromTimestamp(observedAt)

	stmt, names := accountPostObservationsBucketsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		accountPostObservations{
			Bucket:            bucket,
			ObservedAccountId: requester.AccountId(),
		},
	)

	var finalPostIds []string
	var finalPostIdsAny []interface{}

	for _, postIds := range posts {
		postId := postIds.ID()
		finalPostIds = append(finalPostIds, postId)
		finalPostIdsAny = append(finalPostIdsAny, postId)

		stmt, names = accountPostObservationsTable.Insert()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			accountPostObservations{
				PostId:            postId,
				Bucket:            bucket,
				ObservedAccountId: requester.AccountId(),
				ObservedAt:        observedAt,
			},
		)

		stmt, names = postViewsCounterTable.UpdateBuilder().Where(qb.Eq("post_id")).Add("views").ToCql()
		support.BindStructToBatchStatement(
			counterBatch,
			stmt, names,
			postViewsCounter{
				PostId: postId,
				Views:  1,
			},
		)

		stmt, names = postViewsCounterBucketedTable.UpdateBuilder().Where(qb.Eq("post_id"), qb.Eq("bucket")).Add("views").ToCql()
		support.BindStructToBatchStatement(
			counterBatch,
			stmt, names,
			postViewsCounterBucketed{
				PostId: postId,
				Bucket: bucket,
				Views:  1,
			},
		)
	}

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to create post observations")
	}

	support.MarkBatchIdempotent(counterBatch)
	if err := r.session.ExecuteBatch(counterBatch); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to create post observations - counters")
	}

	_, err := r.cache.WithContext(ctx).SAdd(ctx, postSyncQueueKey, finalPostIdsAny...).Result()

	if err != nil {
		return nil, errors.Wrap(err, "failed to add to redis post sync")
	}

	return finalPostIds, nil
}

func (r PostsCassandraElasticsearchRepository) BackFillPostViews(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, accountPostObservationsBucketsTable, func(iter *gocqlx.Iterx) error {

		var c accountPostObservationsBucket

		postIdsMap := make(map[string]int)

		for iter.StructScan(&c) {
			postIds, err := r.getObservedPostsForBucket(ctx, c.ObservedAccountId, c.Bucket)
			if err != nil {
				return err
			}

			for _, postId := range postIds {
				val, ok := postIdsMap[postId]
				if !ok {
					postIdsMap[postId] = 1
				} else {
					postIdsMap[postId] = val + 1
				}
			}
		}

		var realPostIds []interface{}

		for postId, count := range postIdsMap {
			realPostIds = append(realPostIds, postId)
			if err := r.session.
				Query(postViewsCounterTable.Insert()).
				WithContext(ctx).
				Consistency(gocql.LocalQuorum).
				BindStruct(postViewsCounter{PostId: postId, Views: count}).
				ExecRelease(); err != nil {
				return errors.Wrap(support.NewGocqlError(err), "failed to sync old post views")
			}
		}

		if len(realPostIds) != 0 {
			// add to sync so it can be synced
			_, err := r.cache.WithContext(ctx).SAdd(ctx, postSyncQueueKey, realPostIds...).Result()

			if err != nil {
				return errors.Wrap(err, "failed to add to redis post sync")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) getPostObservationBuckets(ctx context.Context, accountId string) ([]int, error) {

	var accountPostObservations []accountPostObservationsBucket

	if err := r.session.
		Query(accountPostObservationsBucketsTable.Select()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountPostObservationsBucket{ObservedAccountId: accountId}).
		SelectRelease(&accountPostObservations); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post observation buckets")
	}

	var buckets []int

	for _, l := range accountPostObservations {
		buckets = append(buckets, l.Bucket)
	}

	// sort by decreasing order
	sort.Slice(buckets, func(i, j int) bool {
		return buckets[i] > buckets[j]
	})

	return buckets, nil
}

func (r PostsCassandraElasticsearchRepository) getObservedPostsForBucket(ctx context.Context, accountId string, bucket int) ([]string, error) {

	var accountPostObservationsList []accountPostObservations

	if err := r.session.
		Query(accountPostObservationsTable.Select()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountPostObservations{ObservedAccountId: accountId, Bucket: bucket}).
		SelectRelease(&accountPostObservationsList); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post observations")
	}

	var postIds []string

	for _, observation := range accountPostObservationsList {
		postIds = append(postIds, observation.PostId)
	}

	return postIds, nil
}

func (r PostsCassandraElasticsearchRepository) SyncPosts(ctx context.Context) error {

	res, err := r.cache.WithContext(ctx).SMembers(ctx, postSyncQueueKey).Result()

	if err != nil {
		return errors.Wrap(err, "failed to get redis post sync")
	}

	var postIdsToRemove []interface{}

	for _, postId := range res {
		postIdsToRemove = append(postIdsToRemove, postId)

		var postViews postViewsCounter

		if err := r.session.
			Query(postViewsCounterTable.Get()).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(postViewsCounter{PostId: postId}).
			GetRelease(&postViews); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to get post updates")
		}

		viewsCount := postViews.Views

		if err := r.session.
			Query(postTable.Update("views")).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindMap(map[string]interface{}{
				"id":    postId,
				"views": viewsCount,
			}).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to update post views")
		}

		updateDoc := make(map[string]interface{})
		updateDoc["views"] = viewsCount

		_, err := r.client.
			Update().
			Index(postWriterIndex).
			Id(postId).
			RetryOnConflict(20).
			Doc(updateDoc).
			Do(ctx)

		if err != nil {
			return errors.Wrap(support.ParseElasticError(err), "failed to partially update post views")
		}
	}

	if len(postIdsToRemove) != 0 {
		_, err = r.cache.WithContext(ctx).SRem(ctx, postSyncQueueKey, postIdsToRemove...).Result()

		if err != nil {
			return errors.Wrap(err, "failed to clear post sync queue")
		}
	}

	return nil
}
