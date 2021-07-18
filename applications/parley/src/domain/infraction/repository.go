package infraction

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetRejectionReasons(context.Context, *paging.Cursor) ([]*PendingPostRejectionReason, *paging.Info, error)
	GetRejectionReason(context.Context, string) (*PendingPostRejectionReason, error)

	GetPendingPostAuditLog(context.Context, string) (*PendingPostAuditLog, error)
	GetPendingPostAuditLogByModerator(context.Context, *paging.Cursor, *PendingPostAuditLogFilters) ([]*PendingPostAuditLog, *paging.Info, error)
	CreatePendingPostAuditLog(context.Context, *PendingPostAuditLog) error
	UpdatePendingPostAuditLog(context.Context, string, func(*PendingPostAuditLog) error) (*PendingPostAuditLog, error)

	CreateUserInfractionHistory(context.Context, *AccountInfractionHistory) error
	GetAccountInfractionHistory(context.Context, *paging.Cursor, string) ([]*AccountInfractionHistory, *paging.Info, error)
	GetAccountInfractionHistoryById(context.Context, string, string) (*AccountInfractionHistory, error)
	DeleteAccountInfractionHistory(context.Context, string, string) error
}
