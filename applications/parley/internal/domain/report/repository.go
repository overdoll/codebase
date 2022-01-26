package report

import (
	"context"
	"overdoll/libraries/principal"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetPostReportReasonById(ctx context.Context, id string) (*PostReportReason, error)
	GetPostReportReasons(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*PostReportReason, error)

	CreatePostReportReason(ctx context.Context, postReportReason *PostReportReason) error
	UpdatePostReportReasonTitle(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *PostReportReason) error) (*PostReportReason, error)
	UpdatePostReportReasonDescription(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *PostReportReason) error) (*PostReportReason, error)
	UpdatePostReportReasonLink(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *PostReportReason) error) (*PostReportReason, error)
	UpdatePostReportReasonDeprecated(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *PostReportReason) error) (*PostReportReason, error)

	CreatePostReport(ctx context.Context, report *PostReport) error
	GetPostReportById(ctx context.Context, requester *principal.Principal, logId string) (*PostReport, error)
	SearchPostReports(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostReportFilters) ([]*PostReport, error)
	GetPostReportForPostAndAccount(ctx context.Context, requester *principal.Principal, postId, accountId string) (*PostReport, error)
}
