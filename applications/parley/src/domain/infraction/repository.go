package infraction

import (
	"context"
)

type Repository interface {
	GetRejectionReasons(context.Context) ([]*PendingPostRejectionReason, error)
	GetRejectionReason(context.Context, string) (*PendingPostRejectionReason, error)

	GetPendingPostAuditLog(context.Context, string) (*PendingPostAuditLog, error)
	GetPendingPostAuditLogByModerator(context.Context, *PendingPostAuditLogFilters) ([]*PendingPostAuditLog, error)
	CreatePendingPostAuditLog(context.Context, *PendingPostAuditLog) error
	UpdatePendingPostAuditLog(context.Context, string, func(*PendingPostAuditLog) error) (*PendingPostAuditLog, error)

	CreateUserInfractionHistory(context.Context, *AccountInfractionHistory) error
	GetAccountInfractionHistory(context.Context, string) ([]*AccountInfractionHistory, error)
	GetAccountInfractionHistoryById(context.Context, string, string) (*AccountInfractionHistory, error)
	DeleteAccountInfractionHistory(context.Context, string, string) error
}
