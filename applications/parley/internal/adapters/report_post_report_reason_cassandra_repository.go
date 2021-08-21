package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var postReportReasonTable = table.New(table.Metadata{
	Name: "post_report_reasons",
	Columns: []string{
		"id",
		"bucket",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type postReportReason struct {
	Id     string `db:"id"`
	Bucket int    `db:"bucket"`
}

func (r ReportCassandraRepository) GetPostReportReason(ctx context.Context, requester *principal.Principal, id string) (*report.PostReportReason, error) {

	reportReasonQuery := r.session.
		Query(postReportReasonTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postReportReason{Id: id, Bucket: 0})

	var reportReason postReportReason

	if err := reportReasonQuery.Get(&reportReason); err != nil {

		if err == gocql.ErrNotFound {
			return nil, report.ErrPostReportReasonNotFound
		}

		return nil, fmt.Errorf("failed to get post report reason: %v", err)
	}

	reason := report.UnmarshalPostReportReasonFromDatabase(reportReason.Id, reportReason.Id)

	if err := reason.CanView(requester); err != nil {
		return nil, err
	}

	return reason, nil
}

func (r ReportCassandraRepository) GetPostReportReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*report.PostReportReason, error) {

	if err := report.CanViewPostReportReasons(requester); err != nil {
		return nil, err
	}

	builder := postReportReasonTable.SelectBuilder()

	data := &postReportReason{Bucket: 0}

	if cursor != nil {
		cursor.BuildCassandra(builder, "id")
	}

	reportReasonQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbReportReasons []postReportReason

	if err := reportReasonQuery.Select(&dbReportReasons); err != nil {
		return nil, fmt.Errorf("failed to get report reasons: %v", err)
	}

	var reportReasons []*report.PostReportReason
	for _, reportReason := range dbReportReasons {
		reason := report.UnmarshalPostReportReasonFromDatabase(reportReason.Id, reportReason.Id)
		reason.Node = paging.NewNode(reportReason.Id)
		reportReasons = append(reportReasons, reason)
	}

	return reportReasons, nil
}
