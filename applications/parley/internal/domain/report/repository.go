package report

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPostReportReason(ctx context.Context, requester *principal.Principal, id string) (*PostReportReason, error)
	GetPostReportReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*PostReportReason, error)

	CreatePostReport(ctx context.Context, report *PostReport) error
	GetPostReport(ctx context.Context, requester *principal.Principal, logId string) (*PostReport, error)
	SearchPostReports(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostReportFilters) ([]*PostReport, error)
	GetPostReportForAccount(ctx context.Context, requester *principal.Principal, postId, accountId string) (*PostReport, error)
}
