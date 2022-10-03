package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/bucket"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"time"
)

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

type StatsCassandraRepository struct {
	session gocqlx.Session
}

func NewStatsCassandraRepository(session gocqlx.Session) StatsCassandraRepository {
	return StatsCassandraRepository{session: session}
}

func (r StatsCassandraRepository) AddPostObservations(ctx context.Context, requester *principal.Principal, posts []*post.Post) ([]string, error) {

	if len(posts) == 0 {
		return nil, nil
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
	}

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to create post observations")
	}

	return finalPostIds, nil
}
