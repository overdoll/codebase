package post_audit_log

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPostRejectionReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*PostRejectionReason, error)
	GetPostRejectionReason(ctx context.Context, requester *principal.Principal, rejectionReasonId string) (*PostRejectionReason, error)

	GetPostAuditLogByIdOperator(ctx context.Context, auditLogId string) (*PostAuditLog, error)
	GetPostAuditLog(ctx context.Context, requester *principal.Principal, auditLogId string) (*PostAuditLog, error)
	SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostAuditLogFilters) ([]*PostAuditLog, error)
	CreatePostAuditLog(ctx context.Context, auditLog *PostAuditLog) error
	UpdatePostAuditLog(ctx context.Context, requester *principal.Principal, auditLogId string, updateFn func(auditLog *PostAuditLog) error) (*PostAuditLog, error)
}
