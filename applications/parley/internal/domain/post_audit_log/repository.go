package post_audit_log

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPostRejectionReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, deprecated bool) ([]*PostRejectionReason, error)
	GetPostRejectionReasonById(ctx context.Context, requester *principal.Principal, rejectionReasonId string) (*PostRejectionReason, error)

	CreatePostRejectionReason(ctx context.Context, postRejectionReason *PostRejectionReason) error
	UpdatePostRejectionReasonDeprecated(ctx context.Context, postRejectionReasonId string, updateFn func(postRejectionReason *PostRejectionReason) error) (*PostRejectionReason, error)
	UpdatePostRejectionReasonText(ctx context.Context, postRejectionReasonId string, updateFn func(postRejectionReason *PostRejectionReason) error) (*PostRejectionReason, error)
	UpdatePostRejectionReasonClubInfractionReason(ctx context.Context, postRejectionReasonId string, updateFn func(postRejectionReason *PostRejectionReason) error) (*PostRejectionReason, error)

	GetPostAuditLogByIdOperator(ctx context.Context, auditLogId string) (*PostAuditLog, error)
	GetPostAuditLogById(ctx context.Context, requester *principal.Principal, auditLogId string) (*PostAuditLog, error)
	SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostAuditLogFilters) ([]*PostAuditLog, error)
	CreatePostAuditLog(ctx context.Context, auditLog *PostAuditLog) error
}
