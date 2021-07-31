package infraction

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPostRejectionReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*PostRejectionReason, error)
	GetPostRejectionReason(ctx context.Context, requester *principal.Principal, rejectionReasonId string) (*PostRejectionReason, error)

	GetPostAuditLog(ctx context.Context, requester *principal.Principal, auditLogId string) (*PostAuditLog, error)
	SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostAuditLogFilters) ([]*PostAuditLog, error)
	CreatePostAuditLog(ctx context.Context, auditLog *PostAuditLog) error
	UpdatePostAuditLog(ctx context.Context, principal *principal.Principal, auditLogId string, updateFn func(auditLog *PostAuditLog) error) (*PostAuditLog, error)

	CreateAccountInfractionHistory(ctx context.Context, accountInfractionHistory *AccountInfractionHistory) error
	GetAccountInfractionHistory(ctx context.Context, principal *principal.Principal, cursor *paging.Cursor, accountId string) ([]*AccountInfractionHistory, error)
	GetAccountInfractionHistoryById(ctx context.Context, principal *principal.Principal, accountId, historyId string) (*AccountInfractionHistory, error)
	DeleteAccountInfractionHistory(ctx context.Context, principal *principal.Principal, accountId, historyId string) error
}
