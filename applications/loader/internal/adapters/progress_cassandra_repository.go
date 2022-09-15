package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/loader/internal/domain/progress"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/support"
)

var progressTable = table.New(table.Metadata{
	Name: "resource_progress",
	Columns: []string{
		"item_id",
		"resource_id",
		"progress",
	},
	PartKey: []string{"item_id"},
	SortKey: []string{"resource_id"},
})

type progresses struct {
	ItemId     string  `db:"item_id"`
	ResourceId string  `db:"resource_id"`
	Progress   float64 `db:"progress"`
}

type ProgressCassandraS3Repository struct {
	session gocqlx.Session
}

func NewProgressCassandraS3Repository(session gocqlx.Session) ProgressCassandraS3Repository {
	return ProgressCassandraS3Repository{session: session}
}

func (r ProgressCassandraS3Repository) UpdateMediaProgress(ctx context.Context, media *media.Media, prog float64) error {

	if err := r.session.
		Query(progressTable.Update("progress")).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(progresses{ItemId: media.RawProto().Link.Id, ResourceId: media.RawProto().Id, Progress: prog}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update progress")
	}

	return nil
}

func (r ProgressCassandraS3Repository) GetProgressForMedia(ctx context.Context, linkedIds, mediaIds []string) ([]*progress.Progress, error) {

	var progressValues []*progress.Progress

	for _, itemId := range linkedIds {

		var progressItems []*progresses

		if err := r.session.
			Query(qb.Select(progressTable.Name()).Where(qb.Eq("item_id")).ToCql()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.One).
			BindStruct(progresses{ItemId: itemId}).
			SelectRelease(&progressItems); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "failed to get progress")
		}

		for _, progressing := range progressItems {
			for _, resourceId := range mediaIds {
				if progressing.ResourceId == resourceId {
					progressValues = append(progressValues, progress.NewProgress(progressing.ItemId, progressing.ResourceId, progressing.Progress))
				}
			}
		}
	}

	return progressValues, nil
}
