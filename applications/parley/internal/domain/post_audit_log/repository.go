package post_audit_log

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPostAuditLogByIdOperator(ctx context.Context, auditLogId string) (*PostAuditLog, error)
	GetPostAuditLogById(ctx context.Context, requester *principal.Principal, auditLogId string) (*PostAuditLog, error)
	SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostAuditLogFilters) ([]*PostAuditLog, error)
	CreatePostAuditLog(ctx context.Context, auditLog *PostAuditLog) error
	GetRuleIdForPost(ctx context.Context, requester *principal.Principal, postId string) (*string, error)
}
