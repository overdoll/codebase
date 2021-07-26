package adapters

import (
	"context"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/paging"
)

var postRejectionReasonTable = table.New(table.Metadata{
	Name: "post_rejection_reasons",
	Columns: []string{
		"id",
		"reason",
		"infraction",
		"bucket",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type postRejectionReason struct {
	Id         string `db:"id"`
	Reason     string `db:"reason"`
	Infraction bool   `db:"infraction"`
	Bucket     int    `db:"bucket"`
}

func (r InfractionCassandraRepository) GetPostRejectionReason(ctx context.Context, id string) (*infraction.PostRejectionReason, error) {

	rejectionReasonQuery := r.session.
		Query(postRejectionReasonTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postRejectionReason{Id: id, Bucket: 0})

	var rejectionReason postRejectionReason

	if err := rejectionReasonQuery.Get(&rejectionReason); err != nil {
		return nil, err
	}

	return infraction.UnmarshalPostRejectionReasonFromDatabase(rejectionReason.Id, rejectionReason.Reason, rejectionReason.Infraction), nil
}

func (r InfractionCassandraRepository) GetPostRejectionReasons(ctx context.Context, cursor *paging.Cursor) ([]*infraction.PostRejectionReason, error) {

	builder := postRejectionReasonTable.SelectBuilder()

	data := &postRejectionReason{Bucket: 0}

	if cursor != nil {
		cursor.BuildCassandra(builder, "id")
	}

	rejectionReasonsQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbRejectionReasons []postRejectionReason

	if err := rejectionReasonsQuery.Select(&dbRejectionReasons); err != nil {
		return nil, err
	}

	var rejectionReasons []*infraction.PostRejectionReason
	for _, rejectionReason := range dbRejectionReasons {
		reason := infraction.UnmarshalPostRejectionReasonFromDatabase(rejectionReason.Id, rejectionReason.Reason, rejectionReason.Infraction)
		reason.Node = paging.NewNode(rejectionReason.Id)
		rejectionReasons = append(rejectionReasons, reason)
	}

	return rejectionReasons, nil
}
