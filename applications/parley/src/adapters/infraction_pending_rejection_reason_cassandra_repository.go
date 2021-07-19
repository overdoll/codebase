package adapters

import (
	"context"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

type PendingPostRejectionReason struct {
	Id         string `db:"id"`
	Reason     string `db:"reason"`
	Infraction bool   `db:"infraction"`
	Bucket     int    `db:"bucket"`
}

func (r InfractionCassandraRepository) GetRejectionReason(ctx context.Context, id string) (*infraction.PendingPostRejectionReason, error) {

	rejectionReasonQuery := qb.Select("pending_posts_rejection_reasons").
		Where(qb.Eq("bucket"), qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PendingPostRejectionReason{Id: id, Bucket: 0})

	var rejectionReason PendingPostRejectionReason

	if err := rejectionReasonQuery.Get(&rejectionReason); err != nil {
		return nil, err
	}

	return infraction.UnmarshalPendingPostRejectionReasonFromDatabase(rejectionReason.Id, rejectionReason.Reason, rejectionReason.Infraction), nil
}

func (r InfractionCassandraRepository) GetRejectionReasons(ctx context.Context, cursor *paging.Cursor) ([]*infraction.PendingPostRejectionReason, *paging.Info, error) {

	rejectionReasonsQuery := qb.Select("pending_posts_rejection_reasons").
		Where(qb.Eq("bucket")).
		Columns("id", "reason", "infraction").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PendingPostRejectionReason{Bucket: 0})

	var dbRejectionReasons []PendingPostRejectionReason

	if err := rejectionReasonsQuery.Select(&dbRejectionReasons); err != nil {
		return nil, nil, err
	}

	var rejectionReasons []*infraction.PendingPostRejectionReason
	for _, rejectionReason := range dbRejectionReasons {
		rejectionReasons = append(rejectionReasons, infraction.UnmarshalPendingPostRejectionReasonFromDatabase(rejectionReason.Id, rejectionReason.Reason, rejectionReason.Infraction))
	}

	return rejectionReasons, nil, nil
}
