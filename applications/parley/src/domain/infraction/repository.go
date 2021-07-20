package infraction

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetPostRejectionReasons(ctx context.Context, cursor *paging.Cursor) ([]*PostRejectionReason, *paging.Info, error)
	GetPostRejectionReason(ctx context.Context, rejectionReasonId string) (*PostRejectionReason, error)

	GetPostAuditLog(ctx context.Context, auditLogId string) (*PostAuditLog, error)
	GetPostAuditLogsByPost(ctx context.Context, cursor *paging.Cursor, filters *PostAuditLogFilters) ([]*PostAuditLog, *paging.Info, error)
	GetPostAuditLogByModerator(ctx context.Context, cursor *paging.Cursor, filters *PostAuditLogFilters) ([]*PostAuditLog, *paging.Info, error)
	CreatePostAuditLog(ctx context.Context, auditLog *PostAuditLog) error
	UpdatePostAuditLog(ctx context.Context, auditLogId string, updateFn func(auditLog *PostAuditLog) error) (*PostAuditLog, error)

	CreateAccountInfractionHistory(ctx context.Context, accountInfractionHistory *AccountInfractionHistory) error
	GetAccountInfractionHistory(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*AccountInfractionHistory, *paging.Info, error)
	GetAccountInfractionHistoryById(ctx context.Context, accountId, historyId string) (*AccountInfractionHistory, error)
	DeleteAccountInfractionHistory(ctx context.Context, accountId, historyId string) error
}
