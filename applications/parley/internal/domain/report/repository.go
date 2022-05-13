package report

import (
	"context"
	"overdoll/libraries/principal"

	"overdoll/libraries/paging"
)

type Repository interface {
	CreatePostReport(ctx context.Context, report *PostReport) error
	GetPostReportById(ctx context.Context, requester *principal.Principal, postId, accountId string) (*PostReport, error)
	SearchPostReports(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostReportFilters) ([]*PostReport, error)
	DeleteAccountData(ctx context.Context, accountId string) error
}
