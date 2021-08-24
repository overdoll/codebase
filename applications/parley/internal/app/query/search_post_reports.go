package query

import (
	"context"
	"time"

	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchPostReports struct {
	Principal *principal.Principal

	Cursor *paging.Cursor
	PostId string

	From time.Time
	To   time.Time
}

type SearchPostReportsHandler struct {
	rr report.Repository
}

func NewSearchPostReportsHandler(rr report.Repository) SearchPostReportsHandler {
	return SearchPostReportsHandler{rr: rr}
}

func (h SearchPostReportsHandler) Handle(ctx context.Context, query SearchPostReports) ([]*report.PostReport, error) {

	filters, err := report.NewPostReportFilters(query.PostId, query.From, query.To)

	if err != nil {
		return nil, err
	}

	reports, err := h.rr.SearchPostReports(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return reports, nil
}
