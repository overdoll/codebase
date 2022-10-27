package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/bucket"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"sort"
	"time"
)

var postUpdatesQueueBucketTable = table.New(table.Metadata{
	Name: "post_updates_queue_bucket",
	Columns: []string{
		"id",
		"bucket",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

var postUpdatesQueueTable = table.New(table.Metadata{
	Name: "post_updates_queue",
	Columns: []string{
		"bucket",
		"post_id",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"post_id"},
})

var postViewsCounterTable = table.New(table.Metadata{
	Name: "post_views_counter",
	Columns: []string{
		"post_id",
		"views",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{},
})

var accountPostObservationsBucketsTable = table.New(table.Metadata{
	Name: "account_post_observations_buckets",
	Columns: []string{
		"bucket",
		"observer_account_id",
	},
	PartKey: []string{"observer_account_id", "bucket"},
	SortKey: []string{},
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

type postViewsCounter struct {
	Views  int    `db:"views"`
	PostId string `db:"post_id"`
}

type postUpdatesQueue struct {
	Bucket int    `db:"bucket"`
	PostId string `db:"post_id"`
}

type postUpdatesQueueBucket struct {
	Bucket int `db:"bucket"`
	Id     int `db:"id"`
}

type StatsCassandraRepository struct {
	session gocqlx.Session
}

func NewStatsCassandraRepository(session gocqlx.Session) StatsCassandraRepository {
	return StatsCassandraRepository{session: session}
}

func (r StatsCassandraRepository) getPostUpdatesQueueBucket(ctx context.Context) (int, error) {

	var postUpdates []postUpdatesQueueBucket

	if err := r.session.
		Query(postUpdatesQueueBucketTable.SelectBuilder().Where(qb.Eq("id")).ToCql()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(postUpdatesQueueBucket{Id: 1}).
		SelectRelease(&postUpdates); err != nil {

		if err == gocql.ErrNotFound {
			return 0, nil
		}

		return 0, errors.Wrap(support.NewGocqlError(err), "failed to get post updates queue bucket")
	}

	if len(postUpdates) == 0 {
		return 0, nil
	}

	return postUpdates[len(postUpdates)-1].Bucket, nil
}

func (r StatsCassandraRepository) AddPostObservations(ctx context.Context, requester *principal.Principal, posts []*post.Post) ([]string, error) {

	if len(posts) == 0 {
		return nil, nil
	}

	targetBucketForUpdates, err := r.getPostUpdatesQueueBucket(ctx)
	if err != nil {
		return nil, err
	}

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

	for _, postIds := range posts {
		postId := postIds.ID()
		finalPostIds = append(finalPostIds, postId)

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
			batch,
			stmt, names,
			postViewsCounter{
				PostId: postId,
				Views:  1,
			},
		)

		stmt, names = postUpdatesQueueTable.Insert()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			postUpdatesQueue{
				PostId: postId,
				Bucket: targetBucketForUpdates,
			},
		)
	}

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to create post observations")
	}

	return finalPostIds, nil
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

	var postsUpdatesQueueList []postUpdatesQueue

	if err := r.session.
		Query(postUpdatesQueueTable.SelectBuilder().Where(qb.Eq("bucket")).ToCql()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(postUpdatesQueue{Bucket: 0}).
		SelectRelease(&postsUpdatesQueueList); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to get post updates queue")
	}

	for _, updates := range postsUpdatesQueueList {

		postId := updates.PostId

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

	return nil
}
